import { useState } from "react";
import { useMenu } from "@/context/MenuContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, X } from "lucide-react";

const AdminLoginModal = ({ onClose }: { onClose: () => void }) => {
  const { login } = useMenu();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm mx-4 rounded-2xl bg-card border border-border p-8 shadow-elevated animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">Admin Login</h2>
          <p className="text-sm text-muted-foreground mt-1">Enter password to manage menu</p>
        </div>

        <div>
          <Label htmlFor="admin-pw" className="text-sm font-medium text-foreground">Password</Label>
          <Input
            id="admin-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="mt-1.5"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive mt-2 animate-in fade-in duration-200">
              Incorrect password. Try again.
            </p>
          )}
        </div>

        <Button type="submit" className="w-full mt-5 font-semibold">
          Sign In
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Hint: admin123
        </p>
      </form>
    </div>
  );
};

export default AdminLoginModal;
