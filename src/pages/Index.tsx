import { useState, useCallback } from "react";
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

  const handleCheckout = useCallback(() => {
    if (timingMode === "scheduled") {
      setStep("payment");
    } else {
      setOrderNumber(String(Math.floor(100 + Math.random() * 900)));
      setStep("confirmation");
    }
  }, [timingMode]);

  const handlePaymentSuccess = useCallback(() => {
    setOrderNumber(String(Math.floor(100 + Math.random() * 900)));
    setStep("confirmation");
  }, []);

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
