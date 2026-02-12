export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: {
    sugar: string;
    milk: string;
    addOns: string[];
  };
}

export interface OrderState {
  guestName: string;
  isMember: boolean;
  mobileNumber: string;
  diningOption: "dine_in" | "take_out" | null;
  cart: CartItem[];
}

export const SUGAR_OPTIONS = ["0%", "25%", "50%", "75%", "100%"];
export const MILK_OPTIONS = ["Full Cream", "Oat", "Soy", "Almond"];
export const ADDON_OPTIONS = [
  { name: "Extra Shot", price: 30 },
  { name: "Coffee Jelly", price: 25 },
  { name: "Whipped Cream", price: 20 },
];

export const MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Classic Kapé", description: "Rich Filipino-style brewed coffee", price: 89, category: "Hot Coffee" },
  { id: "2", name: "Spanish Latte", description: "Creamy espresso with condensed milk", price: 129, category: "Hot Coffee" },
  { id: "3", name: "Café Americano", description: "Bold espresso with hot water", price: 99, category: "Hot Coffee" },
  { id: "4", name: "Kapé Mocha", description: "Espresso, chocolate & steamed milk", price: 139, category: "Hot Coffee" },
  { id: "5", name: "Iced Kapé Latte", description: "Cold espresso with fresh milk over ice", price: 119, category: "Iced Coffee" },
  { id: "6", name: "Iced Caramel Macchiato", description: "Vanilla, milk, espresso & caramel drizzle", price: 149, category: "Iced Coffee" },
  { id: "7", name: "Cold Brew", description: "Slow-steeped for 18 hours, ultra smooth", price: 129, category: "Iced Coffee" },
  { id: "8", name: "Java Chip Frappe", description: "Blended chocolate chips, coffee & cream", price: 159, category: "Frappes" },
  { id: "9", name: "Matcha Frappe", description: "Premium matcha blended with milk & ice", price: 149, category: "Frappes" },
  { id: "10", name: "Mango Graham Frappe", description: "Filipino classic turned into a frappe", price: 139, category: "Frappes" },
  { id: "11", name: "Taro Milk Tea", description: "Creamy ube-purple taro with pearls", price: 119, category: "Non-Coffee" },
  { id: "12", name: "Strawberry Lemonade", description: "Fresh strawberry with tangy citrus", price: 109, category: "Non-Coffee" },
];

export const CATEGORIES = [...new Set(MENU_ITEMS.map((i) => i.category))];
