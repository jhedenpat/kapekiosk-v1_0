import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const CashierLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // No backend — just navigate for now
    if (email && password) {
      navigate("/cashier");
    } else {
      setError("Please enter email and password");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center kiosk-gradient px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 rounded-3xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/60 p-8 backdrop-blur">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
            <LogIn className="h-7 w-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">Cashier Login</h1>
          <p className="mt-1 text-sm text-kiosk-latte/60">Sign in to manage orders</p>
        </div>

        {error && (
          <p className="rounded-xl bg-destructive/20 px-4 py-2 text-sm text-destructive-foreground">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-5 py-4 text-primary-foreground placeholder:text-kiosk-latte/40 focus:border-accent focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-2xl border-2 border-kiosk-latte/20 bg-kiosk-espresso/50 px-5 py-4 text-primary-foreground placeholder:text-kiosk-latte/40 focus:border-accent focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl kiosk-gold-gradient px-6 py-4 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default CashierLogin;
