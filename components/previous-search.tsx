'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface PreviousSearchProps {
  onSelect: (topic: string) => void;
  isLoading: boolean;
}

export function PreviousSearch({ onSelect, isLoading }: PreviousSearchProps) {
  const [previousTopic, setPreviousTopic] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('lastSearchTopic');
    if (stored) {
      setPreviousTopic(stored);
    }
  }, []);

  if (!previousTopic) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4 flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Previously searched: <span className="text-foreground font-medium">{previousTopic}</span>
      </span>
      <Button
        onClick={() => onSelect(previousTopic)}
        disabled={isLoading}
        className="bg-secondary hover:bg-purple-700 text-secondary-foreground font-medium py-1 px-3 rounded-md text-sm transition-colors disabled:opacity-50"
      >
        Re-run
      </Button>
    </div>
  );
}
