export type TravelMode = 'train' | 'metro' | 'bus' | 'walk';

export type PreferenceType = 'fastest' | 'cheapest' | 'fewer_transfers' | 'step_free';

export interface StationNode {
  id: string;
  name: string;
  tamilName?: string;
  code: string;
  distanceKm: number;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival?: string;
  actualDeparture?: string;
  platform: number;
  isInterchange?: boolean;
  interchangeModes?: TravelMode[];
  status: 'passed' | 'current' | 'upcoming' | 'delayed' | 'disrupted';
  crowdLevel: 'low' | 'moderate' | 'high';
  accessibility: boolean;
}

export interface JourneyLeg {
  mode: TravelMode;
  serviceNumber: string;
  serviceName: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  platform?: number;
  delayMinutes: number;
  status: 'on_time' | 'delayed' | 'cancelled' | 'rerouted';
  guidanceNote?: string;
}

export interface JourneyOption {
  id: string;
  title: string;
  modeSummary: TravelMode[];
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  costInr: number;
  transfersCount: number;
  isRecommended: boolean;
  recommendationReason?: string;
  punctualityScore: number; // e.g. 98%
  legs: JourneyLeg[];
  crowdRating: 'Calm' | 'Moderate' | 'Busy';
  stepFreeAccessible: boolean;
  co2SavingsKg?: number;
}

export interface DisruptionEvent {
  isActive: boolean;
  corridor: string;
  location: string;
  delayMinutes: number;
  cause: string;
  severity: 'minor' | 'moderate' | 'critical';
  impactedServices: string[];
  recalculatedTimestamp: string;
  mlConfidence: number;
  recommendedAction: string;
}

export interface AssistantMessage {
  id: string;
  sender: 'system' | 'user' | 'assistant';
  timestamp: string;
  text: string;
  highlight?: string;
  actionSuggestions?: Array<{
    label: string;
    actionType: 'accept_reroute' | 'view_alternatives' | 'explain_recommendation' | 'station_navigation' | 'custom';
    payload?: string;
  }>;
}
