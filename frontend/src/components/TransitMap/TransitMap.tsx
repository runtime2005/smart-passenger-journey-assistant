import React, { useState } from 'react';
import { StationNode } from '../../types';
import { AlertTriangle, Bus, Train, CheckCircle2, Users, Accessibility, ArrowRight } from 'lucide-react';

interface TransitMapProps {
  stations: StationNode[];
  isDisrupted: boolean;
  selectedStationId?: string;
  onSelectStation?: (station: StationNode) => void;
  activeLegMode?: 'train' | 'bus' | 'all';
}

export const TransitMap: React.FC<TransitMapProps> = ({
  stations,
  isDisrupted,
  selectedStationId,
  onSelectStation,
}) => {
  const [activeStation, setActiveStation] = useState<StationNode>(
    stations.find((s) => s.id === 'gdy') || stations[3]
  );

  const handleStationClick = (st: StationNode) => {
    setActiveStation(st);
    if (onSelectStation) onSelectStation(st);
  };

  // Node positions on 1000 x 280 SVG coordinate space
  // Stations: 8 stations spaced horizontally across line
  const nodePositions = [
    { x: 70, y: 140, id: 'tbm' },
    { x: 190, y: 140, id: 'cmp' },
    { x: 310, y: 140, id: 'stm' },
    { x: 440, y: 140, id: 'gdy' }, // Guindy interchange
    { x: 570, y: 140, id: 'sp' },  // Saidapet (disruption zone)
    { x: 700, y: 140, id: 'mbm' },
    { x: 820, y: 140, id: 'ms' },
    { x: 930, y: 140, id: 'mas' }, // Chennai Central
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2DACB] p-5 sm:p-7 shadow-panel">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#F0E9DA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#138086]" />
            <h2 className="font-display font-bold text-lg sm:text-xl text-[#1E2229]">
              Corridor Schematic • Tambaram ➔ Chennai Central
            </h2>
          </div>
          <p className="text-xs text-[#696D7D] mt-0.5">
            Active Suburban Line (Chennai Beach Corridor) • Interactive Node Telemetry
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-[#525862]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-sm bg-[#138086]" />
            <span>Suburban Rail</span>
          </div>
          {isDisrupted && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1.5 rounded-sm bg-[#DC8665]" />
              <span>Bus Bypass (MTC 18A)</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#534666] bg-white" />
            <span>Interchange Hub</span>
          </div>
        </div>
      </div>

      {/* Interactive Living SVG Map Canvas */}
      <div className="relative w-full overflow-x-auto py-4">
        <div className="min-w-[760px] w-full">
          <svg
            viewBox="0 0 1000 240"
            className="w-full h-auto select-none overflow-visible"
            aria-label="Transit Route Schematic"
          >
            <defs>
              {/* Subtle gradients */}
              <linearGradient id="mainRailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#138086" />
                <stop offset="45%" stopColor="#138086" />
                <stop offset="55%" stopColor={isDisrupted ? "#DC8665" : "#138086"} />
                <stop offset="100%" stopColor={isDisrupted ? "#CD7672" : "#138086"} />
              </linearGradient>

              <linearGradient id="busBypassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EEB462" />
                <stop offset="50%" stopColor="#DC8665" />
                <stop offset="100%" stopColor="#138086" />
              </linearGradient>

              {/* Shadow filter */}
              <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1E2229" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* Base Track Background Bed */}
            <path
              d="M 70 140 L 930 140"
              stroke="#E8E0CD"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Main Active Track Line */}
            <path
              d="M 70 140 L 930 140"
              stroke="url(#mainRailGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              className="transition-colors duration-500"
            />

            {/* If Disrupted: Highlight the congested track segment between Guindy and Saidapet */}
            {isDisrupted && (
              <g className="transition-opacity duration-500">
                {/* Congestion glow line */}
                <line
                  x1="440"
                  y1="140"
                  x2="570"
                  y2="140"
                  stroke="#DC8665"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                  className="animate-dash"
                />

                {/* Disruption Icon & Marker */}
                <g transform="translate(505, 122)">
                  <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#DC8665" strokeWidth="2" filter="url(#nodeShadow)" />
                  <foreignObject x="-8" y="-8" width="16" height="16">
                    <AlertTriangle className="w-4 h-4 text-[#DC8665]" />
                  </foreignObject>
                </g>
                <text
                  x="505"
                  y="100"
                  textAnchor="middle"
                  fill="#DC8665"
                  className="text-[11px] font-bold font-sans tracking-wide"
                >
                  Signal Hold (+35 min)
                </text>
              </g>
            )}

            {/* Alternative Bus Route Bypass (Arches gracefully from Guindy to Central) */}
            {isDisrupted && (
              <g className="transition-all duration-700 animate-fadeIn">
                {/* Curved bypass arc */}
                <path
                  d="M 440 140 C 500 40, 720 40, 930 140"
                  fill="none"
                  stroke="url(#busBypassGrad)"
                  strokeWidth="3.5"
                  strokeDasharray="6 4"
                  className="animate-dash"
                />

                {/* Bus Bypass Badge floating along curve */}
                <g transform="translate(685, 48)">
                  <rect
                    x="-68"
                    y="-14"
                    width="136"
                    height="28"
                    rx="14"
                    fill="#FFFFFF"
                    stroke="#138086"
                    strokeWidth="1.5"
                    filter="url(#nodeShadow)"
                  />
                  <foreignObject x="-60" y="-8" width="16" height="16">
                    <Bus className="w-4 h-4 text-[#138086]" />
                  </foreignObject>
                  <text
                    x="-38"
                    y="4"
                    fill="#138086"
                    className="text-[11px] font-bold font-sans"
                  >
                    Bus 18A Bypass
                  </text>
                  <text
                    x="48"
                    y="4"
                    fill="#DC8665"
                    className="text-[10px] font-bold font-sans"
                  >
                    -40m
                  </text>
                </g>
              </g>
            )}

            {/* Moving Train Marker on Track */}
            <g transform={isDisrupted ? "translate(380, 140)" : "translate(260, 140)"} className="transition-transform duration-1000 ease-out">
              {/* Pulse ripple */}
              <circle cx="0" cy="0" r="18" fill="#138086" opacity="0.18" className="animate-soft-pulse" />
              
              {/* Train indicator capsule */}
              <circle cx="0" cy="0" r="10" fill="#138086" stroke="#FFFFFF" strokeWidth="2.5" filter="url(#nodeShadow)" />
              <foreignObject x="-5" y="-5" width="10" height="10">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#138086]" />
                </div>
              </foreignObject>
              <text
                x="0"
                y="-16"
                textAnchor="middle"
                fill="#138086"
                className="text-[10px] font-bold font-sans"
              >
                EMU 40012
              </text>
            </g>

            {/* Station Nodes */}
            {stations.map((st, i) => {
              const pos = nodePositions[i] || { x: 70 + i * 115, y: 140, id: st.id };
              const isSelected = activeStation.id === st.id;
              const isInterchange = st.isInterchange;
              const isGuindy = st.id === 'gdy';

              return (
                <g
                  key={st.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer group"
                  onClick={() => handleStationClick(st)}
                >
                  {/* Outer selection ring */}
                  {isSelected && (
                    <circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="none"
                      stroke="#534666"
                      strokeWidth="2"
                      strokeDasharray="3 3"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isInterchange ? 9 : 6.5}
                    fill={isGuindy ? '#DC8665' : isInterchange ? '#534666' : '#FFFFFF'}
                    stroke={isGuindy ? '#FFFFFF' : isInterchange ? '#FFFFFF' : '#138086'}
                    strokeWidth={isInterchange ? 2.5 : 2}
                    filter="url(#nodeShadow)"
                    className="transition-transform group-hover:scale-125"
                  />

                  {/* Station Name Labels (Alternating top/bottom for readability) */}
                  <text
                    x="0"
                    y={i % 2 === 0 ? 32 : 46}
                    textAnchor="middle"
                    fill={isSelected ? '#1E2229' : '#4A5260'}
                    className={`text-[12px] font-sans ${isSelected ? 'font-bold' : 'font-medium'} transition-colors group-hover:fill-[#138086]`}
                  >
                    {st.name}
                  </text>

                  {/* Scheduled Arrival Time Label */}
                  <text
                    x="0"
                    y={i % 2 === 0 ? 46 : 60}
                    textAnchor="middle"
                    fill="#8F97A4"
                    className="text-[10px] font-mono font-medium"
                  >
                    {st.scheduledArrival}
                  </text>

                  {/* Interchange Tag for Guindy / Central */}
                  {isInterchange && (
                    <g transform={`translate(0, ${i % 2 === 0 ? -28 : -28})`}>
                      <rect
                        x="-20"
                        y="-8"
                        width="40"
                        height="15"
                        rx="4"
                        fill="#F3ECCF"
                        stroke="#D8CEB8"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        fill="#534666"
                        className="text-[8px] font-bold font-sans uppercase tracking-wider"
                      >
                        Hub
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected Station Telemetry Drawer */}
      <div className="mt-4 p-4 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-[#E2DACB] flex items-center justify-center font-bold text-[#138086] shadow-sm">
            {activeStation.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-[#1E2229]">
                {activeStation.name}
              </h3>
              {activeStation.tamilName && (
                <span className="text-xs text-[#696D7D]">({activeStation.tamilName})</span>
              )}
              {activeStation.isInterchange && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#534666] text-white">
                  Multimodal Hub
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-[#696D7D] mt-0.5">
              <span>Platform {activeStation.platform}</span>
              <span>•</span>
              <span>Distance: {activeStation.distanceKm} km</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3 text-[#138086]" />
                Crowd: <strong className="text-[#1E2229] capitalize">{activeStation.crowdLevel}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Station Facilities & Status */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-[#138086]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Smart Displays Active</span>
          </div>
          {activeStation.accessibility && (
            <div className="flex items-center gap-1.5 text-[#534666]">
              <Accessibility className="w-4 h-4" />
              <span>Step-Free Access</span>
            </div>
          )}
          {activeStation.id === 'gdy' && isDisrupted && (
            <div className="px-3 py-1.5 rounded-lg bg-[#DC8665]/15 border border-[#DC8665]/30 text-[#DC8665] font-semibold flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5" />
              <span>Recommended Alighting Hub</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
