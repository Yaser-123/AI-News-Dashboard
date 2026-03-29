import { NextRequest, NextResponse } from 'next/server';
import { generateDeeperExplanation, BriefingOutput } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const { section, briefing, userType } = await request.json();

    // Validate inputs
    if (!section || !['highlights', 'why_it_matters', 'what_to_do', 'video_script'].includes(section)) {
      return NextResponse.json(
        { error: 'Valid section is required: highlights, why_it_matters, what_to_do, or video_script' },
        { status: 400 }
      );
    }

    if (!briefing || typeof briefing !== 'object') {
      return NextResponse.json(
        { error: 'Briefing object is required' },
        { status: 400 }
      );
    }

    // Generate deeper explanation
    const explanation = await generateDeeperExplanation(
      section as 'highlights' | 'why_it_matters' | 'what_to_do' | 'video_script',
      briefing as BriefingOutput,
      userType || 'General'
    );

    return NextResponse.json({
      explanation,
      section,
    });
  } catch (error) {
    console.error('[v0] Explain deeper API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate deeper explanation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
