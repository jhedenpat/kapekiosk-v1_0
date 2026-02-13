import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Coffee, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

interface Order {
  id: string;
  order_number: string;
  guest_name: string;
  dining_option: string;
  timing_mode: string;
  scheduled_time: string | null;
  status: string;
  payment_status: string;
  total_amount: number;
  created_at: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: string;
  menu_item_name: string;
  price: number;
  quantity: number;
  sugar_level: string | null;
  milk_type: string | null;
  add_ons: string[];
  add_ons_total: number;
}

const STATUS_FLOW = ["pending", "preparing", "ready", "completed"] as const;
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300",
  preparing: "bg-blue-500/20 text-blue-300",
  ready: "bg-green-500/20 text-green-300",
  completed: "bg-kiosk-latte/20 text-kiosk-latte/60",
  cancelled: "bg-destructive/20 text-destructive-foreground",
};

const CashierDashboard = () => {
  const [orders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>("active");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/cashier/login");
  };

  const filtered = orders.filter((o) => {
    if (filter === "active") return !["completed", "cancelled"].includes(o.status);
    if (filter === "completed") return o.status === "completed";
    return true;
  });

  const nextStatus = (current: string) => {
    const idx = STATUS_FLOW.indexOf(current as any);
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  };

  return (
    <div className="flex h-screen kiosk-gradient">
      {/* Sidebar - Order list */}
      <div className="flex w-96 flex-col border-r border-kiosk-latte/10">
        <div className="flex items-center justify-between border-b border-kiosk-latte/10 p-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-accent" />
            <h1 className="text-lg font-bold text-primary-foreground">Cashier</h1>
          </div>
          <button onClick={handleLogout} className="rounded-xl p-2 text-kiosk-latte/50 hover:bg-kiosk-latte/10">
            <LogOut className="h-5 w-5" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 border-b border-kiosk-latte/10 p-2">
          {["active", "completed", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium capitalize transition-colors ${
                filter === f ? "bg-accent/20 text-accent" : "text-kiosk-latte/50 hover:text-kiosk-latte"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 && (
            <p className="p-4 text-center text-sm text-kiosk-latte/40">No orders</p>
          )}
          {filtered.map((order) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                selectedOrder?.id === order.id
                  ? "border-accent/40 bg-accent/10"
                  : "border-transparent hover:border-kiosk-latte/10 hover:bg-kiosk-espresso/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-foreground">#{order.order_number}</span>
                <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-kiosk-latte/60">{order.guest_name}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-kiosk-latte/40">
                <span className="capitalize">{order.dining_option.replace("_", " ")}</span>
                <span>•</span>
                <span>₱{Number(order.total_amount).toFixed(2)}</span>
                {order.payment_status === "unpaid" && <span className="text-yellow-400">• Unpaid</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main - Order detail */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selectedOrder ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-kiosk-latte/40">Select an order to view details</p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-primary-foreground">Order #{selectedOrder.order_number}</h2>
                <p className="mt-1 text-kiosk-latte/60">
                  {selectedOrder.guest_name} • {selectedOrder.dining_option.replace("_", " ")}
                </p>
                {selectedOrder.scheduled_time && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-accent">
                    <Clock className="h-4 w-4" />
                    Pickup: {new Date(selectedOrder.scheduled_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
              <span className={`rounded-xl px-4 py-2 text-sm font-bold ${STATUS_COLORS[selectedOrder.status]}`}>
                {selectedOrder.status.toUpperCase()}
              </span>
            </div>

            {/* Items */}
            <div className="rounded-2xl border-2 border-kiosk-latte/10 bg-kiosk-espresso/30 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-kiosk-latte/50">Items</h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex items-start justify-between border-b border-kiosk-latte/5 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-primary-foreground">
                        {item.quantity}x {item.menu_item_name}
                      </p>
                      <p className="text-xs text-kiosk-latte/50">
                        {[item.sugar_level && `Sugar: ${item.sugar_level}`, item.milk_type && `Milk: ${item.milk_type}`]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                      {item.add_ons?.length > 0 && (
                        <p className="text-xs text-accent/70">+ {item.add_ons.join(", ")}</p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-primary-foreground">
                      ₱{((item.price + item.add_ons_total) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-kiosk-latte/10 pt-3">
                <span className="text-sm font-semibold text-kiosk-latte/60">Total</span>
                <span className="text-xl font-bold text-accent">₱{Number(selectedOrder.total_amount).toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {selectedOrder.payment_status === "unpaid" && selectedOrder.status !== "cancelled" && (
                <button
                  className="flex items-center gap-2 rounded-2xl kiosk-gold-gradient px-6 py-3 font-bold text-accent-foreground transition-all hover:opacity-90"
                >
                  <DollarSign className="h-5 w-5" />
                  Mark as Paid
                </button>
              )}

              {nextStatus(selectedOrder.status) && (
                <button
                  className="flex items-center gap-2 rounded-2xl bg-accent/20 px-6 py-3 font-bold text-accent transition-all hover:bg-accent/30"
                >
                  <CheckCircle className="h-5 w-5" />
                  Move to {nextStatus(selectedOrder.status)}
                </button>
              )}

              {selectedOrder.status === "pending" && (
                <button
                  className="flex items-center gap-2 rounded-2xl bg-destructive/20 px-6 py-3 font-bold text-destructive-foreground transition-all hover:bg-destructive/30"
                >
                  <XCircle className="h-5 w-5" />
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashierDashboard;
