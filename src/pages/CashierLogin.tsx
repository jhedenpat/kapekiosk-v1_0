import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogIn } from "lucide-react";

const CashierLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (isSignup) {
      const { error: signupErr } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (signupErr) {
        setError(signupErr.message);
      } else {
        navigate("/cashier");
      }
    } else {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError(authError.message);
      } else {
        navigate("/cashier");
      }
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
          <h1 className="text-2xl font-bold text-primary-foreground">{isSignup ? "Create Account" : "Cashier Login"}</h1>
          <p className="mt-1 text-sm text-kiosk-latte/60">{isSignup ? "Sign up as a new cashier" : "Sign in to manage orders"}</p>
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
          {loading ? (isSignup ? "Creating..." : "Signing in...") : (isSignup ? "Create Account" : "Sign In")}
        </button>

        <button
          type="button"
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
          className="w-full text-center text-sm text-kiosk-latte/50 hover:text-accent transition-colors"
        >
          {isSignup ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default CashierLogin;
