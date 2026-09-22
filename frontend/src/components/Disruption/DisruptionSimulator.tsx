import React from 'react';
import { AlertCircle, RotateCcw, Zap, GitMerge, ArrowRight, ShieldCheck } from 'lucide-react';
import { DisruptionEvent } from '../../types';

interface DisruptionSimulatorProps {
  isDisrupted: boolean;
  onToggleDisruption: () => void;
  disruptionEvent?: DisruptionEvent;
}

export const DisruptionSimulator: React.FC<DisruptionSimulatorProps> = ({
  isDisrupted,
  onToggleDisruption,
  disruptionEvent,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2DACB] p-5 sm:p-7 shadow-panel">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F0E9DA]">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isDisrupted ? 'bg-[#DC8665]' : 'bg-[#138086]'}`} />
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E2229]">
              SIH Evaluation Simulator • Real-Time Disruption Handling
            </h3>
          </div>
          <p className="text-xs text-[#696D7D] mt-0.5">
            Test how the assistant forecasts unexpected delays and dynamically synthesizes multimodal alternatives.
          </p>
        </div>

        {/* Primary Simulation Button */}
        <div>
          {isDisrupted ? (
            <button
              type="button"
              onClick={onToggleDisruption}
              className="btn-tactile-secondary flex items-center gap-2 text-xs font-semibold text-[#525862]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#138086]" />
              <span>Reset to normal schedule</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleDisruption}
              className="btn-tactile-coral flex items-center gap-2 text-xs font-semibold"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Simulate disruption</span>
            </button>
          )}
        </div>
      </div>

      {/* Disruption Telemetry State Display */}
      {isDisrupted ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Box 1: Detected Incident */}
          <div className="p-4 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC8665]">
                Detected Incident
              </span>
              <span className="text-[10px] font-mono bg-[#DC8665]/10 text-[#DC8665] px-2 py-0.5 rounded-full font-bold">
                +35 Min Delay
              </span>
            </div>
            <div className="text-sm font-bold text-[#1E2229]">
              Saidapet Signal Clearance Hold
            </div>
            <p className="text-xs text-[#525862] leading-relaxed">
              Automatic interlock halt. EMU 40012 delayed; revised arrival pushed to <strong className="text-[#DC8665]">09:27 AM</strong> (past target).
            </p>
          </div>

          {/* Box 2: ML Engine Response */}
          <div className="p-4 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#534666]">
                Autonomous Reroute
              </span>
              <span className="text-[10px] font-mono text-[#138086] font-semibold">
                94% Confidence
              </span>
            </div>
            <div className="text-sm font-bold text-[#1E2229]">
              Alight at Guindy ➔ MTC 18A Bus
            </div>
            <p className="text-xs text-[#525862] leading-relaxed">
              Transfers passenger at Platform 2 to dedicated Anna Salai bus corridor. Arrives Central at <strong className="text-[#138086]">08:47 AM</strong>.
            </p>
          </div>

          {/* Box 3: Passenger Outcome */}
          <div className="p-4 rounded-xl bg-[#FAF6EC] border border-[#138086]/30 space-y-1.5 bg-gradient-to-br from-[#FAF6EC] to-[#F1ECE0]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#138086]">
                Passenger Outcome
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#138086]">
                <ShieldCheck className="w-3 h-3" />
                Target Met
              </span>
            </div>
            <div className="text-sm font-bold text-[#138086] flex items-center gap-2">
              <span>Saves 40 Minutes</span>
            </div>
            <p className="text-xs text-[#525862] leading-relaxed">
              Arrives 13 minutes before your 9:00 AM target time instead of being stranded on the suburban line.
            </p>
          </div>

        </div>
      ) : (
        <div className="mt-5 p-4 rounded-xl bg-[#FAF6EC] border border-[#E4DCBF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#525862]">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#138086]" />
            <span>
              All suburban services running on regular timetable. Click <strong>"Simulate disruption"</strong> to trigger real-time signal failure propagation and automated AI rescue routing.
            </span>
          </div>
          <div className="font-mono text-[#8F97A4] shrink-0">
            System latency: 42ms
          </div>
        </div>
      )}
    </div>
  );
};
