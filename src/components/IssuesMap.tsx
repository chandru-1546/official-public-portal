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
            <div className="min-w-[280px] max-w-[320px]">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-tight">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{issue.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 capitalize">
                      {issue.issue_type.replace('_', ' ')}
                    </span>
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full text-white capitalize"
                      style={{ backgroundColor: getStatusColor(issue.status) }}
                    >
                      {issue.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  {issue.location_address && (
                    <div className="flex items-start gap-2 text-xs text-gray-500 mb-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="leading-tight">{issue.location_address}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date(issue.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IssuesMap;
