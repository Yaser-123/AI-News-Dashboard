'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './audio-player';
import { BriefingOutput } from '@/lib/groq';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { 
  Search, 
  TrendingUp, 
  CheckCircle, 
  Video, 
  ArrowRight, 
  Loader2,
  Lightbulb,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BriefingSectionsProps {
  briefing: BriefingOutput;
  onExplainDeeper: (section: keyof BriefingOutput) => void;
  isExplaining: boolean;
  explanations: Record<string, string>;
}

type SectionKey = keyof BriefingOutput;

const sectionConfig: Record<SectionKey, {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}> = {
  highlights: {
    icon: Search,
    title: 'Key Highlights',
    description: 'The most important facts and developments from today\'s news.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  why_it_matters: {
    icon: TrendingUp,
    title: 'Market Analysis',
    description: 'Deep dive into why these events are significant for the market.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  what_to_do: {
    icon: CheckCircle,
    title: 'Action Items',
    description: 'Specific recommendations and next steps based on current events.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  video_script: {
    icon: Video,
    title: 'Daily Briefing Script',
    description: 'A natural, engaging script summarizing the entire briefing.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
};

export function BriefingSections({
  briefing,
  onExplainDeeper,
  isExplaining,
  explanations,
}: BriefingSectionsProps) {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);

  const handleDeepDive = (section: SectionKey) => {
    setActiveSection(section);
    if (!explanations[section]) {
      onExplainDeeper(section);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {(Object.keys(sectionConfig) as SectionKey[]).map((key) => {
          const config = sectionConfig[key];
          const Icon = config.icon;
          const content = briefing[key];
          const isVideo = key === 'video_script';

          return (
            <div 
              key={key} 
              className="group flex flex-col h-full bg-[#111111] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-2xl"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2.5 rounded-lg", config.bgColor)}>
                    <Icon className={cn("w-5 h-5", config.color)} />
                  </div>
                  {!isVideo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeepDive(key)}
                      className="text-xs h-8 text-muted-foreground hover:text-foreground hover:bg-white/5 gap-1.5"
                    >
                      Deep Analysis
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{config.title}</h3>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow">
                {key === 'highlights' && Array.isArray(content) ? (
                  <ul className="space-y-3">
                    {content.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : key === 'what_to_do' && Array.isArray(content) ? (
                  <ul className="space-y-4">
                    {content.map((item, idx) => (
                      <li key={idx} className="flex gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-sm text-gray-300 leading-relaxed">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-300 leading-relaxed italic whitespace-pre-wrap">
                    {isVideo ? `"${content as string}"` : content}
                  </p>
                )}
              </div>

              {/* Card Footer (Only for Video Script) */}
              {isVideo && (
                <div className="p-6 mt-auto border-t border-white/5 bg-black/20">
                  <AudioPlayer text={content as string} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Professional Deep Analysis Sheet */}
      <Sheet open={!!activeSection} onOpenChange={(open) => !open && setActiveSection(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-[#0a0a0a] border-l border-white/10 p-0 overflow-hidden flex flex-col">
          {activeSection && (
            <>
              <div className={cn("h-1 w-full", sectionConfig[activeSection].bgColor.replace('/10', ''))} />
              
              <div className="flex-grow p-8 overflow-y-auto custom-scrollbar">
                <SheetHeader className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("p-2 rounded-lg", sectionConfig[activeSection].bgColor)}>
                      {(() => {
                        const Icon = sectionConfig[activeSection].icon;
                        return <Icon className={cn("w-5 h-5", sectionConfig[activeSection].color)} />;
                      })()}
                    </div>
                    <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/5 text-muted-foreground border border-white/10">
                      Expert Analysis
                    </div>
                  </div>
                  <SheetTitle className="text-2xl font-bold text-white">
                    Deep Dive: {sectionConfig[activeSection].title}
                  </SheetTitle>
                  <SheetDescription className="text-gray-400">
                    Proprietary AI intelligence report synthesizing multi-agent reasoning.
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                  {isExplaining && !explanations[activeSection] ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin relative" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-white font-medium">Analyzing Context...</p>
                        <p className="text-xs text-muted-foreground">Synthesizing deeper market connections</p>
                      </div>
                    </div>
                  ) : explanations[activeSection] ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="p-1 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent">
                        <div className="bg-[#111111] rounded-[10px] p-6 text-sm text-gray-300 leading-relaxed shadow-inner">
                          {explanations[activeSection].split('\n\n').map((para, i) => (
                            <p key={i} className={i > 0 ? 'mt-4' : ''}>
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/5">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          Key Takeaways
                        </h4>
                        <div className="grid gap-3">
                          <div className="flex gap-3 items-start p-3 rounded-lg bg-white/[0.02]">
                            <Lightbulb className="w-4 h-4 text-blue-400 mt-1" />
                            <p className="text-[13px] text-gray-400">Focus on long-term sustainability and immediate volatility signals.</p>
                          </div>
                          <div className="flex gap-3 items-start p-3 rounded-lg bg-white/[0.02]">
                            <TrendingUp className="w-4 h-4 text-purple-400 mt-1" />
                            <p className="text-[13px] text-gray-400">Correlation with broader macroeconomic trends is strengthening.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-20 text-muted-foreground italic">
                      Unable to load analysis. Please try again.
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-black/40">
                <Button 
                  onClick={() => setActiveSection(null)}
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold tracking-tight rounded-lg py-6"
                >
                  Close Analysis
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
