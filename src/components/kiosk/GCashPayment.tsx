import { useState, useEffect } from "react";
import { ArrowLeft, Smartphone, CheckCircle, Loader2 } from "lucide-react";

interface GCashPaymentProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

type PaymentStatus = "input" | "processing" | "success";

const GCashPayment = ({ amount, onSuccess, onBack }: GCashPaymentProps) => {
  const [status, setStatus] = useState<PaymentStatus>("input");
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    if (status === "processing") {
      const timer = setTimeout(() => setStatus("success"), 2500);
      return () => clearTimeout(timer);
    }
    if (status === "success") {
      const timer = setTimeout(onSuccess, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onSuccess]);

  const handlePay = () => {
    if (mobileNumber.length >= 11) {
      setStatus("processing");
    }
  };

  if (status === "processing") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-sm space-y-8 text-center">
          <Loader2 className="mx-auto h-20 w-20 animate-spin text-[hsl(217,89%,50%)]" />
          <div>
            <h2 className="text-3xl font-bold text-primary-foreground">Processing Payment</h2>
            <p className="mt-3 text-lg text-kiosk-latte/70">Please wait while we verify your GCash payment…</p>
          </div>
          <p className="text-4xl font-bold text-accent">₱{amount.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle className="h-16 w-16 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary-foreground">Payment Successful!</h2>
            <p className="mt-3 text-lg text-kiosk-latte/70">Redirecting to your order confirmation…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col kiosk-gradient">
      <header className="flex items-center gap-4 px-6 py-4 border-b border-kiosk-latte/10">
        <button onClick={onBack} className="text-kiosk-latte/60 hover:text-kiosk-latte transition-colors">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">GCash Payment</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8">
          {/* GCash Branding */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[hsl(217,89%,50%)]">
              <Smartphone className="h-10 w-10 text-primary-foreground" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-kiosk-latte/50">
              Pay with GCash
            </p>
          </div>

          {/* Amount */}
          <div className="rounded-3xl border-2 border-accent/30 bg-kiosk-espresso/30 p-6 text-center">
            <p className="text-sm uppercase tracking-wider text-kiosk-latte/50">Total Amount</p>
            <p className="mt-2 text-4xl font-bold text-accent">₱{amount.toFixed(2)}</p>
          </div>

          {/* Mobile Number Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-kiosk-latte/70">
              GCash Mobile Number
            </label>
            <input
              type="tel"
              placeholder="09XX XXX XXXX"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
              className="w-full rounded-2xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/40 px-5 py-4 text-xl text-primary-foreground placeholder:text-kiosk-latte/30 focus:border-accent/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={mobileNumber.length < 11}
            className="w-full rounded-2xl bg-[hsl(217,89%,50%)] py-5 text-xl font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Pay ₱{amount.toFixed(2)}
          </button>

          <p className="text-center text-xs text-kiosk-latte/40">
            This is a simulated GCash payment. No real transaction will occur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GCashPayment;
