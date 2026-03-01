import { createContext, useContext, useState, ReactNode } from "react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
}

interface MenuContextType {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, "id">) => void;
  deleteItem: (id: string) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = "admin123";

const defaultItems: MenuItem[] = [
  {
    id: "1",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, truffle oil, and aged parmesan",
    price: 549,
    category: "Mains",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Grilled Salmon Fillet",
    description: "Atlantic salmon with lemon butter sauce, asparagus, and roasted potatoes",
    price: 749,
    category: "Mains",
    isVeg: false,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, croutons, parmesan shavings with classic Caesar dressing",
    price: 349,
    category: "Starters",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Bruschetta Trio",
    description: "Toasted ciabatta topped with tomato basil, olive tapenade, and ricotta honey",
    price: 299,
    category: "Starters",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Beef Tenderloin",
    description: "8oz prime beef tenderloin with red wine reduction and garlic mashed potatoes",
    price: 899,
    category: "Mains",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone",
    price: 279,
    category: "Desserts",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
  },
  {
    id: "7",
    name: "Crème Brûlée",
    description: "Vanilla bean custard with a caramelized sugar crust and fresh berries",
    price: 249,
    category: "Desserts",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Lobster Bisque",
    description: "Rich and velvety soup with chunks of lobster, finished with cream and chives",
    price: 449,
    category: "Starters",
    isVeg: false,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744aec?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Sparkling Lemonade",
    description: "House-made lemonade with fresh mint, elderflower, and sparkling water",
    price: 149,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "Espresso Martini",
    description: "Freshly brewed espresso, vodka, coffee liqueur, and vanilla syrup",
    price: 399,
    category: "Beverages",
    isVeg: true,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
  },
];

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>(defaultItems);
  const [isAdmin, setIsAdmin] = useState(false);

  const addItem = (item: Omit<MenuItem, "id">) => {
    setItems((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <MenuContext.Provider value={{ items, addItem, deleteItem, isAdmin, login, logout }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
};
