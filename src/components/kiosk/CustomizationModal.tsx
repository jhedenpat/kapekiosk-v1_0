import { useState } from "react";
import { X, Check } from "lucide-react";
import {
  SUGAR_OPTIONS,
  MILK_OPTIONS,
  ADDON_OPTIONS,
  type MenuItem,
} from "@/lib/kiosk-data";

interface CustomizationModalProps {
  item: MenuItem;
  onConfirm: (customizations: { sugar: string; milk: string; addOns: string[] }) => void;
  onCancel: () => void;
}

const CustomizationModal = ({ item, onConfirm, onCancel }: CustomizationModalProps) => {
  const [sugar, setSugar] = useState("100%");
  const [milk, setMilk] = useState("Full Cream");
  const [addOns, setAddOns] = useState<string[]>([]);

  const toggleAddOn = (name: string) => {
    setAddOns((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const addOnTotal = addOns.reduce((sum, name) => {
    const addon = ADDON_OPTIONS.find((a) => a.name === name);
    return sum + (addon?.price ?? 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg animate-in slide-in-from-bottom rounded-t-[2rem] kiosk-gradient border-t-2 border-kiosk-latte/15 p-6 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary-foreground">{item.name}</h2>
            <p className="text-kiosk-latte/60">₱{item.price}</p>
          </div>
          <button
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-kiosk-espresso/50 text-kiosk-latte/60 hover:text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sugar */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Sugar Level
          </h3>
          <div className="flex flex-wrap gap-2">
            {SUGAR_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSugar(opt)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  sugar === opt
                    ? "kiosk-gold-gradient text-accent-foreground"
                    : "bg-kiosk-espresso/40 text-kiosk-latte/70 hover:bg-kiosk-espresso/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Milk */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Milk Choice
          </h3>
          <div className="flex flex-wrap gap-2">
            {MILK_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setMilk(opt)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  milk === opt
                    ? "kiosk-gold-gradient text-accent-foreground"
                    : "bg-kiosk-espresso/40 text-kiosk-latte/70 hover:bg-kiosk-espresso/60"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
            Add-ons
          </h3>
          <div className="space-y-2">
            {ADDON_OPTIONS.map((opt) => (
              <button
                key={opt.name}
                onClick={() => toggleAddOn(opt.name)}
                className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-3.5 transition-all ${
                  addOns.includes(opt.name)
                    ? "border-accent bg-accent/15"
                    : "border-kiosk-latte/10 bg-kiosk-espresso/30 hover:border-kiosk-latte/25"
                }`}
              >
                <span className="font-semibold text-primary-foreground">{opt.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-kiosk-latte/70">+₱{opt.price}</span>
                  {addOns.includes(opt.name) && (
                    <Check className="h-5 w-5 text-accent" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={() => onConfirm({ sugar, milk, addOns })}
          className="w-full rounded-2xl kiosk-gold-gradient py-5 text-lg font-bold text-accent-foreground transition-all hover:opacity-90"
        >
          Add to Cart — ₱{item.price + addOnTotal}
        </button>
      </div>
    </div>
  );
};

export default CustomizationModal;
