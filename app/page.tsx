'use client';

import { useState, useCallback } from 'react';
import { BriefingForm } from '@/components/briefing-form';
import { BriefingSections } from '@/components/briefing-sections';
import { AgentActivityLog } from '@/components/agent-activity-log';
import { PreviousSearch } from '@/components/previous-search';
import { BriefingOutput } from '@/lib/groq';

export default function Home() {
  const [briefing, setBriefing] = useState<BriefingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [fallbackReason, setFallbackReason] = useState<string>('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [currentUserType, setCurrentUserType] = useState<'Beginner' | 'Investor'>('Beginner');

  const handleGenerateBriefing = useCallback(async (topic: string, userType: 'Beginner' | 'Investor') => {
    setIsLoading(true);
    setBriefing(null);
    setExplanations({});
    setCurrentTopic(topic);
    setCurrentUserType(userType);

    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, userType }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('[v0] API error:', error);
        alert('Failed to generate briefing: ' + (error.error || 'Unknown error'));
        return;
      }

      const data = await response.json();
      console.log('[v0] Response data:', data);
      console.log('[v0] Briefing:', data.briefing);
      setBriefing(data.briefing);
      setIsFallback(data.isFallback);
      setFallbackReason(data.fallbackReason);

      // Store in localStorage
      localStorage.setItem('lastSearchTopic', topic);
    } catch (error) {
      console.error('[v0] Error:', error);
      alert('An error occurred while generating the briefing');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleExplainDeeper = useCallback(
    async (section: keyof BriefingOutput) => {
      if (!briefing) return;

      setIsExplaining(true);
      try {
        const response = await fetch('/api/explain-deeper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section,
            briefing,
            userType: currentUserType,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('[v0] Explain deeper error:', error);
          return;
        }

        const data = await response.json();
        setExplanations((prev) => ({
          ...prev,
          [section]: data.explanation,
        }));
      } catch (error) {
        console.error('[v0] Error:', error);
      } finally {
        setIsExplaining(false);
      }
    },
    [briefing, currentUserType]
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Economist Intelligence Hub</h1>
          <p className="text-muted-foreground">The Economic Times: Multi-agent AI system for real-time financial briefings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Previous Search */}
        <PreviousSearch onSelect={(topic) => handleGenerateBriefing(topic, currentUserType)} isLoading={isLoading} />

        {/* Form */}
        <div className="mb-8">
          <BriefingForm onSubmit={handleGenerateBriefing} isLoading={isLoading} />
        </div>

        {/* Agent Activity Log */}
        <AgentActivityLog isLoading={isLoading} />

        {/* Fallback Notification */}
        {isFallback && briefing && (
          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4 mb-6 flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-sm font-medium text-yellow-100">Live news unavailable</p>
              <p className="text-sm text-yellow-200">Using fallback data: {fallbackReason}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {briefing && (
          <div>
            <BriefingSections
              briefing={briefing}
              onExplainDeeper={handleExplainDeeper}
              isExplaining={isExplaining}
              explanations={explanations}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !briefing && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Enter a topic above to generate your AI briefing</p>
          </div>
        )}
      </div>
    </main>
  );
}
