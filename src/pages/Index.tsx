import { useState, useMemo } from "react";
import { useMenu } from "@/context/MenuContext";
import MenuCard from "@/components/MenuCard";
import AddMenuItemForm from "@/components/AddMenuItemForm";
import AdminLoginModal from "@/components/AdminLoginModal";
import { Plus, LogIn, LogOut, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES_ORDER = ["Starters", "Mains", "Desserts", "Beverages"];

const Index = () => {
  const { items, isAdmin, logout } = useMenu();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))];
    return CATEGORIES_ORDER.filter((c) => cats.includes(c)).concat(
      cats.filter((c) => !CATEGORIES_ORDER.includes(c))
    );
  }, [items]);

  const filteredItems = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : items;

  const grouped = useMemo(() => {
    const map: Record<string, typeof items> = {};
    filteredItems.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });
    return map;
  }, [filteredItems]);

  const sortedCategories = CATEGORIES_ORDER.filter((c) => grouped[c]).concat(
    Object.keys(grouped).filter((c) => !CATEGORIES_ORDER.includes(c))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
                Foodie
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Fresh & Flavourful</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <>
                <Button onClick={() => setShowAddForm(true)} size="sm" className="gap-1.5 font-semibold">
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
                <Button onClick={logout} variant="outline" size="sm" className="gap-1.5">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => setShowLogin(true)} variant="outline" size="sm" className="gap-1.5">
                <LogIn className="h-4 w-4" /> Admin
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=600&fit=crop"
            alt="Delicious food spread"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/80 mb-3">
            — Our Menu —
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
            Crafted with Passion
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Every dish tells a story — fresh ingredients, bold flavors, and timeless recipes from our kitchen to your table.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-primary-foreground/40" />
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-px w-12 bg-primary-foreground/40" />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {sortedCategories.map((category) => (
          <section key={category} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-display text-2xl font-bold text-foreground">{category}</h3>
              <span className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">
                {grouped[category].length} {grouped[category].length === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[category].map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No menu items yet.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
          made by umair  © 2026 Foodie — Fresh & Flavourful. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showAddForm && <AddMenuItemForm onClose={() => setShowAddForm(false)} />}
      {showLogin && <AdminLoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Index;
