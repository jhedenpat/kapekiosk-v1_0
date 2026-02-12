import { Trash2, ArrowLeft, Coffee } from "lucide-react";
import type { CartItem } from "@/lib/kiosk-data";
import { ADDON_OPTIONS } from "@/lib/kiosk-data";

interface CartScreenProps {
  items: CartItem[];
  guestName: string;
  diningOption: "dine_in" | "take_out";
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBack: () => void;
}

const getAddOnTotal = (addOns: string[]) =>
  addOns.reduce((sum, name) => {
    const addon = ADDON_OPTIONS.find((a) => a.name === name);
    return sum + (addon?.price ?? 0);
  }, 0);

const CartScreen = ({ items, guestName, diningOption, onRemove, onCheckout, onBack }: CartScreenProps) => {
  const subtotal = items.reduce(
    (sum, ci) => sum + (ci.menuItem.price + getAddOnTotal(ci.customizations.addOns)) * ci.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col kiosk-gradient">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 py-4 border-b border-kiosk-latte/10">
        <button onClick={onBack} className="text-kiosk-latte/60 hover:text-kiosk-latte transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-primary-foreground">Your Order</h1>
          <p className="text-sm text-kiosk-latte/50">
            {guestName} · {diningOption === "dine_in" ? "Dine-in" : "Take-out"}
          </p>
        </div>
      </header>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Coffee className="h-16 w-16 text-kiosk-latte/20 mb-4" />
            <p className="text-xl font-semibold text-kiosk-latte/40">Your cart is empty</p>
            <p className="text-kiosk-latte/30 mt-1">Go add some coffee!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((ci) => {
              const itemTotal = (ci.menuItem.price + getAddOnTotal(ci.customizations.addOns)) * ci.quantity;
              return (
                <div
                  key={ci.id}
                  className="flex items-start gap-4 rounded-2xl border-2 border-kiosk-latte/10 bg-kiosk-espresso/25 p-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-primary-foreground">{ci.menuItem.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-kiosk-espresso/50 px-2.5 py-0.5 text-xs text-kiosk-latte/70">
                        {ci.customizations.sugar} sugar
                      </span>
                      <span className="rounded-full bg-kiosk-espresso/50 px-2.5 py-0.5 text-xs text-kiosk-latte/70">
                        {ci.customizations.milk}
                      </span>
                      {ci.customizations.addOns.map((a) => (
                        <span key={a} className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs text-accent">
                          {a}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-lg font-bold text-accent">₱{itemTotal}</p>
                  </div>
                  <button
                    onClick={() => onRemove(ci.id)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive hover:bg-destructive/30 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-kiosk-latte/10 px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg text-kiosk-latte/70">Total (VAT Inclusive)</span>
            <span className="text-3xl font-bold text-primary-foreground">₱{subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full rounded-2xl kiosk-gold-gradient py-5 text-xl font-bold text-accent-foreground transition-all hover:opacity-90"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
