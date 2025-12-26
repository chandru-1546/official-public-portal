import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, MapPin, AlertCircle } from "lucide-react";
import { getZoneByCoordinates, zones } from "@/lib/zones";
import { Badge } from "@/components/ui/badge";

interface AssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issueId: string;
  issueTitle: string;
  latitude?: number | null;
  longitude?: number | null;
  currentDepartment?: string | null;
  currentZone?: string | null;
  onAssign: (issueId: string, department: string, zone: string, notes: string) => Promise<void>;
}

const DEPARTMENTS = [
  { value: "roads", label: "Roads & Infrastructure" },
  { value: "water", label: "Water & Sewerage" },
  { value: "electricity", label: "Electricity" },
  { value: "sanitation", label: "Sanitation & Waste" },
  { value: "parks", label: "Parks & Recreation" },
  { value: "drainage", label: "Storm Drainage" },
  { value: "traffic", label: "Traffic Management" },
  { value: "general", label: "General Services" },
];

const AssignmentDialog = ({
  open,
  onOpenChange,
  issueId,
  issueTitle,
  latitude,
  longitude,
  currentDepartment,
  currentZone,
  onAssign,
}: AssignmentDialogProps) => {
  const [department, setDepartment] = useState(currentDepartment || "");
  const [zone, setZone] = useState(currentZone || "");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoDetectedZone, setAutoDetectedZone] = useState<string | null>(null);

  // Auto-detect zone from coordinates
  useEffect(() => {
    if (latitude && longitude) {
      const detectedZone = getZoneByCoordinates(latitude, longitude);
      if (detectedZone) {
        setAutoDetectedZone(detectedZone.value);
        if (!currentZone) {
          setZone(detectedZone.value);
        }
      } else {
        setAutoDetectedZone(null);
      }
    }
  }, [latitude, longitude, currentZone]);

  const handleSubmit = async () => {
    if (!department || !zone) return;
    
    setIsSubmitting(true);
    try {
      await onAssign(issueId, department, zone, notes);
      setNotes("");
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getZoneLabel = (zoneValue: string) => {
    const zoneInfo = zones.find(z => z.value === zoneValue);
    return zoneInfo ? zoneInfo.label : zoneValue;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Issue</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">Issue</Label>
            <Input value={issueTitle} disabled className="bg-muted" />
          </div>

          {/* Show coordinates and auto-detected zone */}
          {latitude && longitude && (
            <div className="rounded-lg border border-border bg-muted/50 p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
              </div>
              {autoDetectedZone ? (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Auto-detected: {getZoneLabel(autoDetectedZone)}
                  </Badge>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Location outside defined zones - please select manually</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="zone">Assigned Zone</Label>
            <Select value={zone} onValueChange={setZone}>
              <SelectTrigger id="zone">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((z) => (
                  <SelectItem key={z.value} value={z.value}>
                    {z.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Assignment Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes for the assigned department..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!department || !zone || isSubmitting}>
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Assign to {zone && department ? `${getZoneLabel(zone)} → ${DEPARTMENTS.find(d => d.value === department)?.label}` : "..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
