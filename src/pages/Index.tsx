import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import WelcomeScreen from "@/components/kiosk/WelcomeScreen";
import AuthGate from "@/components/kiosk/AuthGate";
import ServiceSelection from "@/components/kiosk/ServiceSelection";
import TimingSelection from "@/components/kiosk/TimingSelection";
import MenuScreen from "@/components/kiosk/MenuScreen";
import CustomizationModal from "@/components/kiosk/CustomizationModal";
import CartScreen from "@/components/kiosk/CartScreen";
import OrderConfirmation from "@/components/kiosk/OrderConfirmation";
import GCashPayment from "@/components/kiosk/GCashPayment";
import type { CartItem, MenuItem } from "@/lib/kiosk-data";
import { ADDON_OPTIONS } from "@/lib/kiosk-data";

type KioskStep = "welcome" | "auth" | "service" | "timing" | "menu" | "cart" | "payment" | "confirmation";

const Index = () => {
  const [step, setStep] = useState<KioskStep>("welcome");
  const [guestName, setGuestName] = useState("");
  const [diningOption, setDiningOption] = useState<"dine_in" | "take_out">("dine_in");
  const [timingMode, setTimingMode] = useState<"asap" | "scheduled">("asap");
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [orderNumber, setOrderNumber] = useState("");

  const resetOrder = useCallback(() => {
    setStep("welcome");
    setGuestName("");
    setDiningOption("dine_in");
    setTimingMode("asap");
    setScheduledTime(null);
    setCart([]);
    setCustomizingItem(null);
    setOrderNumber("");
  }, []);

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      setCustomizingItem(item);
    },
    []
  );

  const handleConfirmCustomization = useCallback(
    (customizations: { sugar: string; milk: string; addOns: string[] }) => {
      if (!customizingItem) return;
      const newItem: CartItem = {
        id: `${customizingItem.id}-${Date.now()}`,
        menuItem: customizingItem,
        quantity: 1,
        customizations,
      };
      setCart((prev) => [...prev, newItem]);
      setCustomizingItem(null);
    },
    [customizingItem]
  );

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, ci) => {
      const addOnTotal = ci.customizations.addOns.reduce((s, name) => {
        const addon = ADDON_OPTIONS.find((a) => a.name === name);
        return s + (addon?.price ?? 0);
      }, 0);
      return sum + (ci.menuItem.price + addOnTotal) * ci.quantity;
    }, 0);
  }, [cart]);

  const saveOrderToDb = useCallback(async () => {
    const orderNum = String(Math.floor(100 + Math.random() * 900));
    const total = getCartTotal();

    const { data: order } = await supabase
      .from("orders")
      .insert({
        order_number: orderNum,
        guest_name: guestName,
        dining_option: diningOption,
        timing_mode: timingMode,
        scheduled_time: scheduledTime,
        total_amount: total,
        payment_status: timingMode === "scheduled" ? "paid" : "unpaid",
      })
      .select()
      .single();

    if (order) {
      const items = cart.map((ci) => ({
        order_id: order.id,
        menu_item_id: ci.menuItem.id,
        menu_item_name: ci.menuItem.name,
        price: ci.menuItem.price,
        quantity: ci.quantity,
        sugar_level: ci.customizations.sugar,
        milk_type: ci.customizations.milk,
        add_ons: ci.customizations.addOns,
        add_ons_total: ci.customizations.addOns.reduce((s, name) => {
          const addon = ADDON_OPTIONS.find((a) => a.name === name);
          return s + (addon?.price ?? 0);
        }, 0),
      }));
      await supabase.from("order_items").insert(items);
    }

    return orderNum;
  }, [cart, guestName, diningOption, timingMode, scheduledTime, getCartTotal]);

  const handleCheckout = useCallback(async () => {
    if (timingMode === "scheduled") {
      setStep("payment");
    } else {
      const num = await saveOrderToDb();
      setOrderNumber(num);
      setStep("confirmation");
    }
  }, [timingMode, saveOrderToDb]);

  const handlePaymentSuccess = useCallback(async () => {
    const num = await saveOrderToDb();
    setOrderNumber(num);
    setStep("confirmation");
  }, [saveOrderToDb]);

  return (
    <div className="min-h-screen">
      {step === "welcome" && <WelcomeScreen onStart={() => setStep("auth")} />}

      {step === "auth" && (
        <AuthGate
          onGuest={(name) => {
            setGuestName(name);
            setStep("service");
          }}
          onBack={() => setStep("welcome")}
        />
      )}

      {step === "service" && (
        <ServiceSelection
          guestName={guestName}
          onSelect={(opt) => {
            setDiningOption(opt);
            setStep("timing");
          }}
          onBack={() => setStep("auth")}
        />
      )}

      {step === "timing" && (
        <TimingSelection
          onSelect={(mode, time) => {
            setTimingMode(mode);
            setScheduledTime(time ?? null);
            setStep("menu");
          }}
          onBack={() => setStep("service")}
        />
      )}

      {step === "menu" && (
        <MenuScreen
          cartCount={cart.length}
          onAddItem={handleAddToCart}
          onViewCart={() => setStep("cart")}
          onBack={() => setStep("timing")}
        />
      )}

      {step === "cart" && (
        <CartScreen
          items={cart}
          guestName={guestName}
          diningOption={diningOption}
          onRemove={(id) => setCart((prev) => prev.filter((ci) => ci.id !== id))}
          onCheckout={handleCheckout}
          onBack={() => setStep("menu")}
        />
      )}

      {step === "payment" && (
        <GCashPayment
          amount={getCartTotal()}
          onSuccess={handlePaymentSuccess}
          onBack={() => setStep("cart")}
        />
      )}

      {step === "confirmation" && (
        <OrderConfirmation
          orderNumber={orderNumber}
          guestName={guestName}
          scheduledTime={scheduledTime}
          onNewOrder={resetOrder}
        />
      )}

      {/* Customization Modal */}
      {customizingItem && (
        <CustomizationModal
          item={customizingItem}
          onConfirm={handleConfirmCustomization}
          onCancel={() => setCustomizingItem(null)}
        />
      )}
    </div>
  );
};

export default Index;
