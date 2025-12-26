import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Mail, Lock, User, ArrowLeft, Loader2, MapPin, Building2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zones } from "@/lib/zones";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
});

const roles = [
  { value: "administrator", label: "Administrator" },
  { value: "zone_officer", label: "Zone Officer" },
  { value: "field_officer", label: "Field Officer" },
  { value: "supervisor", label: "Supervisor" },
];

const departments = [
  { value: "roads", label: "Roads & Infrastructure" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity" },
  { value: "sanitation", label: "Sanitation & Waste" },
  { value: "parks", label: "Parks & Recreation" },
  { value: "housing", label: "Housing & Buildings" },
  { value: "traffic", label: "Traffic & Transport" },
  { value: "general", label: "General Services" },
];

const OfficialLogin = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("");
  const [signupZone, setSignupZone] = useState("");
  const [signupDepartment, setSignupDepartment] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = loginSchema.safeParse({
      email: loginEmail,
      password: loginPassword,
    });

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      setLoading(false);
      return;
    }

    const { error } = await signIn(loginEmail, loginPassword);

    if (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
    navigate("/auth/official/dashboard");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validation = signupSchema.safeParse({
      fullName: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole,
    });

    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      setLoading(false);
      return;
    }

    const { error } = await signUp(signupEmail, signupPassword, signupName, "official", signupRole, signupZone, signupDepartment);

    if (error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
      setLoading(false);
      return;
    }

    toast({
      title: "Account Created!",
      description: "Welcome to CivicFix Official Portal.",
    });
    navigate("/auth/official/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            to="/auth-select"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to portal selection
          </Link>
          <div className="mx-auto bg-primary/10 p-4 rounded-2xl w-fit mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Official Portal</CardTitle>
          <CardDescription>Access for government officials and administrators</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your official email"
                      className="pl-10"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your official email"
                      className="pl-10"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={signupRole} onValueChange={setSignupRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {(signupRole === "zone_officer" || signupRole === "field_officer") && (
                  <>
                    <div className="space-y-2">
                      <Label>Assigned Zone</Label>
                      <Select value={signupZone} onValueChange={setSignupZone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your zone" />
                        </SelectTrigger>
                        <SelectContent>
                          {zones.map((zone) => (
                            <SelectItem key={zone.value} value={zone.value}>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                {zone.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={signupDepartment} onValueChange={setSignupDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3 h-3" />
                                {dept.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Official Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground text-center">
            Official accounts require verification. Contact IT support if you have issues.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OfficialLogin;
