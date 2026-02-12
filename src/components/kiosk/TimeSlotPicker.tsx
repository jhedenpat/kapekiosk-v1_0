import { useState, useMemo } from "react";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  onSelect: (isoTime: string) => void;
}

const TimeSlotPicker = ({ onSelect }: TimeSlotPickerProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const slots = useMemo(() => {
    const result: { label: string; value: string }[] = [];
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);

    for (let i = 0; i < 16; i++) {
      const slotTime = new Date(now.getTime() + i * 15 * 60000);
      result.push({
        label: slotTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        value: slotTime.toISOString(),
      });
    }
    return result;
  }, []);

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary-foreground">When will you arrive?</h3>
        <p className="mt-2 text-kiosk-latte/60">Pick a 15-minute window</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.value}
            onClick={() => setSelectedSlot(slot.value)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 px-3 py-4 text-base font-semibold transition-all ${
              selectedSlot === slot.value
                ? "border-accent kiosk-gold-gradient text-accent-foreground"
                : "border-kiosk-latte/10 bg-kiosk-espresso/30 text-kiosk-latte/70 hover:border-kiosk-latte/25 hover:bg-kiosk-espresso/50"
            }`}
          >
            <Clock className="h-4 w-4 opacity-60" />
            {slot.label}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-kiosk-latte/40 italic">
        * We'll start brewing 7 minutes before your arrival.
      </p>

      <button
        disabled={!selectedSlot}
        onClick={() => selectedSlot && onSelect(selectedSlot)}
        className="w-full rounded-2xl kiosk-gold-gradient py-5 text-lg font-bold text-accent-foreground transition-all hover:opacity-90 disabled:opacity-40"
      >
        Confirm Time
      </button>
    </div>
  );
};

export default TimeSlotPicker;
