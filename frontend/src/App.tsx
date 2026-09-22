import React, { useState, useRef } from 'react';
import { RailwayAtmosphere } from './components/ThreeBackground/RailwayAtmosphere';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { TransitMap } from './components/TransitMap/TransitMap';
import { JourneyCards } from './components/JourneyCards/JourneyCards';
import { DisruptionSimulator } from './components/Disruption/DisruptionSimulator';
import { Assistant } from './components/Assistant/Assistant';
import { LiveJourneyView } from './components/LiveJourney/LiveJourneyView';
import { FeatureSections } from './components/Features/FeatureSections';
import { Footer } from './components/Footer/Footer';

import {
  INITIAL_STATIONS,
  INITIAL_JOURNEYS,
  DISRUPTED_JOURNEYS,
  ACTIVE_DISRUPTION,
  INITIAL_ASSISTANT_MESSAGES,
  DISRUPTED_ASSISTANT_MESSAGES,
} from './data/mockJourneys';
import { PreferenceType, StationNode } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'live' | 'assistant'>('plan');
  const [isPlanning, setIsPlanning] = useState(false);
  const [hasPlanned, setHasPlanned] = useState(true); // Default planned for immediate visual delight & demonstration
  const [isDisrupted, setIsDisrupted] = useState(false);

  // Journeys & Selection State
  const [journeys, setJourneys] = useState(INITIAL_JOURNEYS);
  const [selectedJourneyId, setSelectedJourneyId] = useState('journey-train-direct');
  const [stations, setStations] = useState<StationNode[]>(INITIAL_STATIONS);
  const [assistantMessages, setAssistantMessages] = useState(INITIAL_ASSISTANT_MESSAGES);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle Planning trigger
  const handlePlanJourney = (params: {
    origin: string;
    destination: string;
    arriveBefore: string;
    preference: PreferenceType;
  }) => {
    setIsPlanning(true);
    setTimeout(() => {
      setIsPlanning(false);
      setHasPlanned(true);
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  // Toggle Disruption Simulation
  const handleToggleDisruption = () => {
    if (!isDisrupted) {
      // Trigger Disruption
      setIsDisrupted(true);
      setJourneys(DISRUPTED_JOURNEYS);
      setSelectedJourneyId('journey-multimodal-guindy');
      setAssistantMessages(DISRUPTED_ASSISTANT_MESSAGES);

      // Update station statuses
      setStations((prev) =>
        prev.map((s) => {
          if (s.id === 'sp') return { ...s, status: 'disrupted' };
          if (s.id === 'gdy') return { ...s, status: 'current' };
          return s;
        })
      );
    } else {
      // Reset Disruption
      setIsDisrupted(false);
      setJourneys(INITIAL_JOURNEYS);
      setSelectedJourneyId('journey-train-direct');
      setAssistantMessages(INITIAL_ASSISTANT_MESSAGES);
      setStations(INITIAL_STATIONS);
    }
  };

  // Handle Assistant Action Buttons
  const handleAssistantAction = (actionType: string) => {
    switch (actionType) {
      case 'accept_reroute':
        setSelectedJourneyId('journey-multimodal-guindy');
        setActiveTab('live');
        break;
      case 'view_alternatives':
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'explain_recommendation':
        // Add detailed explanation
        setAssistantMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            timestamp: 'Just now',
            text: 'Recommendation rationale: The suburban track between Guindy and Saidapet has an active signaling clearance lock. Bus 18A departs Guindy Bus Bay 3 via the reserved Anna Salai corridor and reaches Chennai Central at 08:47 AM, avoiding a 35-minute delay on the tracks.',
            highlight: 'Saves 40 min • Dedicated arterial bus lane • Platform 2 transfer',
          },
        ]);
        break;
      default:
        break;
    }
  };

  const activeJourney = journeys.find((j) => j.id === selectedJourneyId) || journeys[0];

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-[#138086]/20 selection:text-[#138086]">
      {/* 3D Atmospheric Background (15% visual weight, subtle, low contrast) */}
      <RailwayAtmosphere
        isPlanned={hasPlanned}
        isDisrupted={isDisrupted}
        activeRouteId={selectedJourneyId}
      />

      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDisrupted={isDisrupted}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'plan' && (
          <div className="space-y-12">
            {/* Hero Section with Integrated Tactile Planner */}
            <Hero
              onPlanJourney={handlePlanJourney}
              isPlanning={isPlanning}
              onExploreDemo={() => {
                if (resultsRef.current) {
                  resultsRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* Results & Interactive Corridor Workspace */}
            {hasPlanned && (
              <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* SIH Disruption Simulation Control Bar */}
                <DisruptionSimulator
                  isDisrupted={isDisrupted}
                  onToggleDisruption={handleToggleDisruption}
                  disruptionEvent={ACTIVE_DISRUPTION}
                />

                {/* Living SVG Transit Route Map */}
                <TransitMap
                  stations={stations}
                  isDisrupted={isDisrupted}
                  selectedStationId="gdy"
                />

                {/* Split Layout: Available Journey Cards + Contextual AI Assistant */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Route Options */}
                  <div className="lg:col-span-7">
                    <JourneyCards
                      journeys={journeys}
                      selectedJourneyId={selectedJourneyId}
                      onSelectJourney={(id) => setSelectedJourneyId(id)}
                      isDisrupted={isDisrupted}
                    />
                  </div>

                  {/* Right Column: Native Contextual Assistant */}
                  <div className="lg:col-span-5 sticky top-24">
                    <Assistant
                      messages={assistantMessages}
                      onActionClick={handleAssistantAction}
                      isDisrupted={isDisrupted}
                    />
                  </div>

                </div>

                {/* Narrative & Capabilities Sections */}
                <FeatureSections />

              </div>
            )}
          </div>
        )}

        {/* Live Journey In-Transit Tab */}
        {activeTab === 'live' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <LiveJourneyView
              currentStation={stations[0]}
              nextStation={stations[1]}
              activeJourney={activeJourney}
              isDisrupted={isDisrupted}
              onExitLive={() => setActiveTab('plan')}
            />

            {/* Transit Map in live view */}
            <TransitMap
              stations={stations}
              isDisrupted={isDisrupted}
              selectedStationId={stations[0].id}
            />
          </div>
        )}

        {/* Dedicated Assistant Tab */}
        {activeTab === 'assistant' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Assistant
              messages={assistantMessages}
              onActionClick={handleAssistantAction}
              isDisrupted={isDisrupted}
            />
          </div>
        )}
      </main>

      {/* Transportation System Footer */}
      <Footer />
    </div>
  );
};

export default App;
