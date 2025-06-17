export interface ConflictZone {
  id: string;
  name: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  conflictType: 'ARMED_CONFLICT' | 'TERRITORIAL_DISPUTE' | 'CIVIL_UNREST' | 'TERRORIST_ACTIVITY';
  status: 'ACTIVE' | 'ESCALATING' | 'DE_ESCALATING' | 'RESOLVED';
  lastUpdated: string;
  casualties: {
    military: number;
    civilian: number;
  };
  description: string;
  satelliteImages: string[];
  intelligence: {
    troop_movements: boolean;
    vehicle_concentrations: boolean;
    infrastructure_damage: boolean;
    refugee_displacement: boolean;
  };
}

export interface Alert {
  id: string;
  type: 'NEW_CONFLICT' | 'ESCALATION' | 'SATELLITE_ANOMALY' | 'INTELLIGENCE_UPDATE';
  conflictId: string;
  message: string;
  timestamp: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  acknowledged: boolean;
}

export interface FilterState {
  threatLevel: string[];
  conflictType: string[];
  status: string[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
}