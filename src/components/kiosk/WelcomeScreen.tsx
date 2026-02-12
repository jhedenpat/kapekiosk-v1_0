import { Coffee } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      onClick={onStart}
      role="button"
      tabIndex={0}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 kiosk-gradient opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 backdrop-blur-sm">
          <Coffee className="h-12 w-12 text-accent" />
        </div>

        <div>
          <h1 className="text-6xl font-bold tracking-tight text-primary-foreground">
            Kape<span className="text-accent">Kiosk</span>
          </h1>
          <p className="mt-2 text-xl text-kiosk-latte">
            Brewed for Filipinos ☕
          </p>
        </div>

        <div className="mt-12 animate-pulse">
          <p className="text-lg font-medium text-kiosk-latte/80">
            Tap anywhere to start your order
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
