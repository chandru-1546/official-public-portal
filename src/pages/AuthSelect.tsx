import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthSelect = () => {
  const navigate = useNavigate();

  const handleOfficialAuth = () => {
    navigate("/auth/official");
  };

  const handlePublicAuth = () => {
    navigate("/auth/public");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-green-600/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="absolute top-8 left-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Access Type
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the appropriate portal based on your role in the community.
          </p>
        </div>

        {/* Auth Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Official Portal */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group" onClick={handleOfficialAuth}>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Official Portal</CardTitle>
              <CardDescription className="text-base">
                For government officials, administrators, and verified civic representatives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Access to administrative dashboard
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Issue management and resolution tools
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Community analytics and insights
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-6">
                Continue as Official
              </Button>
            </CardContent>
          </Card>

          {/* Public Portal */}
          <Card className="border-2 hover:border-green-600/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group" onClick={handlePublicAuth}>
            <CardHeader className="text-center pb-6">
              <div className="mx-auto bg-green-600/10 p-4 rounded-2xl w-fit mb-4 group-hover:bg-green-600/20 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl mb-2">Public Portal</CardTitle>
              <CardDescription className="text-base">
                For citizens and community members to report and track civic issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Report civic issues in your area
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  Track issue status and updates
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  View community issue map
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-600/90 text-white mt-6">
                Continue as Citizen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Text */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Need help choosing? Contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthSelect;