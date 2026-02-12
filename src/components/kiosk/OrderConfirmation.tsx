import { CheckCircle, RotateCcw } from "lucide-react";

interface OrderConfirmationProps {
  orderNumber: string;
  guestName: string;
  onNewOrder: () => void;
}

const OrderConfirmation = ({ orderNumber, guestName, onNewOrder }: OrderConfirmationProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center kiosk-gradient px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle className="h-16 w-16 text-accent" />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-primary-foreground">
            Salamat, {guestName}!
          </h2>
          <p className="mt-3 text-xl text-kiosk-latte/70">
            Your order has been placed
          </p>
        </div>

        <div className="rounded-3xl border-2 border-accent/30 bg-kiosk-espresso/30 p-8">
          <p className="text-sm uppercase tracking-wider text-kiosk-latte/50">
            Order Number
          </p>
          <p className="mt-2 text-5xl font-bold text-accent">
            #{orderNumber}
          </p>
          <p className="mt-3 text-kiosk-latte/50">
            Please wait for your name to be called
          </p>
        </div>

        <button
          onClick={onNewOrder}
          className="mx-auto flex items-center gap-3 rounded-2xl border-2 border-kiosk-latte/20 px-8 py-4 text-lg font-semibold text-kiosk-latte transition-all hover:border-accent/40 hover:bg-kiosk-espresso/40"
        >
          <RotateCcw className="h-5 w-5" />
          New Order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
