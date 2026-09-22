import React, { useState } from 'react';
import { ArrowUpDown, Clock, Zap, Banknote, GitFork, Accessibility, Search, Loader2 } from 'lucide-react';
import { PreferenceType } from '../../types';

interface JourneyPlannerProps {
  onPlanJourney: (params: {
    origin: string;
    destination: string;
    arriveBefore: string;
    preference: PreferenceType;
  }) => void;
  isPlanning: boolean;
}

export const JourneyPlanner: React.FC<JourneyPlannerProps> = ({
  onPlanJourney,
  isPlanning,
}) => {
  const [origin, setOrigin] = useState('Tambaram');
  const [destination, setDestination] = useState('Chennai Central');
  const [arriveBefore, setArriveBefore] = useState('09:00 AM');
  const [preference, setPreference] = useState<PreferenceType>('fastest');

  const handleSwapStations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlanJourney({ origin, destination, arriveBefore, preference });
  };

  const stations = [
    'Tambaram',
    'Chromepet',
    'St. Thomas Mount',
    'Guindy',
    'Mambalam',
    'Chennai Egmore',
    'Chennai Central',
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2DACB] p-5 sm:p-7 shadow-panel relative">
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-6 right-6 h-[3px] bg-gradient-to-r from-[#138086] via-[#DC8665] to-[#534666] rounded-t-full opacity-70" />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Origin & Destination Inputs with Tactile Swap Button */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
          
          {/* Origin */}
          <div className="md:col-span-5 bg-[#FAF6EC] rounded-xl p-3.5 border border-[#E4DCBF] hover:border-[#138086]/50 transition-colors">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#696D7D] mb-1">
              From Origin
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#138086] ring-4 ring-[#138086]/15" />
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-transparent text-base sm:text-lg font-medium text-[#1E2229] focus:outline-none cursor-pointer"
              >
                {stations.map((s) => (
                  <option key={`origin-${s}`} value={s}>
                    {s} {s === 'Tambaram' ? '(TBM - Suburban Hub)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={handleSwapStations}
              className="w-10 h-10 rounded-full bg-white border border-[#E2DACB] text-[#525862] hover:text-[#138086] hover:border-[#138086] hover:shadow-sm flex items-center justify-center transition-all active:scale-95"
              title="Swap origin and destination"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-5 bg-[#FAF6EC] rounded-xl p-3.5 border border-[#E4DCBF] hover:border-[#DC8665]/50 transition-colors">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#696D7D] mb-1">
              To Destination
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DC8665] ring-4 ring-[#DC8665]/15" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-base sm:text-lg font-medium text-[#1E2229] focus:outline-none cursor-pointer"
              >
                {stations.map((s) => (
                  <option key={`dest-${s}`} value={s}>
                    {s} {s === 'Chennai Central' ? '(MAS - Moore Market)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Arrival Time Target & Journey Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-1">
          
          {/* Arrive Before Selector */}
          <div className="sm:col-span-4 bg-[#FAF6EC] rounded-xl p-3 border border-[#E4DCBF]">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#696D7D] mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#534666]" />
              Arrive Before
            </span>
            <select
              value={arriveBefore}
              onChange={(e) => setArriveBefore(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#1E2229] focus:outline-none cursor-pointer"
            >
              <option value="08:45 AM">08:45 AM (Early window)</option>
              <option value="09:00 AM">09:00 AM (Target arrival)</option>
              <option value="09:15 AM">09:15 AM (Flexible buffer)</option>
              <option value="09:30 AM">09:30 AM (Late morning)</option>
            </select>
          </div>

          {/* Preferences Pills */}
          <div className="sm:col-span-8">
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#696D7D] mb-2">
              Optimization Priority
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPreference('fastest')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  preference === 'fastest'
                    ? 'bg-[#138086] text-white border-[#138086] shadow-sm'
                    : 'bg-[#FAF6EC] text-[#525862] border-[#E4DCBF] hover:border-[#C4BBA0]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Fastest
              </button>

              <button
                type="button"
                onClick={() => setPreference('cheapest')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  preference === 'cheapest'
                    ? 'bg-[#138086] text-white border-[#138086] shadow-sm'
                    : 'bg-[#FAF6EC] text-[#525862] border-[#E4DCBF] hover:border-[#C4BBA0]'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" />
                Cheapest
              </button>

              <button
                type="button"
                onClick={() => setPreference('fewer_transfers')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  preference === 'fewer_transfers'
                    ? 'bg-[#138086] text-white border-[#138086] shadow-sm'
                    : 'bg-[#FAF6EC] text-[#525862] border-[#E4DCBF] hover:border-[#C4BBA0]'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                Direct Only
              </button>

              <button
                type="button"
                onClick={() => setPreference('step_free')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  preference === 'step_free'
                    ? 'bg-[#138086] text-white border-[#138086] shadow-sm'
                    : 'bg-[#FAF6EC] text-[#525862] border-[#E4DCBF] hover:border-[#C4BBA0]'
                }`}
              >
                <Accessibility className="w-3.5 h-3.5" />
                Accessible
              </button>
            </div>
          </div>

        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0E9DA]">
          <div className="text-xs text-[#696D7D] hidden sm:block">
            Southern Railway Suburban Line • Real-time delay engine active
          </div>
          <button
            type="submit"
            disabled={isPlanning}
            className="w-full sm:w-auto btn-tactile-primary flex items-center justify-center gap-2 min-w-[200px]"
          >
            {isPlanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Computing routes...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Plan journey</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};
