import { User, UserPlus } from "lucide-react";
import { useState } from "react";

interface AuthGateProps {
  onGuest: (name: string) => void;
  onBack: () => void;
}

const AuthGate = ({ onGuest, onBack }: AuthGateProps) => {
  const [mode, setMode] = useState<"choose" | "guest">("choose");
  const [guestName, setGuestName] = useState("");

  if (mode === "guest") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">
              What's your name?
            </h2>
            <p className="mt-2 text-kiosk-latte/70">
              So we know who to call when your order's ready
            </p>
          </div>

          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-6 py-5 text-xl text-primary-foreground placeholder:text-kiosk-latte/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />

          <div className="flex gap-4">
            <button
              onClick={() => setMode("choose")}
              className="flex-1 rounded-2xl border-2 border-kiosk-latte/20 px-6 py-4 text-lg font-semibold text-kiosk-latte transition-colors hover:bg-kiosk-latte/10"
            >
              Back
            </button>
            <button
              onClick={() => guestName.trim() && onGuest(guestName.trim())}
              disabled={!guestName.trim()}
              className="flex-1 rounded-2xl kiosk-gold-gradient px-6 py-4 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary-foreground">
            Mabuhay! 👋
          </h2>
          <p className="mt-3 text-xl text-kiosk-latte/70">
            How would you like to order today?
          </p>
        </div>

        <div className="grid gap-5">
          <button
            onClick={() => setMode("guest")}
            className="group flex items-center gap-5 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-6 text-left transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
              <User className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground">
                Guest Order
              </h3>
              <p className="mt-1 text-kiosk-latte/60">
                Quick order, no account needed
              </p>
            </div>
          </button>

          <button
            disabled
            className="group flex items-center gap-5 rounded-3xl border-2 border-kiosk-latte/10 bg-kiosk-espresso/20 p-6 text-left opacity-50 cursor-not-allowed"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <UserPlus className="h-8 w-8 text-accent/50" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground/60">
                Member Login
              </h3>
              <p className="mt-1 text-kiosk-latte/40">
                OTP via mobile — coming soon
              </p>
            </div>
          </button>
        </div>

        <button
          onClick={onBack}
          className="mx-auto block text-kiosk-latte/50 hover:text-kiosk-latte transition-colors"
        >
          ← Back to start
        </button>
      </div>
    </div>
  );
};

export default AuthGate;
