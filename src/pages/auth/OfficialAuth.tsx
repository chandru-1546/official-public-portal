import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ExternalLink, Loader2 } from "lucide-react";

const OfficialAuth = () => {
  useEffect(() => {
    // Redirect to the official CivicFix platform after a short delay
    const timer = setTimeout(() => {
      window.location.href = "https://id-preview--be4e1b6f-e14e-4c1c-9b88-0a5b86b43685.lovable.app/";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl mb-2">Official Portal Access</CardTitle>
          <CardDescription>
            Redirecting you to the official CivicFix dashboard...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Please wait while we connect you</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            <span>Opening official platform...</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            If you are not automatically redirected, 
            <a 
              href="https://id-preview--be4e1b6f-e14e-4c1c-9b88-0a5b86b43685.lovable.app/" 
              className="text-primary hover:underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficialAuth;