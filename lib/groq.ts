import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export interface BriefingOutput {
  highlights: string[];
  why_it_matters: string;
  what_to_do: string[];
  video_script: string;
}

export async function generateBriefing(
  topic: string,
  userType: 'Beginner' | 'Investor',
  articlesContent: string
): Promise<BriefingOutput> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not set');
  }

  const groq = createGroq({
    apiKey,
  });

  const userTypeDescription =
    userType === 'Beginner'
      ? 'a beginner with basic financial knowledge'
      : 'an experienced investor with deep market knowledge';

  const systemPrompt = `You are a multi-agent news intelligence system with 4 specialized agents working together.

Follow these 4 steps precisely:

1. NEWS AGENT: Clean and summarize the provided articles. Extract 3-5 key headlines and their essence.

2. ANALYSIS AGENT: From the cleaned articles, identify:
   - Key signals (what changed, what's new)
   - Trends (patterns, movements, directions)
   - Important developments

3. PERSONALIZATION AGENT: For ${userTypeDescription}, adapt all insights:
   - Use appropriate language and terminology
   - Focus on relevant impacts and implications
   - Provide actionable context

4. VIDEO AGENT: Generate a 4-6 line short script that narrates the key findings naturally and engagingly.

Return ONLY valid JSON (no markdown, no explanation, no code blocks):
{
  "highlights": ["point1", "point2", "point3"],
  "why_it_matters": "2-3 sentences explaining relevance and impact",
  "what_to_do": ["action1", "action2", "action3"],
  "video_script": "4-6 lines of natural narration"
}`;

  const userPrompt = `Topic: ${topic}
User Type: ${userType}

Articles:
${articlesContent}

Now follow the 4-step agent process and return the structured JSON briefing.`;

  try {
    console.log('[v0] Groq API Key present:', !!apiKey);
    const model = groq('llama-3.3-70b-versatile');
    console.log('[v0] Calling Groq with model:', model);
    
    const { text } = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    console.log('[v0] Groq response text length:', text.length);
    console.log('[v0] Groq response:', text.substring(0, 200));
    
    // Parse the JSON response
    const briefing = JSON.parse(text) as BriefingOutput;
    console.log('[v0] Successfully parsed briefing');

    // Validate structure
    if (!briefing.highlights || !Array.isArray(briefing.highlights)) {
      briefing.highlights = ['Unable to generate highlights'];
    }
    if (!briefing.why_it_matters) {
      briefing.why_it_matters = 'This topic is important for understanding current market dynamics.';
    }
    if (!briefing.what_to_do || !Array.isArray(briefing.what_to_do)) {
      briefing.what_to_do = ['Stay informed about developments', 'Monitor relevant updates'];
    }
    if (!briefing.video_script) {
      briefing.video_script = 'Recent developments suggest important changes in the landscape.';
    }

    return briefing;
  } catch (error) {
    console.error('[v0] Error generating briefing:', error);
    if (error instanceof Error) {
      console.error('[v0] Error message:', error.message);
      console.error('[v0] Error stack:', error.stack);
    }
    throw error;
  }
}

export async function generateDeeperExplanation(
  section: 'highlights' | 'why_it_matters' | 'what_to_do' | 'video_script',
  originalBriefing: BriefingOutput,
  userType: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not set');
  }

  const groq = createGroq({
    apiKey,
  });

  const sectionContent = originalBriefing[section as keyof BriefingOutput];

  const prompt = `You are a detailed news analyst. The user wants a deeper explanation of a briefing section.

Original ${section.replace(/_/g, ' ')}:
${Array.isArray(sectionContent) ? sectionContent.join('\n') : sectionContent}

Expand this with:
- More context and background
- Deeper analysis
- Additional data points or examples
- Nuance and implications

Return a detailed explanation (2-3 paragraphs) that provides deeper insight.`;

  try {
    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      prompt,
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error('[v0] Error generating deeper explanation:', error);
    throw error;
  }
}
