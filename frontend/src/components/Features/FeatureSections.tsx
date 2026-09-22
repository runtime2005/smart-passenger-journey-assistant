import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, Sparkles, Accessibility, TrendingUp, CheckCircle, Clock, Banknote, GitFork, ArrowRight } from 'lucide-react';
import { PreferenceType } from '../../types';

export const FeatureSections: React.FC = () => {
  const [activePersona, setActivePersona] = useState<PreferenceType>('fastest');

  const personas = [
    {
      id: 'fastest' as PreferenceType,
      label: 'Express Commuter',
      icon: Clock,
      headline: 'Prioritizes punctuality & minimal dwell time',
      routeDesc: 'Suburban EMU Direct + Guindy Bus Express standby',
      saving: 'Arrives 15–40 min earlier',
      metric: '08:45 AM Target Met',
      accentColor: '#138086',
    },
    {
      id: 'cheapest' as PreferenceType,
      label: 'Budget Traveler',
      icon: Banknote,
      headline: 'Optimizes for lowest tariff across transit modes',
      routeDesc: 'Direct Suburban Rail Standard Second Class',
      saving: 'Fare: Only ₹15 total',
      metric: '68% Lower Cost',
      accentColor: '#534666',
    },
    {
      id: 'fewer_transfers' as PreferenceType,
      label: 'Direct Only',
      icon: GitFork,
      headline: 'Eliminates platform switching and transfers',
      routeDesc: 'Single-leg seat-guaranteed corridor direct to Central',
      saving: '0 Transfers Required',
      metric: 'Zero Transfer Fatigue',
      accentColor: '#DC8665',
    },
    {
      id: 'step_free' as PreferenceType,
      label: 'Accessible Travel',
      icon: Accessibility,
      headline: 'Guarantees elevators, ramps & level boarding',
      routeDesc: 'Guindy Station Skywalk with dual lift access + low-floor EV bus',
      saving: '100% Step-Free Route',
      metric: 'Elevator Verified',
      accentColor: '#CD7672',
    },
  ];

  const currentPersona = personas.find((p) => p.id === activePersona) || personas[0];

  return (
    <div className="space-y-20 py-8">
      
      {/* SECTION 1: When The Unexpected Happens */}
      <section className="bg-white rounded-3xl border border-[#E2DACB] p-6 sm:p-10 shadow-panel">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC8665]/10 text-[#DC8665] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Adaptive Resilience
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1E2229] tracking-tight">
            When the unexpected happens.
          </h2>
          <p className="text-base sm:text-lg text-[#525862] mt-3 leading-relaxed">
            Suburban railway tracks inevitably encounter signal checks, freight precedence, and weather holds. Instead of leaving you stranded with generic delay boards, Smart Journey orchestrates proactive multimodal rescue.
          </p>
        </div>

        {/* 3 Step Visual Progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-3 relative group hover:border-[#138086] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#D8CEB8] flex items-center justify-center font-bold text-xs text-[#138086] shadow-subtle">
              01
            </div>
            <h3 className="font-display font-bold text-base text-[#1E2229]">
              Predictive Anomaly Detection
            </h3>
            <p className="text-xs text-[#525862] leading-relaxed">
              Real-time ingestion of track block occupancies and speed telemetry predicts a delay before the train comes to a complete halt.
            </p>
            <div className="text-[11px] font-mono text-[#8F97A4] pt-2 border-t border-[#EDE4CD]">
              Telemetry rate: 10 Hz
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-3 relative group hover:border-[#DC8665] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#D8CEB8] flex items-center justify-center font-bold text-xs text-[#DC8665] shadow-subtle">
              02
            </div>
            <h3 className="font-display font-bold text-base text-[#1E2229]">
              Multimodal Rescue Synthesis
            </h3>
            <p className="text-xs text-[#525862] leading-relaxed">
              Calculates alternate connections across Chennai Metro Blue Line, MTC express buses, and suburban feeders to identify the fastest bypass.
            </p>
            <div className="text-[11px] font-mono text-[#8F97A4] pt-2 border-t border-[#EDE4CD]">
              Calculation time: &lt; 0.4s
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-3 relative group hover:border-[#534666] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-white border border-[#D8CEB8] flex items-center justify-center font-bold text-xs text-[#534666] shadow-subtle">
              03
            </div>
            <h3 className="font-display font-bold text-base text-[#1E2229]">
              Calm, Actionable Guidance
            </h3>
            <p className="text-xs text-[#525862] leading-relaxed">
              Delivers precise transfer instructions—such as alighting at Guindy Platform 2 and walking across the covered skywalk to Bus Bay 3.
            </p>
            <div className="text-[11px] font-mono text-[#8F97A4] pt-2 border-t border-[#EDE4CD]">
              Saved time: Up to 40 min
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Personalized Journey Section */}
      <section className="bg-white rounded-3xl border border-[#E2DACB] p-6 sm:p-10 shadow-panel">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#138086]/10 text-[#138086] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Adaptive Engine
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#1E2229] tracking-tight">
            Personalized journey intelligence.
          </h2>
          <p className="text-base sm:text-lg text-[#525862] mt-3 leading-relaxed">
            Different passengers have different constraints. Choose a persona below to see how recommendations dynamically configure route priority, transfer thresholds, and walking tolerances.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isSelected = activePersona === persona.id;

            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setActivePersona(persona.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#FAF6EC] border-[#138086] shadow-sm ring-1 ring-[#138086]/30'
                    : 'bg-white border-[#E4DCBF] hover:bg-[#FAF6EC]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: persona.accentColor }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-sm text-[#1E2229]">
                    {persona.label}
                  </span>
                </div>
                <div className="text-[11px] text-[#696D7D] line-clamp-1">
                  {persona.saving}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Persona Deep Dive Card */}
        <div className="p-6 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#696D7D]">
              Tailored Route Configuration
            </div>
            <h3 className="font-display font-bold text-xl text-[#1E2229]">
              {currentPersona.headline}
            </h3>
            <p className="text-sm text-[#525862] leading-relaxed">
              Recommended Transit Path: <strong>{currentPersona.routeDesc}</strong>. The algorithm adjusts interchange walking times, avoids high-crowd footbridges, and synchronizes real-time feeder departures.
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-white border border-[#E2DACB] text-center space-y-1 shadow-subtle">
            <div className="text-[11px] uppercase tracking-wider text-[#8F97A4] font-semibold">
              Engine Performance
            </div>
            <div className="text-xl font-bold font-display" style={{ color: currentPersona.accentColor }}>
              {currentPersona.metric}
            </div>
            <div className="text-xs text-[#525862]">
              {currentPersona.saving}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Live Telemetry & Network Health */}
      <section className="bg-white rounded-3xl border border-[#E2DACB] p-6 sm:p-10 shadow-panel">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0E9DA]">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#138086]" />
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#1E2229]">
                Chennai Suburban Network Telemetry
              </h2>
            </div>
            <p className="text-xs text-[#696D7D] mt-0.5">
              Live operational health monitored across Southern Railway division
            </p>
          </div>
          <span className="text-xs font-mono text-[#525862] bg-[#FAF6EC] px-3 py-1.5 rounded-full border border-[#E4DCBF]">
            Last sync: 12 seconds ago
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF]">
            <div className="text-xs uppercase font-bold text-[#696D7D]">Punctuality Rate</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#138086] mt-1">98.4%</div>
            <div className="text-[11px] text-[#525862] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#138086]" />
              <span>Above 95% target</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF]">
            <div className="text-xs uppercase font-bold text-[#696D7D]">Active Suburban Trains</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#1E2229] mt-1">342</div>
            <div className="text-[11px] text-[#525862] mt-1">
              Beach–Tambaram–Chengalpattu
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF]">
            <div className="text-xs uppercase font-bold text-[#696D7D]">Monitored Stations</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#534666] mt-1">31</div>
            <div className="text-[11px] text-[#525862] mt-1">
              Equipped with smart telemetry
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#E4DCBF]">
            <div className="text-xs uppercase font-bold text-[#696D7D]">Avg Reroute Latency</div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#DC8665] mt-1">0.38s</div>
            <div className="text-[11px] text-[#525862] mt-1">
              Autonomous bypass synthesis
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
