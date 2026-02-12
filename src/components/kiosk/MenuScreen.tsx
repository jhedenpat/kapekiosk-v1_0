import { useState } from "react";
import { Plus, ShoppingCart, Coffee } from "lucide-react";
import { MENU_ITEMS, CATEGORIES, type MenuItem } from "@/lib/kiosk-data";

interface MenuScreenProps {
  cartCount: number;
  onAddItem: (item: MenuItem) => void;
  onViewCart: () => void;
  onBack: () => void;
}

const MenuScreen = ({ cartCount, onAddItem, onViewCart, onBack }: MenuScreenProps) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="flex min-h-screen flex-col kiosk-gradient">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-kiosk-latte/10">
        <button
          onClick={onBack}
          className="text-kiosk-latte/60 hover:text-kiosk-latte transition-colors text-lg"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-primary-foreground">
          Our Menu
        </h1>
        <button
          onClick={onViewCart}
          className="relative flex items-center gap-2 rounded-2xl kiosk-gold-gradient px-5 py-3 font-bold text-accent-foreground transition-all hover:opacity-90"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto px-6 py-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-6 py-3 text-base font-semibold transition-all ${
              activeCategory === cat
                ? "kiosk-gold-gradient text-accent-foreground"
                : "bg-kiosk-espresso/40 text-kiosk-latte/70 hover:bg-kiosk-espresso/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onAddItem(item)}
              className="group flex flex-col rounded-3xl border-2 border-kiosk-latte/10 bg-kiosk-espresso/25 p-5 text-left transition-all hover:border-accent/40 hover:bg-kiosk-espresso/40 kiosk-card-hover"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10">
                <Coffee className="h-10 w-10 text-accent/70" />
              </div>

              <h3 className="text-lg font-bold text-primary-foreground leading-tight">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-kiosk-latte/50 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-xl font-bold text-accent">
                  ₱{item.price}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Plus className="h-5 w-5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
