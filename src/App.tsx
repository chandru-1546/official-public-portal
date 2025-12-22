import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import AuthSelect from "./pages/AuthSelect";
import OfficialLogin from "./pages/auth/OfficialLogin";
import OfficialDashboard from "./pages/auth/OfficialDashboard";
import PublicLogin from "./pages/auth/PublicLogin";
import PublicDashboard from "./pages/auth/PublicDashboard";
import ReportIssue from "./pages/ReportIssue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/auth-select" element={<AuthSelect />} />
            <Route path="/auth/official" element={<OfficialLogin />} />
            <Route path="/auth/official/dashboard" element={<OfficialDashboard />} />
            <Route path="/auth/public" element={<PublicLogin />} />
            <Route path="/auth/public/dashboard" element={<PublicDashboard />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
