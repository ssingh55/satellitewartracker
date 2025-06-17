import { ConflictZone, Alert } from '../types';

export const mockConflictZones: ConflictZone[] = [
  {
    id: 'conflict-001',
    name: 'Iran-Israel Regional Conflict',
    country: 'Middle East',
    coordinates: { lat: 32.4279, lng: 53.6880 }, // Iran coordinates
    threatLevel: 'CRITICAL',
    conflictType: 'ARMED_CONFLICT',
    status: 'ESCALATING',
    lastUpdated: '2025-01-09T16:30:00Z',
    casualties: { military: 4247, civilian: 2893 },
    description: 'Active regional conflict involving Iranian missile strikes and Israeli airstrikes. Escalating tensions with proxy forces across the region. Recent ballistic missile exchanges have intensified the situation significantly.',
    satelliteImages: [
      'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/41006/satellite-nasa-space-earth-41006.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: true,
      infrastructure_damage: true,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-002',
    name: 'Russia-Ukraine War',
    country: 'Ukraine',
    coordinates: { lat: 49.8419, lng: 24.0315 },
    threatLevel: 'CRITICAL',
    conflictType: 'ARMED_CONFLICT',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T16:15:00Z',
    casualties: { military: 45670, civilian: 18930 },
    description: 'Ongoing full-scale invasion with active combat operations across multiple fronts. Winter offensive operations continue with significant military engagement.',
    satelliteImages: [
      'https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/41006/satellite-nasa-space-earth-41006.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: true,
      infrastructure_damage: true,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-003',
    name: 'Gaza War',
    country: 'Gaza Strip',
    coordinates: { lat: 31.3547, lng: 34.3088 },
    threatLevel: 'HIGH',
    conflictType: 'ARMED_CONFLICT',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T16:00:00Z',
    casualties: { military: 3456, civilian: 12827 },
    description: 'Ongoing military operations in Gaza with significant civilian casualties and infrastructure damage. Humanitarian crisis continues.',
    satelliteImages: [
      'https://images.pexels.com/photos/586056/pexels-photo-586056.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: true,
      infrastructure_damage: true,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-004',
    name: 'Red Sea Crisis',
    country: 'Yemen/Red Sea',
    coordinates: { lat: 15.5527, lng: 43.5164 },
    threatLevel: 'HIGH',
    conflictType: 'ARMED_CONFLICT',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T15:45:00Z',
    casualties: { military: 234, civilian: 89 },
    description: 'Houthi attacks on international shipping in Red Sea. Coalition airstrikes targeting Houthi positions. Major disruption to global trade routes.',
    satelliteImages: [
      'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: false,
      vehicle_concentrations: true,
      infrastructure_damage: true,
      refugee_displacement: false
    }
  },
  {
    id: 'conflict-005',
    name: 'Sudan Civil War',
    country: 'Sudan',
    coordinates: { lat: 15.5007, lng: 32.5599 },
    threatLevel: 'HIGH',
    conflictType: 'CIVIL_UNREST',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T15:30:00Z',
    casualties: { military: 8900, civilian: 15600 },
    description: 'Ongoing civil war between Sudanese Armed Forces and Rapid Support Forces. Widespread civilian casualties and displacement.',
    satelliteImages: [
      'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: true,
      infrastructure_damage: true,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-006',
    name: 'Myanmar Civil Conflict',
    country: 'Myanmar',
    coordinates: { lat: 21.9162, lng: 95.9560 },
    threatLevel: 'MEDIUM',
    conflictType: 'CIVIL_UNREST',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T15:00:00Z',
    casualties: { military: 4500, civilian: 8900 },
    description: 'Ongoing resistance against military junta. Multiple ethnic armed groups active across the country.',
    satelliteImages: [
      'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: false,
      infrastructure_damage: true,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-007',
    name: 'Ethiopia-Tigray Tensions',
    country: 'Ethiopia',
    coordinates: { lat: 14.2701, lng: 38.2751 },
    threatLevel: 'MEDIUM',
    conflictType: 'CIVIL_UNREST',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T14:45:00Z',
    casualties: { military: 2300, civilian: 4100 },
    description: 'Renewed tensions in Tigray region despite peace agreement. Sporadic clashes continue.',
    satelliteImages: [
      'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: false,
      vehicle_concentrations: true,
      infrastructure_damage: false,
      refugee_displacement: true
    }
  },
  {
    id: 'conflict-008',
    name: 'South China Sea Tensions',
    country: 'South China Sea',
    coordinates: { lat: 16.0583, lng: 113.5683 },
    threatLevel: 'MEDIUM',
    conflictType: 'TERRITORIAL_DISPUTE',
    status: 'ACTIVE',
    lastUpdated: '2025-01-09T14:30:00Z',
    casualties: { military: 0, civilian: 0 },
    description: 'Naval tensions and territorial claims with multiple countries. Increased military presence and confrontations at sea.',
    satelliteImages: [
      'https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    intelligence: {
      troop_movements: true,
      vehicle_concentrations: true,
      infrastructure_damage: false,
      refugee_displacement: false
    }
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'ESCALATION',
    conflictId: 'conflict-001',
    message: 'URGENT: Iranian ballistic missiles launched toward Israeli targets - multiple impacts detected',
    timestamp: '2025-01-09T16:45:00Z',
    priority: 'URGENT',
    acknowledged: false
  },
  {
    id: 'alert-002',
    type: 'SATELLITE_ANOMALY',
    conflictId: 'conflict-001',
    message: 'Massive thermal signatures detected across Iranian military installations',
    timestamp: '2025-01-09T16:20:00Z',
    priority: 'HIGH',
    acknowledged: false
  },
  {
    id: 'alert-003',
    type: 'NEW_CONFLICT',
    conflictId: 'conflict-004',
    message: 'Houthi forces launch coordinated attack on commercial vessels in Red Sea',
    timestamp: '2025-01-09T16:00:00Z',
    priority: 'HIGH',
    acknowledged: false
  },
  {
    id: 'alert-004',
    type: 'ESCALATION',
    conflictId: 'conflict-002',
    message: 'Increased artillery bombardment detected along Ukrainian eastern front',
    timestamp: '2025-01-09T15:45:00Z',
    priority: 'HIGH',
    acknowledged: false
  },
  {
    id: 'alert-005',
    type: 'INTELLIGENCE_UPDATE',
    conflictId: 'conflict-005',
    message: 'Rapid Support Forces advancing toward Khartoum - civilian evacuation underway',
    timestamp: '2025-01-09T15:30:00Z',
    priority: 'MEDIUM',
    acknowledged: true
  }
];