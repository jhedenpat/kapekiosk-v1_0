import { UtensilsCrossed, ShoppingBag } from "lucide-react";

interface ServiceSelectionProps {
  guestName: string;
  onSelect: (option: "dine_in" | "take_out") => void;
  onBack: () => void;
}

const ServiceSelection = ({ guestName, onSelect, onBack }: ServiceSelectionProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            Hi, {guestName}! 🎉
          </h2>
          <p className="mt-3 text-xl text-kiosk-latte/70">
            Dine-in or take-out?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => onSelect("dine_in")}
            className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-8 transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
              <UtensilsCrossed className="h-10 w-10 text-accent" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">
              Dine-in
            </span>
          </button>

          <button
            onClick={() => onSelect("take_out")}
            className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-8 transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
              <ShoppingBag className="h-10 w-10 text-accent" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">
              Take-out
            </span>
          </button>
        </div>

        <button
          onClick={onBack}
          className="mx-auto block text-kiosk-latte/50 hover:text-kiosk-latte transition-colors"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
