import { Button } from "@/components/ui/button";
import { LogOut, Home, LayoutDashboard, Shield } from "lucide-react";

interface AdminHeaderProps {
  userRole: string | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const AdminHeader = ({ userRole, activeTab, onTabChange, onLogout }: AdminHeaderProps) => {
  return (
    <header className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <span className="text-lg font-bold text-foreground">CivicFix</span>
      </div>
      
      <nav className="flex items-center gap-2">
        <Button
          variant={activeTab === "home" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("home")}
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("dashboard")}
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
        <Button
          variant={activeTab === "admin" ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange("admin")}
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </nav>

      <div className="flex items-center gap-3">
        {userRole && (
          <span className="text-sm text-muted-foreground capitalize">
            ({userRole.replace("_", " ")})
          </span>
        )}
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
