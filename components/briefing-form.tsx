'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BriefingFormProps {
  onSubmit: (topic: string, userType: 'Beginner' | 'Investor') => void;
  isLoading: boolean;
}

export function BriefingForm({ onSubmit, isLoading }: BriefingFormProps) {
  const [topic, setTopic] = useState('');
  const [userType, setUserType] = useState<'Beginner' | 'Investor'>('Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, userType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="bg-card border border-border rounded-lg p-6 shadow-card space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-foreground mb-2">
            What topic would you like a briefing on?
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Budget 2026, AI developments, Tech stocks..."
            disabled={isLoading}
            className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-foreground mb-2">
            I am a:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'Beginner' | 'Investor')}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            <option value="Beginner">Beginner (Simple explanations)</option>
            <option value="Investor">Investor (Detailed insights)</option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={isLoading || !topic.trim()}
          className="w-full bg-primary hover:bg-blue-600 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating Briefing...' : 'Generate Briefing'}
        </Button>
      </div>
    </form>
  );
}
