import { getTopicSpecificMockArticles, mockArticles } from './mock-data';

interface NewsArticle {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
  urlToImage: string | null;
  content: string;
}

export interface FetchNewsResult {
  articles: NewsArticle[];
  isFallback: boolean;
  fallbackReason?: string;
}

export async function fetchNews(topic: string): Promise<FetchNewsResult> {
  const newsApiKey = process.env.NEWS_API_KEY;

  if (!newsApiKey) {
    console.warn('[v0] NEWS_API_KEY not configured, using fallback data');
    return {
      articles: getTopicSpecificMockArticles(topic),
      isFallback: true,
      fallbackReason: 'API key not configured',
    };
  }

  try {
    const query = encodeURIComponent(topic);
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=5&apiKey=${newsApiKey}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.warn(`[v0] News API returned status ${response.status}, using fallback`);
      return {
        articles: getTopicSpecificMockArticles(topic),
        isFallback: true,
        fallbackReason: `API error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      console.warn('[v0] No articles found, using fallback data');
      return {
        articles: getTopicSpecificMockArticles(topic),
        isFallback: true,
        fallbackReason: 'No articles found for topic',
      };
    }

    // Format and limit to 5 articles
    const articles = data.articles.slice(0, 5).map((article: any) => ({
      title: article.title,
      description: article.description || '',
      source: { name: article.source?.name || 'Unknown' },
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
      content: article.content || article.description || '',
    }));

    return {
      articles,
      isFallback: false,
    };
  } catch (error) {
    console.error('[v0] News API fetch error:', error);
    return {
      articles: getTopicSpecificMockArticles(topic),
      isFallback: true,
      fallbackReason: 'Network error while fetching news',
    };
  }
}

export function formatArticlesForPrompt(articles: NewsArticle[]): string {
  return articles
    .map(
      (article, idx) =>
        `Article ${idx + 1}: "${article.title}"\nSummary: ${article.description || article.content}`
    )
    .join('\n\n');
}
