import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";

const OfficialDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth/official");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchRole = async () => {
      if (user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role, zone")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (data) {
          setUserRole(data.role);
        }
        setLoading(false);
      }
    };
    fetchRole();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header with logout */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">Official Portal</h1>
          {userRole && (
            <span className="text-sm text-muted-foreground capitalize">
              ({userRole.replace("_", " ")})
            </span>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </header>

      {/* Iframe content */}
      <div className="flex-1">
        <iframe
          src="https://id-preview--be4e1b6f-e14e-4c1c-9b88-0a5b86b43685.lovable.app/"
          className="w-full h-full border-0"
          title="CivicFix Official Portal"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default OfficialDashboard;
