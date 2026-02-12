import { useState } from "react";
import { Zap, Clock, ArrowLeft } from "lucide-react";
import TimeSlotPicker from "./TimeSlotPicker";

interface TimingSelectionProps {
  onSelect: (mode: "asap" | "scheduled", scheduledTime?: string) => void;
  onBack: () => void;
}

const TimingSelection = ({ onSelect, onBack }: TimingSelectionProps) => {
  const [mode, setMode] = useState<"choose" | "schedule">("choose");

  if (mode === "schedule") {
    return (
      <div className="flex min-h-screen flex-col kiosk-gradient">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-kiosk-latte/10">
          <button onClick={() => setMode("choose")} className="text-kiosk-latte/60 hover:text-kiosk-latte transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-primary-foreground">Pick a Time</h1>
        </header>
        <div className="flex flex-1 items-center justify-center px-6">
          <TimeSlotPicker onSelect={(time) => onSelect("scheduled", time)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">
            When do you need it? ⏰
          </h2>
          <p className="mt-3 text-xl text-kiosk-latte/70">
            We'll have it ready right on time
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => onSelect("asap")}
            className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-8 transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
              <Zap className="h-10 w-10 text-accent" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">ASAP</span>
            <span className="text-sm text-kiosk-latte/50">Start brewing now</span>
          </button>

          <button
            onClick={() => setMode("schedule")}
            className="group flex flex-col items-center gap-4 rounded-3xl border-2 border-kiosk-latte/15 bg-kiosk-espresso/30 p-8 transition-all hover:border-accent/50 hover:bg-kiosk-espresso/50 kiosk-card-hover"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
              <Clock className="h-10 w-10 text-accent" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">Schedule</span>
            <span className="text-sm text-kiosk-latte/50">Pick a time slot</span>
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

export default TimingSelection;
