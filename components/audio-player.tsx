'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  text: string;
}

export function AudioPlayer({ text }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const syntheysisRef = useRef<SpeechSynthesis | null>(null);
  const wordsRef = useRef<string[]>([]);

  useEffect(() => {
    syntheysisRef.current = window.speechSynthesis;
  }, []);

  const handlePlay = () => {
    if (typeof window === 'undefined') return;

    const synth = syntheysisRef.current;
    if (!synth) return;

    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Extract words for highlighting
    wordsRef.current = text.split(/\s+/);

    let wordIndex = 0;
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setHighlightedWord(wordIndex);
        wordIndex++;
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setHighlightedWord(0);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
    setIsPlaying(true);
  };

  const handlePause = () => {
    const synth = syntheysisRef.current;
    if (!synth) return;

    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    const synth = syntheysisRef.current;
    if (!synth) return;

    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setHighlightedWord(0);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {!isPlaying && !isPaused && (
          <Button
            onClick={handlePlay}
            className="bg-accent hover:bg-blue-600 text-accent-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            <span>▶</span> Play Audio
          </Button>
        )}
        {isPlaying && (
          <Button
            onClick={handlePause}
            className="bg-warning hover:bg-amber-600 text-black font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            <span>⏸</span> Pause
          </Button>
        )}
        {isPaused && (
          <Button
            onClick={handlePlay}
            className="bg-accent hover:bg-blue-600 text-accent-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2"
          >
            <span>▶</span> Resume
          </Button>
        )}
        {(isPlaying || isPaused) && (
          <Button
            onClick={handleStop}
            className="bg-destructive hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Stop
          </Button>
        )}
      </div>

      {/* Optional: Word highlight display */}
      {(isPlaying || isPaused) && (
        <div className="text-sm text-muted-foreground bg-input rounded-md p-3 max-h-24 overflow-y-auto">
          {wordsRef.current.map((word, idx) => (
            <span
              key={idx}
              className={`transition-colors ${
                idx === highlightedWord
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : idx < highlightedWord
                    ? 'text-muted-foreground'
                    : 'text-foreground'
              }`}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
