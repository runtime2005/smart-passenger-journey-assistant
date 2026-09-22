import React, { useState } from 'react';
import { JourneyOption, TravelMode } from '../../types';
import { Train, Bus, Clock, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, CornerDownRight } from 'lucide-react';

interface JourneyCardsProps {
  journeys: JourneyOption[];
  selectedJourneyId: string;
  onSelectJourney: (id: string) => void;
  isDisrupted: boolean;
}

export const JourneyCards: React.FC<JourneyCardsProps> = ({
  journeys,
  selectedJourneyId,
  onSelectJourney,
  isDisrupted,
}) => {
  const [expandedLegsId, setExpandedLegsId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedLegsId(expandedLegsId === id ? null : id);
  };

  const renderModeIcon = (mode: TravelMode, index: number) => {
    switch (mode) {
      case 'train':
        return (
          <div key={`mode-${index}`} className="w-7 h-7 rounded-lg bg-[#138086]/10 text-[#138086] flex items-center justify-center">
            <Train className="w-4 h-4" />
          </div>
        );
      case 'bus':
        return (
          <div key={`mode-${index}`} className="w-7 h-7 rounded-lg bg-[#DC8665]/10 text-[#DC8665] flex items-center justify-center">
            <Bus className="w-4 h-4" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E2229]">
          Available Route Options ({journeys.length})
        </h3>
        <span className="text-xs text-[#696D7D] font-medium">
          Target: Arrive before 09:00 AM
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {journeys.map((journey) => {
          const isSelected = selectedJourneyId === journey.id;
          const isRec = journey.isRecommended;
          const isExpanded = expandedLegsId === journey.id;

          return (
            <div
              key={journey.id}
              onClick={() => onSelectJourney(journey.id)}
              className={`group relative rounded-2xl transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? 'bg-white border-[#138086] shadow-tactile-hover ring-1 ring-[#138086]/30'
                  : isRec
                  ? 'bg-white border-[#C8BFAD] hover:border-[#138086]/60 shadow-panel'
                  : 'bg-[#FAF7EE] border-[#E5DECD] hover:border-[#C4BBA0] shadow-subtle'
              }`}
            >
              {/* Subtle top recommendation accent line */}
              {isRec && (
                <div className="absolute top-0 left-6 right-6 h-[2.5px] bg-[#138086] rounded-t-full" />
              )}

              <div className="p-5 sm:p-6">
                
                {/* Header Row: Title & Recommended Label */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {journey.modeSummary.map((m, idx) => renderModeIcon(m, idx))}
                    </div>
                    <span className="font-display font-semibold text-base text-[#1E2229]">
                      {journey.title}
                    </span>
                  </div>

                  {isRec && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#138086]/10 text-[#138086] border border-[#138086]/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Recommended for you
                    </span>
                  )}
                </div>

                {/* Main Metrics: Departure ➔ Arrival, Duration, Cost */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
                  
                  {/* Timing Block */}
                  <div className="sm:col-span-6 flex items-center gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold font-display text-[#1E2229]">
                        {journey.departureTime}
                      </div>
                      <div className="text-[11px] text-[#696D7D] font-medium">Tambaram</div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[11px] font-semibold text-[#525862] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#534666]" />
                        {journey.durationMinutes} min
                      </span>
                      <div className="w-20 sm:w-24 h-[1.5px] bg-[#D8CEB8] relative my-1">
                        <div
                          className={`absolute inset-0 ${
                            isRec ? 'bg-[#138086]' : 'bg-[#696D7D]'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-[#8F97A4]">
                        {journey.transfersCount === 0 ? 'Direct' : `${journey.transfersCount} transfer`}
                      </span>
                    </div>

                    <div>
                      <div className={`text-xl sm:text-2xl font-bold font-display ${
                        journey.arrivalTime > '09:00 AM' ? 'text-[#DC8665]' : 'text-[#1E2229]'
                      }`}>
                        {journey.arrivalTime}
                      </div>
                      <div className="text-[11px] text-[#696D7D] font-medium">Chennai Central</div>
                    </div>
                  </div>

                  {/* Pricing & Crowd Block */}
                  <div className="sm:col-span-3 flex sm:flex-col sm:items-start justify-between border-t sm:border-t-0 sm:border-l border-[#EDE6D4] pt-2 sm:pt-0 sm:pl-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#8F97A4] font-medium">Fare</span>
                      <div className="text-lg font-bold text-[#1E2229]">₹{journey.costInr}</div>
                    </div>
                    <div className="text-right sm:text-left">
                      <span className="text-[11px] uppercase tracking-wider text-[#8F97A4] font-medium">Crowd</span>
                      <div className="text-xs font-semibold text-[#525862]">{journey.crowdRating}</div>
                    </div>
                  </div>

                  {/* Action Selection */}
                  <div className="sm:col-span-3 flex justify-end items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleExpand(journey.id, e)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#525862] hover:text-[#1E2229] hover:bg-[#F3ECCF] transition-colors flex items-center gap-1"
                    >
                      <span>Steps</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectJourney(journey.id)}
                      className={`text-xs px-3.5 py-2 rounded-lg font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#138086] text-white shadow-sm'
                          : 'bg-white border border-[#E2DACB] text-[#1E2229] hover:bg-[#FAF6EC]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                  </div>

                </div>

                {/* Explanation Snippet */}
                {journey.recommendationReason && (
                  <div className="mt-3 pt-3 border-t border-[#F0E9DA] flex items-center justify-between text-xs text-[#525862]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#138086]" />
                      <span>{journey.recommendationReason}</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8F97A4]">
                      Punctuality: {journey.punctualityScore}%
                    </span>
                  </div>
                )}

                {/* Expandable Step-by-Step Transit Legs */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#E8DFC9] space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#696D7D]">
                      Journey Itinerary Breakdown
                    </div>
                    {journey.legs.map((leg, legIdx) => (
                      <div
                        key={`leg-${legIdx}`}
                        className="p-3 rounded-xl bg-white border border-[#E4DCBF] flex items-start gap-3"
                      >
                        <div className="mt-0.5">
                          {leg.mode === 'train' ? (
                            <Train className="w-4 h-4 text-[#138086]" />
                          ) : (
                            <Bus className="w-4 h-4 text-[#DC8665]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#1E2229]">
                            <span>{leg.serviceName} ({leg.serviceNumber})</span>
                            <span className="font-mono text-[#525862]">
                              {leg.departureTime} ➔ {leg.arrivalTime}
                            </span>
                          </div>
                          <div className="text-xs text-[#525862] mt-0.5 flex items-center gap-1">
                            <span>{leg.fromStation}</span>
                            <ArrowRight className="w-3 h-3 text-[#8F97A4]" />
                            <span>{leg.toStation}</span>
                            {leg.platform && (
                              <span className="ml-1 text-[11px] font-medium text-[#138086]">
                                (Platform {leg.platform})
                              </span>
                            )}
                          </div>
                          {leg.guidanceNote && (
                            <div className="text-[11px] text-[#696D7D] mt-1.5 bg-[#FAF6EC] p-2 rounded-lg flex items-start gap-1.5">
                              <CornerDownRight className="w-3.5 h-3.5 text-[#138086] shrink-0 mt-0.5" />
                              <span>{leg.guidanceNote}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
