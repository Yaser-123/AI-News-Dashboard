'use client';

import { useEffect, useState } from 'react';

type AgentStep = 'news' | 'analysis' | 'personalization' | 'video';

interface AgentActivityLogProps {
  isLoading: boolean;
  completedSteps?: AgentStep[];
}

const steps: { id: AgentStep; icon: string; label: string; description: string }[] = [
  { id: 'news', icon: '🧠', label: 'News Agent', description: 'Fetching latest news...' },
  { id: 'analysis', icon: '📊', label: 'Analysis Agent', description: 'Analyzing key signals...' },
  { id: 'personalization', icon: '🎯', label: 'Personalization Agent', description: 'Personalizing insights...' },
  { id: 'video', icon: '🎥', label: 'Video Agent', description: 'Generating video script...' },
];

export function AgentActivityLog({ isLoading, completedSteps = [] }: AgentActivityLogProps) {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);

  useEffect(() => {
    if (!isLoading) {
      setVisibleSteps(0);
      return;
    }

    const interval = setInterval(() => {
      setVisibleSteps((prev) => Math.min(prev + 1, steps.length));
    }, 800);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading && visibleSteps === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card mb-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Agent Execution</h3>
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isVisible = idx < visibleSteps;
          const isCompleted = completedSteps.includes(step.id) || idx < visibleSteps - 1;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0 animate-slide-in-left' : 'opacity-0'
              }`}
            >
              <div className={`flex-shrink-0 text-lg ${isCompleted ? 'scale-110' : ''}`}>
                {isCompleted ? '✓' : step.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{step.label}</div>
                <div
                  className={`text-xs transition-colors ${
                    isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  {isCompleted ? 'Complete' : step.description}
                </div>
              </div>
              {!isCompleted && isVisible && (
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full animate-pulse-subtle"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
