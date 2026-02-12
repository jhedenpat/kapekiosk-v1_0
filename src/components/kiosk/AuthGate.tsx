import { User, UserPlus, ArrowLeft, Smartphone, UserCheck } from "lucide-react";
import { useState } from "react";

interface AuthGateProps {
  onGuest: (name: string) => void;
  onBack: () => void;
}

const AuthGate = ({ onGuest, onBack }: AuthGateProps) => {
  const [mode, setMode] = useState<"choose" | "guest" | "member_phone" | "member_otp" | "member_signup">("choose");
  const [guestName, setGuestName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [memberName, setMemberName] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (phoneNumber.length >= 11) {
      setOtpSent(true);
      setMode("member_otp");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length >= 4) {
      // Mock: simulate checking if account exists
      // For now, always go to signup for new members
      setMode("member_signup");
    }
  };

  const handleSignupComplete = () => {
    if (memberName.trim()) {
      onGuest(memberName.trim());
    }
  };

  // Member signup screen (after OTP for new accounts)
  if (mode === "member_signup") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
              <UserCheck className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground">
              Welcome, new member! 🎉
            </h2>
            <p className="mt-2 text-kiosk-latte/70">
              Set up your account to get started
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-kiosk-latte/70">Your Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="Enter your full name"
                autoFocus
                className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-6 py-5 text-xl text-primary-foreground placeholder:text-kiosk-latte/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </div>

            <div className="rounded-2xl border-2 border-kiosk-latte/10 bg-kiosk-espresso/25 px-6 py-4">
              <p className="text-sm text-kiosk-latte/50">Mobile Number</p>
              <p className="text-lg font-semibold text-primary-foreground">0{phoneNumber.slice(-10)}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { setMode("member_otp"); setMemberName(""); }}
              className="flex-1 rounded-2xl border-2 border-kiosk-latte/20 px-6 py-4 text-lg font-semibold text-kiosk-latte transition-colors hover:bg-kiosk-latte/10"
            >
              Back
            </button>
            <button
              onClick={handleSignupComplete}
              disabled={!memberName.trim()}
              className="flex-1 rounded-2xl kiosk-gold-gradient px-6 py-4 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OTP verification screen
  if (mode === "member_otp") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
              <Smartphone className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary-foreground">Enter OTP</h2>
            <p className="mt-2 text-kiosk-latte/70">
              We sent a code to <span className="font-semibold text-accent">0{phoneNumber.slice(-10)}</span>
            </p>
          </div>

          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter 6-digit code"
            autoFocus
            className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-6 py-5 text-center text-3xl tracking-[0.5em] text-primary-foreground placeholder:text-kiosk-latte/40 placeholder:text-xl placeholder:tracking-normal focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />

          <p className="text-center text-xs text-kiosk-latte/40">
            Mock OTP — enter any 4+ digits to proceed
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => { setMode("member_phone"); setOtp(""); }}
              className="flex-1 rounded-2xl border-2 border-kiosk-latte/20 px-6 py-4 text-lg font-semibold text-kiosk-latte transition-colors hover:bg-kiosk-latte/10"
            >
              Back
            </button>
            <button
              onClick={handleVerifyOtp}
              disabled={otp.length < 4}
              className="flex-1 rounded-2xl kiosk-gold-gradient px-6 py-4 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Phone number input screen
  if (mode === "member_phone") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Member Login 📱
            </h2>
            <p className="mt-2 text-kiosk-latte/70">
              Enter your mobile number to receive an OTP
            </p>
          </div>

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
            placeholder="09XX XXX XXXX"
            autoFocus
            className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-6 py-5 text-xl text-primary-foreground placeholder:text-kiosk-latte/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />

          <div className="flex gap-4">
            <button
              onClick={() => { setMode("choose"); setPhoneNumber(""); }}
              className="flex-1 rounded-2xl border-2 border-kiosk-latte/20 px-6 py-4 text-lg font-semibold text-kiosk-latte transition-colors hover:bg-kiosk-latte/10"
            >
              Back
            </button>
            <button
              onClick={handleSendOtp}
              disabled={phoneNumber.length < 11}
              className="flex-1 rounded-2xl kiosk-gold-gradient px-6 py-4 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              Send OTP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guest name input
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

  // Choose mode
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
            onClick={() => setMode("member_phone")}
            className="group flex items-center gap-5 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-6 text-left transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
              <UserPlus className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary-foreground">
                Member Login
              </h3>
              <p className="mt-1 text-kiosk-latte/60">
                OTP via mobile number
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
