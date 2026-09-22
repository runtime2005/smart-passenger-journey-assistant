import React, { useState } from 'react';
import { AssistantMessage } from '../../types';
import { Compass, CornerDownRight, Send, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface AssistantProps {
  messages: AssistantMessage[];
  onActionClick: (actionType: string) => void;
  isDisrupted: boolean;
  onAskCustomQuestion?: (question: string) => void;
}

export const Assistant: React.FC<AssistantProps> = ({
  messages,
  onActionClick,
  isDisrupted,
  onAskCustomQuestion,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [internalMessages, setInternalMessages] = useState<AssistantMessage[]>(messages);

  // Sync when messages prop updates
  React.useEffect(() => {
    setInternalMessages(messages);
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue('');

    const newMsg: AssistantMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text: userText,
    };

    let replyText = "I've analyzed your corridor: Guindy multimodal hub is operating smoothly. Platform 2 connects directly via the covered footbridge to MTC Bay 3 for central arterial buses.";
    let highlight = "Guindy multimodal skywalk transfer • 3 min connection";

    if (userText.toLowerCase().includes('why') || userText.toLowerCase().includes('reason')) {
      replyText = "The multimodal bypass saves 40 minutes because Anna Salai has an active dedicated bus rapid lane, whereas the suburban track between Saidapet and Mambalam is blocked by an automatic signal interlock inspection.";
      highlight = "Dedicated bus corridor avoids rail interlock hold";
    } else if (userText.toLowerCase().includes('metro') || userText.toLowerCase().includes('subway')) {
      replyText = "Chennai Metro Blue Line is also available at Guindy Station (Underground concourse). You can board the direct metro toward Chennai Central Metro (Puratchi Thalaivar Dr. M.G.R Metro) departing every 6 minutes.";
      highlight = "Metro Blue Line: 19 min direct to Central";
    }

    const replyMsg: AssistantMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'assistant',
      timestamp: 'Just now',
      text: replyText,
      highlight,
      actionSuggestions: [
        { label: 'Take this route', actionType: 'accept_reroute' },
        { label: 'View alternative options', actionType: 'view_alternatives' },
      ],
    };

    setInternalMessages((prev) => [...prev, newMsg, replyMsg]);
    if (onAskCustomQuestion) onAskCustomQuestion(userText);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2DACB] p-5 sm:p-7 shadow-panel">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F0E9DA]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#534666] text-white flex items-center justify-center shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-[#1E2229]">
              Journey Intelligence Assistant
            </h3>
            <p className="text-xs text-[#696D7D]">
              Context-aware travel reasoning grounded in live railway telemetry
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-medium text-[#138086] bg-[#138086]/10 px-2.5 py-1 rounded-full border border-[#138086]/20 hidden sm:inline-block">
          Active Monitor
        </span>
      </div>

      {/* Native Contextual Dialogue Thread */}
      <div className="py-4 space-y-4 max-h-[380px] overflow-y-auto pr-1">
        {internalMessages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="text-[11px] text-[#8F97A4] font-mono mb-1 px-1">
                {isUser ? 'You' : 'Assistant'} • {msg.timestamp}
              </div>

              <div
                className={`max-w-2xl rounded-xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-[#FAF6EC] border border-[#E4DCBF] text-[#1E2229]'
                    : 'bg-white border border-[#E2DACB] text-[#1E2229] shadow-subtle'
                }`}
              >
                <p>{msg.text}</p>

                {/* Highlight Capsule */}
                {msg.highlight && (
                  <div className="mt-2.5 pt-2.5 border-t border-[#F0E9DA] flex items-center gap-2 text-xs font-semibold text-[#138086]">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{msg.highlight}</span>
                  </div>
                )}

                {/* Quick Action Buttons */}
                {msg.actionSuggestions && msg.actionSuggestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#F0E9DA] flex flex-wrap items-center gap-2">
                    {msg.actionSuggestions.map((action, actIdx) => (
                      <button
                        key={`action-${actIdx}`}
                        type="button"
                        onClick={() => onActionClick(action.actionType)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF6EC] border border-[#E2DACB] text-[#1E2229] hover:bg-[#138086] hover:text-white hover:border-[#138086] transition-all flex items-center gap-1 active:scale-95"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3 h-3 opacity-70" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="pt-3 border-t border-[#F0E9DA]">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] text-[#8F97A4] font-medium flex items-center gap-1">
            <HelpCircle className="w-3 h-3" />
            Quick inquiry:
          </span>
          <button
            type="button"
            onClick={() => setInputValue('Why is this alternative recommended over waiting?')}
            className="text-xs text-[#525862] hover:text-[#1E2229] bg-[#FAF6EC] px-2.5 py-1 rounded-md border border-[#E4DCBF] transition-colors"
          >
            "Why this recommendation?"
          </button>
          <button
            type="button"
            onClick={() => setInputValue('Can I take Chennai Metro from Guindy instead of bus?')}
            className="text-xs text-[#525862] hover:text-[#1E2229] bg-[#FAF6EC] px-2.5 py-1 rounded-md border border-[#E4DCBF] transition-colors"
          >
            "Is Metro Blue Line available?"
          </button>
          <button
            type="button"
            onClick={() => setInputValue('Which platform at Guindy for the skywalk to bus bay?')}
            className="text-xs text-[#525862] hover:text-[#1E2229] bg-[#FAF6EC] px-2.5 py-1 rounded-md border border-[#E4DCBF] transition-colors"
          >
            "Guindy platform details"
          </button>
        </div>

        {/* Input Field */}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about delays, transfers, crowd levels, or step-free navigation..."
            className="flex-1 bg-[#FAF6EC] border border-[#E2DACB] rounded-xl px-4 py-2.5 text-sm text-[#1E2229] placeholder-[#8F97A4] focus:outline-none focus:border-[#138086] transition-colors"
          />
          <button
            type="submit"
            className="btn-tactile-primary px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
