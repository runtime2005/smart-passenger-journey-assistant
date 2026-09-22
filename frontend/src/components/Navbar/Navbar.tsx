import React from 'react';
import { Train, ShieldAlert, CheckCircle2, Radio, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: 'plan' | 'live' | 'assistant';
  setActiveTab: (tab: 'plan' | 'live' | 'assistant') => void;
  isDisrupted: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDisrupted,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF3DD]/90 border-b border-[#E2DACB] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#138086] text-white flex items-center justify-center shadow-sm border border-white/20">
            <Train className="w-5 h-5" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl tracking-tight text-[#1E2229]">
                Smart Journey
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#EBE3CE] text-[#534666] border border-[#DDD3BC]">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-[#696D7D] font-medium hidden sm:block">
              Intelligent Railway Travel Companion
            </p>
          </div>
        </div>

        {/* Center Navigation Controls */}
        <nav className="flex items-center bg-[#F3ECCF] p-1 rounded-xl border border-[#E2DACB]">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'plan'
                ? 'bg-white text-[#1E2229] shadow-sm font-semibold'
                : 'text-[#525862] hover:text-[#1E2229]'
            }`}
          >
            Plan journey
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'live'
                ? 'bg-white text-[#1E2229] shadow-sm font-semibold'
                : 'text-[#525862] hover:text-[#1E2229]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#138086]" />
            Live journey
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'assistant'
                ? 'bg-white text-[#1E2229] shadow-sm font-semibold'
                : 'text-[#525862] hover:text-[#1E2229]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#534666]" />
            Assistant
          </button>
        </nav>

        {/* Live Network Operational Capsule */}
        <div className="hidden md:flex items-center">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
              isDisrupted
                ? 'bg-[#EEB462]/15 border-[#EEB462]/40 text-[#6B4B18]'
                : 'bg-[#138086]/10 border-[#138086]/25 text-[#138086]'
            }`}
          >
            {isDisrupted ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EEB462] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EEB462]"></span>
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-[#DC8665]" />
                <span>Delay Advisory: Saidapet Sector</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#138086]"></span>
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#138086]" />
                <span>Southern Railway • Normal Punctuality</span>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
