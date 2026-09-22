import React from 'react';
import { JourneyPlanner } from '../JourneyPlanner/JourneyPlanner';
import { PreferenceType } from '../../types';
import { ShieldCheck, Compass, GitMerge, Clock } from 'lucide-react';

interface HeroProps {
  onPlanJourney: (params: {
    origin: string;
    destination: string;
    arriveBefore: string;
    preference: PreferenceType;
  }) => void;
  isPlanning: boolean;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlanJourney,
  isPlanning,
  onExploreDemo,
}) => {
  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Eyebrow */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#138086]/10 border border-[#138086]/25 text-[#138086] text-xs font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#138086]" />
            Intelligent Transit System
          </div>
          <span className="text-xs text-[#696D7D] font-medium hidden sm:inline-block">
            Chennai Suburban Corridor • Beach–Tambaram–Chengalpattu
          </span>
        </div>

        {/* Hero Grid Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Expressive Headline & Context */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#1E2229] leading-[1.08] tracking-tight">
              Your journey,{' '}
              <span className="text-[#138086] block mt-1">
                even when plans change.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#4A5260] font-normal leading-relaxed max-w-xl">
              Real-time guidance for smarter, calmer travel. Predictive delay forecasting, automated multimodal bypasses, and live platform intelligence for railway passengers.
            </p>

            {/* Subtle Value Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-3 max-w-md">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] border border-[#E2DACB] flex items-center justify-center shrink-0 text-[#138086]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-[#1E2229]">Predictive ETA</h2>
                  <p className="text-[11px] text-[#696D7D] leading-tight mt-0.5">Forecasts signal holds before they happen</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF6EC] border border-[#E2DACB] flex items-center justify-center shrink-0 text-[#DC8665]">
                  <GitMerge className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-[#1E2229]">Multimodal Rescue</h2>
                  <p className="text-[11px] text-[#696D7D] leading-tight mt-0.5">Bypass train delays via Bus & Metro</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Shortcut */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onExploreDemo}
                className="text-xs font-semibold text-[#534666] hover:text-[#1E2229] underline underline-offset-4 flex items-center gap-1 transition-colors"
              >
                <Compass className="w-3.5 h-3.5" />
                Explore Tambaram ➔ Central Live Corridor Demo
              </button>
            </div>
          </div>

          {/* Right Column: Tactile Journey Planner Panel */}
          <div className="lg:col-span-6 w-full">
            <div className="relative">
              {/* Subtle layered shadow behind panel */}
              <div className="absolute -inset-1.5 bg-[#FAF6EC]/80 rounded-3xl -z-10 blur-sm" />
              <JourneyPlanner
                onPlanJourney={onPlanJourney}
                isPlanning={isPlanning}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
