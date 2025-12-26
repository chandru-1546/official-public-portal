export interface ZoneBoundary {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
}

export interface Zone {
  value: string;
  label: string;
  region: string;
  boundary: ZoneBoundary;
}

export const zones: Zone[] = [
  {
    value: "zone_1",
    label: "Zone 1 - North",
    region: "North",
    boundary: {
      start: { lat: 13.15, lng: 79.75 },
      end: { lat: 13.45, lng: 80.10 },
    },
  },
  {
    value: "zone_2",
    label: "Zone 2 - North-East",
    region: "North-East",
    boundary: {
      start: { lat: 13.00, lng: 80.10 },
      end: { lat: 13.30, lng: 80.35 },
    },
  },
  {
    value: "zone_3",
    label: "Zone 3 - Central",
    region: "Central",
    boundary: {
      start: { lat: 12.95, lng: 79.90 },
      end: { lat: 13.15, lng: 80.10 },
    },
  },
  {
    value: "zone_4",
    label: "Zone 4 - South-West",
    region: "South-West",
    boundary: {
      start: { lat: 12.80, lng: 79.75 },
      end: { lat: 13.00, lng: 79.95 },
    },
  },
  {
    value: "zone_5",
    label: "Zone 5 - South-East",
    region: "South-East",
    boundary: {
      start: { lat: 12.80, lng: 79.95 },
      end: { lat: 13.00, lng: 80.20 },
    },
  },
];

// Helper function to get zone by coordinates
export function getZoneByCoordinates(lat: number, lng: number): Zone | null {
  return zones.find((zone) => {
    const { start, end } = zone.boundary;
    return (
      lat >= start.lat &&
      lat <= end.lat &&
      lng >= start.lng &&
      lng <= end.lng
    );
  }) || null;
}

// Helper function to get zone by value
export function getZoneByValue(value: string): Zone | null {
  return zones.find((zone) => zone.value === value) || null;
}

// Get zone center coordinates
export function getZoneCenter(zone: Zone): { lat: number; lng: number } {
  const { start, end } = zone.boundary;
  return {
    lat: (start.lat + end.lat) / 2,
    lng: (start.lng + end.lng) / 2,
  };
}
