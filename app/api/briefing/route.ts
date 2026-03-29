import { NextRequest, NextResponse } from 'next/server';
import { fetchNews } from '@/lib/news-api';
import { formatArticlesForPrompt } from '@/lib/news-api';
import { generateBriefing, BriefingOutput } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] Briefing API called');
    const { topic, userType } = await request.json();
    console.log('[v0] Briefing API called with:', { topic, userType });

    // Validate inputs
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!['Beginner', 'Investor'].includes(userType)) {
      return NextResponse.json(
        { error: 'User type must be either "Beginner" or "Investor"' },
        { status: 400 }
      );
    }

    console.log('[v0] Validation passed, fetching news for topic:', topic);
    // Step 1: News Agent - Fetch articles
    console.log('[v0] Fetching news for topic:', topic);
    const newsResult = await fetchNews(topic);
    console.log('[v0] News result:', { isFallback: newsResult.isFallback, articleCount: newsResult.articles.length });
    const articlesContent = formatArticlesForPrompt(newsResult.articles);
    console.log('[v0] Articles formatted');

    // Step 2-4: Call Groq with multi-agent prompt
    // (Analysis Agent, Personalization Agent, Video Agent happen within the Groq call)
    console.log('[v0] Calling generateBriefing');
    const briefing = await generateBriefing(topic, userType, articlesContent);
    console.log('[v0] Briefing generated:', briefing);
    console.log('[v0] Briefing generated successfully');

    return NextResponse.json({
      briefing,
      isFallback: newsResult.isFallback,
      fallbackReason: newsResult.fallbackReason,
    });
  } catch (error) {
    console.error('[v0] API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate briefing',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
