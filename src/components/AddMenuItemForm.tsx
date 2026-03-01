import { useState } from "react";
import { useMenu } from "@/context/MenuContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const CATEGORIES = ["Starters", "Mains", "Desserts", "Beverages"];

const AddMenuItemForm = ({ onClose }: { onClose: () => void }) => {
  const { addItem } = useMenu();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    isVeg: false,
    isPopular: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) return;
    addItem({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      image: form.image || undefined,
      isVeg: form.isVeg,
      isPopular: form.isPopular,
    });
    setForm({ name: "", description: "", price: "", category: "", image: "", isVeg: false, isPopular: false });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-card border border-border p-8 shadow-elevated animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">Add Menu Item</h2>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Item Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Truffle Pasta"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="desc" className="text-sm font-medium text-foreground">Description</Label>
            <Textarea
              id="desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="A short description of the dish..."
              className="mt-1.5 resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-foreground">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0.00"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="image" className="text-sm font-medium text-foreground">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://res.cloudinary.com/... or any image URL"
              className="mt-1.5"
            />
            <p className="text-xs text-muted-foreground mt-1">Upload to Cloudinary and paste the URL here</p>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-2">
              <Switch
                id="veg"
                checked={form.isVeg}
                onCheckedChange={(v) => setForm({ ...form, isVeg: v })}
              />
              <Label htmlFor="veg" className="text-sm text-foreground">Vegetarian</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="popular"
                checked={form.isPopular}
                onCheckedChange={(v) => setForm({ ...form, isPopular: v })}
              />
              <Label htmlFor="popular" className="text-sm text-foreground">Popular</Label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6 gap-2 font-semibold">
          <Plus className="h-4 w-4" /> Add to Menu
        </Button>
      </form>
    </div>
  );
};

export default AddMenuItemForm;
