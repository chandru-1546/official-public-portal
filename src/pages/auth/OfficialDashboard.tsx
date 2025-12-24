import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut, Loader2, MapPin, Calendar, FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Issue {
  id: string;
  title: string;
  description: string;
  issue_type: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
  location_address: string | null;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const OfficialDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userZone, setUserZone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

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
          setUserZone(data.zone);
        }
        setLoading(false);
      }
    };
    fetchRole();
  }, [user]);

  const fetchIssues = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("issues")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch issues");
      console.error(error);
    } else {
      setIssues(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && userRole) {
      fetchIssues();
    }
  }, [user, userRole]);

  const handleStatusChange = async (issueId: string, newStatus: string) => {
    setUpdatingStatus(issueId);
    const { error } = await supabase
      .from("issues")
      .update({ status: newStatus })
      .eq("id", issueId);

    if (error) {
      toast.error("Failed to update status");
      console.error(error);
    } else {
      toast.success("Status updated successfully");
      setIssues((prev) =>
        prev.map((issue) =>
          issue.id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    }
    setUpdatingStatus(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || (loading && !issues.length)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    total: issues.length,
    pending: issues.filter((i) => i.status === "pending").length,
    inProgress: issues.filter((i) => i.status === "in_progress").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-foreground">Official Portal</h1>
          {userRole && (
            <Badge variant="outline" className="capitalize">
              {userRole.replace("_", " ")}
            </Badge>
          )}
          {userZone && (
            <Badge variant="secondary" className="capitalize">
              Zone: {userZone}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchIssues} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
            </CardContent>
          </Card>
        </div>

        {/* Issues Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Reported Issues</CardTitle>
          </CardHeader>
          <CardContent>
            {issues.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No issues reported yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {issue.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {issue.issue_type.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          {issue.location_address ? (
                            <span className="text-sm text-muted-foreground truncate block">
                              {issue.location_address}
                            </span>
                          ) : issue.latitude && issue.longitude ? (
                            <span className="text-sm text-muted-foreground">
                              {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground/50">
                              No location
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={issue.status}
                            onValueChange={(value) =>
                              handleStatusChange(issue.id, value)
                            }
                            disabled={updatingStatus === issue.id}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue>
                                <Badge
                                  variant="outline"
                                  className={`${statusColors[issue.status]} capitalize`}
                                >
                                  {issue.status.replace("_", " ")}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(issue.created_at)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedIssue(issue)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Issue Detail Dialog */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedIssue?.title}</DialogTitle>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">
                  {selectedIssue.issue_type.replace("_", " ")}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${statusColors[selectedIssue.status]} capitalize`}
                >
                  {selectedIssue.status.replace("_", " ")}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Description
                </h4>
                <p className="text-foreground">{selectedIssue.description}</p>
              </div>

              {(selectedIssue.location_address ||
                selectedIssue.latitude ||
                selectedIssue.longitude) && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    {selectedIssue.location_address && (
                      <p className="text-sm">{selectedIssue.location_address}</p>
                    )}
                    {selectedIssue.latitude && selectedIssue.longitude && (
                      <p className="text-xs text-muted-foreground">
                        Coordinates: {selectedIssue.latitude.toFixed(6)},{" "}
                        {selectedIssue.longitude.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Reported: {formatDate(selectedIssue.created_at)}</span>
              </div>

              {selectedIssue.file_url && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Attachment
                  </h4>
                  <img
                    src={selectedIssue.file_url}
                    alt="Issue attachment"
                    className="rounded-lg max-h-64 object-cover"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Update Status
                </label>
                <Select
                  value={selectedIssue.status}
                  onValueChange={(value) => {
                    handleStatusChange(selectedIssue.id, value);
                    setSelectedIssue({ ...selectedIssue, status: value });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfficialDashboard;
