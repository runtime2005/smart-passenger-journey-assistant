import React from 'react';
import { StationNode, JourneyOption } from '../../types';
import { Radio, Clock, MapPin, Gauge, DoorOpen, Users, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface LiveJourneyViewProps {
  currentStation: StationNode;
  nextStation: StationNode;
  activeJourney: JourneyOption;
  isDisrupted: boolean;
  onExitLive: () => void;
}

export const LiveJourneyView: React.FC<LiveJourneyViewProps> = ({
  currentStation,
  nextStation,
  activeJourney,
  isDisrupted,
  onExitLive,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2DACB] p-5 sm:p-7 shadow-panel space-y-6">
      {/* Live Header with Pulsing Telemetry Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F0E9DA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#138086] text-white flex items-center justify-center shadow-sm">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-xl text-[#1E2229]">
                Live In-Transit Companion
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#138086]/10 text-[#138086] border border-[#138086]/20">
                GPS Synced • 10 Hz
              </span>
            </div>
            <p className="text-xs text-[#696D7D]">
              Service: EMU 40012 Fast Suburban • Coach 06 (Second Class)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onExitLive}
          className="btn-tactile-secondary text-xs font-semibold py-2 px-3 self-start sm:self-auto"
        >
          Exit live mode
        </button>
      </div>

      {/* Main Real-time Station Progression Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Current Location */}
        <div className="p-4 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#696D7D]">
            <MapPin className="w-3.5 h-3.5 text-[#138086]" />
            <span>Current Position</span>
          </div>
          <div className="text-2xl font-bold font-display text-[#1E2229]">
            {currentStation.name}
          </div>
          <div className="text-xs text-[#525862] flex items-center justify-between">
            <span>Departed: 08:05 AM</span>
            <span className="font-mono text-[#138086] font-semibold">Platform {currentStation.platform}</span>
          </div>
        </div>

        {/* Next Approaching Stop */}
        <div className="p-4 rounded-xl bg-white border-2 border-[#138086] shadow-sm space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#138086]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#138086]">
              Next Approaching Stop
            </span>
            <span className="text-xs font-mono font-bold text-[#138086] bg-[#138086]/10 px-2 py-0.5 rounded-full">
              in 3 min
            </span>
          </div>
          <div className="text-2xl font-bold font-display text-[#1E2229]">
            {nextStation.name}
          </div>
          <div className="text-xs text-[#525862] flex items-center justify-between">
            <span>Estimated Arrival: {nextStation.scheduledArrival}</span>
            <span className="font-semibold text-[#1E2229]">Platform {nextStation.platform}</span>
          </div>
        </div>

        {/* Dynamic Journey ETA / Disruption Advisory */}
        <div className={`p-4 rounded-xl border space-y-2 ${
          isDisrupted
            ? 'bg-[#FAF6EC] border-[#DC8665]'
            : 'bg-[#FAF6EC] border-[#E4DCBF]'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDisrupted ? 'text-[#DC8665]' : 'text-[#534666]'
            }`}>
              Final Destination ETA
            </span>
            <Clock className={`w-3.5 h-3.5 ${isDisrupted ? 'text-[#DC8665]' : 'text-[#534666]'}`} />
          </div>
          <div className="text-2xl font-bold font-display text-[#1E2229] flex items-baseline gap-2">
            <span>{activeJourney.arrivalTime}</span>
            {isDisrupted && (
              <span className="text-xs font-semibold text-[#138086]">
                (via Bus Bypass)
              </span>
            )}
          </div>
          <div className="text-xs text-[#525862]">
            {isDisrupted ? (
              <span className="text-[#DC8665] font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Alight at Guindy to preserve 8:47 AM arrival
              </span>
            ) : (
              <span className="text-[#138086] font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                On schedule to arrive before 9:00 AM target
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Real-time Train Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex items-center gap-3">
          <Gauge className="w-5 h-5 text-[#138086]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8F97A4]">Speed</div>
            <div className="text-sm font-bold text-[#1E2229]">62 km/h</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex items-center gap-3">
          <DoorOpen className="w-5 h-5 text-[#534666]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8F97A4]">Door Exit</div>
            <div className="text-sm font-bold text-[#1E2229]">Left Side</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex items-center gap-3">
          <Users className="w-5 h-5 text-[#EEB462]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8F97A4]">Coach Density</div>
            <div className="text-sm font-bold text-[#1E2229]">Moderate (64%)</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#DC8665]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-[#8F97A4]">Signal Variance</div>
            <div className="text-sm font-bold text-[#1E2229]">{isDisrupted ? '+35 min' : '±0 sec'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
