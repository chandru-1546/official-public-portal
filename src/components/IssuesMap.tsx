import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface Issue {
  id: string;
  title: string;
  description: string;
  issue_type: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
  location_address: string | null;
  created_at: string;
}

interface IssuesMapProps {
  issues: Issue[];
  center?: [number, number];
  zoom?: number;
}

// Component to fit bounds when issues change
const FitBounds = ({ issues }: { issues: Issue[] }) => {
  const map = useMap();

  useEffect(() => {
    const validIssues = issues.filter(i => i.latitude && i.longitude);
    if (validIssues.length > 0) {
      const bounds = L.latLngBounds(
        validIssues.map(i => [i.latitude!, i.longitude!] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [issues, map]);

  return null;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "#f59e0b";
    case "in_progress":
      return "#3b82f6";
    case "resolved":
      return "#22c55e";
    default:
      return "#6b7280";
  }
};

const createCustomIcon = (status: string) => {
  const color = getStatusColor(status);
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const IssuesMap = ({ issues, center = [13.0827, 80.2707], zoom = 12 }: IssuesMapProps) => {
  const validIssues = issues.filter(i => i.latitude && i.longitude);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds issues={validIssues} />
      {validIssues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.latitude!, issue.longitude!]}
          icon={createCustomIcon(issue.status)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-sm mb-1">{issue.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{issue.description}</p>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100">
                  {issue.issue_type}
                </span>
                <span
                  className="px-2 py-0.5 text-xs rounded-full text-white"
                  style={{ backgroundColor: getStatusColor(issue.status) }}
                >
                  {issue.status}
                </span>
              </div>
              {issue.location_address && (
                <p className="text-xs text-gray-500">{issue.location_address}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IssuesMap;
