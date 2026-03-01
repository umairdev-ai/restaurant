import { useMenu } from "@/context/MenuContext";
import { Leaf, Flame, Trash2 } from "lucide-react";

const MenuCard = ({ item }: { item: import("@/context/MenuContext").MenuItem }) => {
  const { isAdmin, deleteItem } = useMenu();

  return (
    <div className="group relative rounded-xl bg-card border border-border overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {item.image && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          {item.isPopular && (
            <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              <Flame className="h-3 w-3" /> Popular
            </span>
          )}
        </div>
      )}
      {!item.image && item.isPopular && (
        <span className="absolute -top-2 right-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          <Flame className="h-3 w-3" /> Popular
        </span>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="font-display text-lg font-semibold text-foreground truncate">
                {item.name}
              </h3>
              {item.isVeg && (
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-sm border-2 border-success">
                  <Leaf className="h-3 w-3 text-success" />
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </div>
          <span className="flex-shrink-0 font-display text-xl font-bold text-primary">
            ₹{item.price}
          </span>
        </div>
      </div>
      {isAdmin && (
        <button
          onClick={() => deleteItem(item.id)}
          className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground rounded-full p-1.5 hover:scale-110"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default MenuCard;
