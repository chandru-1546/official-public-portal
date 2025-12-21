import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Plus, FileText, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for reported issues
const mockReportedIssues = [
  {
    id: "1",
    title: "Pothole on Main Street",
    description: "Large pothole causing traffic issues near the intersection.",
    type: "Road & Infrastructure",
    status: "in-progress",
    createdAt: "2024-01-15",
    fileUrl: null,
  },
  {
    id: "2",
    title: "Broken Street Light",
    description: "Street light not working on Oak Avenue for the past week.",
    type: "Utilities",
    status: "pending",
    createdAt: "2024-01-18",
    fileUrl: null,
  },
  {
    id: "3",
    title: "Garbage Collection Missed",
    description: "Garbage was not collected on scheduled day.",
    type: "Sanitation",
    status: "resolved",
    createdAt: "2024-01-10",
    fileUrl: null,
  },
];

// Mock user profile data
const mockUserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Civic Lane, City Center",
  joinedDate: "January 2024",
  avatar: null,
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return (
        <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    case "in-progress":
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          <AlertCircle className="w-3 h-3 mr-1" />
          In Progress
        </Badge>
      );
    case "resolved":
      return (
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="w-3 h-3 mr-1" />
          Rejected
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const PublicDashboard = () => {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Public Portal</h1>
              <p className="text-xs text-muted-foreground">Report & Track Issues</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/report-issue")}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Report Issue
            </Button>

            <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Your Profile</DialogTitle>
                  <DialogDescription>View your account details</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={mockUserProfile.avatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {mockUserProfile.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{mockUserProfile.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since {mockUserProfile.joinedDate}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <span className="text-sm font-medium text-foreground">{mockUserProfile.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Phone</span>
                      <span className="text-sm font-medium text-foreground">{mockUserProfile.phone}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <span className="text-sm font-medium text-foreground text-right max-w-[200px]">{mockUserProfile.address}</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockReportedIssues.length}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockReportedIssues.filter(i => i.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockReportedIssues.filter(i => i.status === "in-progress").length}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockReportedIssues.filter(i => i.status === "resolved").length}
                </p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reported Issues List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Your Reported Issues</CardTitle>
            <CardDescription>Track the status of issues you've reported</CardDescription>
          </CardHeader>
          <CardContent>
            {mockReportedIssues.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No issues reported yet</h3>
                <p className="text-muted-foreground mb-4">Start by reporting your first issue</p>
                <Button onClick={() => navigate("/report-issue")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockReportedIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-lg border border-border bg-background/50 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">{issue.title}</h4>
                          {getStatusBadge(issue.status)}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {issue.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {issue.type}
                            </Badge>
                          </span>
                          <span>Reported on {new Date(issue.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PublicDashboard;
