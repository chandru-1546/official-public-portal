import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, BarChart3, Users, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Interactive Issue Mapping",
      description: "Report and track civic issues with precise location mapping"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Monitor resolution rates and community engagement metrics"
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Connect citizens with local government for effective solutions"
    },
    {
      icon: Shield,
      title: "Verified Reporting",
      description: "Secure platform with official government integration"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-primary to-green-600 p-3 rounded-2xl">
                <MapPin className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Empowering Communities Through
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent"> Civic Engagement</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              CivicFix bridges the gap between citizens and local government, making it easier to report, track, and resolve civic issues in your community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-green-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
                onClick={() => navigate("/auth-select")}
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose CivicFix?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to strengthen the connection between citizens and their local government.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-2xl w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">167</div>
              <p className="text-muted-foreground">Reports This Month</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">89%</div>
              <p className="text-muted-foreground">Resolution Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.1d</div>
              <p className="text-muted-foreground">Avg Response Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">12</div>
              <p className="text-muted-foreground">Urgent Issues</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-green-600/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens and officials working together to improve their communities.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-green-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
            onClick={() => navigate("/auth-select")}
          >
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;