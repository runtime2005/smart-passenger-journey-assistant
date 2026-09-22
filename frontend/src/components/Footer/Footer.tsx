import React from 'react';
import { Train, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#E2DACB] bg-[#FAF3DD] py-12 text-[#525862]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#138086] text-white flex items-center justify-center">
                <Train className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-[#1E2229]">
                Smart Journey
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#EBE3CE] text-[#534666] border border-[#DDD3BC]">
                SIH 2026
              </span>
            </div>
            <p className="text-xs text-[#696D7D] max-w-md">
              Intelligent railway companion engineered for high-density suburban transit corridors, real-time delay mitigation, and multimodal passenger guidance.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs">
            <div>
              <div className="font-bold text-[#1E2229] uppercase tracking-wider mb-2">
                Monitored Corridors
              </div>
              <ul className="space-y-1 text-[#696D7D]">
                <li>Tambaram ➔ Chennai Central (MMC)</li>
                <li>Chennai Beach ➔ Chengalpattu</li>
                <li>Guindy Multimodal Interchange</li>
                <li>Chennai Metro Blue Line Feeder</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-[#1E2229] uppercase tracking-wider mb-2">
                System Standards
              </div>
              <ul className="space-y-1 text-[#696D7D]">
                <li>WCAG 2.1 AA Accessible</li>
                <li>GTFS-Realtime Integration</li>
                <li>Sub-second Reroute Engine</li>
                <li>Zero Flashy Clutter</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E8DFC9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8F97A4]">
          <div className="flex items-center gap-2">
            <span>Built for Smart India Hackathon (SIH 2026)</span>
            <span>•</span>
            <span>Ministry of Railways Challenge</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#696D7D]">
            <ShieldCheck className="w-4 h-4 text-[#138086]" />
            <span>Calm, trustworthy, passenger-first design</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
