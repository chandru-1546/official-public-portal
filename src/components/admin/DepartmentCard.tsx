import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface DepartmentCardProps {
  name: string;
  activeIssues: number;
  resolvedThisMonth: number;
  avgResponseTime: string;
  status: "active" | "inactive";
}

const DepartmentCard = ({ 
  name, 
  activeIssues, 
  resolvedThisMonth, 
  avgResponseTime, 
  status 
}: DepartmentCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant={status === "active" ? "default" : "secondary"}>
            {status === "active" ? "8 active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Active Issues</span>
          <span className="font-medium text-primary">{activeIssues}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Resolved This Month</span>
          <span className="font-medium text-primary">{resolvedThisMonth}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Average Response Time</span>
          <span className="font-medium">{avgResponseTime}</span>
        </div>
        <Button variant="outline" className="w-full mt-4 gap-2">
          <Users className="w-4 h-4" />
          Manage Team
        </Button>
      </CardContent>
    </Card>
  );
};

export default DepartmentCard;
