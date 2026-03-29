export const mockArticles = {
  default: [
    {
      title: "Global Markets React to Policy Changes",
      description: "Financial markets show significant movement following recent policy announcements from major economies.",
      source: { name: "Financial News Daily" },
      publishedAt: new Date().toISOString(),
      url: "#",
      urlToImage: null,
      content: "Markets have responded positively to new economic policies aimed at stimulating growth..."
    },
    {
      title: "Tech Industry Records Strong Growth in Q1",
      description: "Technology sector demonstrates resilience with revenue growth outpacing overall market indices.",
      source: { name: "Tech Insider" },
      publishedAt: new Date().toISOString(),
      url: "#",
      urlToImage: null,
      content: "The technology industry has shown impressive growth rates in the first quarter..."
    },
    {
      title: "Corporate Earnings Beat Expectations",
      description: "Major corporations report better-than-expected financial results, signaling economic optimism.",
      source: { name: "Business Weekly" },
      publishedAt: new Date().toISOString(),
      url: "#",
      urlToImage: null,
      content: "Several large corporations have beaten analyst expectations in their latest earnings reports..."
    },
    {
      title: "Emerging Markets Show Recovery Potential",
      description: "Analysts identify emerging markets as key growth opportunities in the coming months.",
      source: { name: "Investment Review" },
      publishedAt: new Date().toISOString(),
      url: "#",
      urlToImage: null,
      content: "Emerging market economies are beginning to show signs of recovery and sustained growth..."
    },
    {
      title: "Innovation Drives Consumer Spending",
      description: "New product launches and technological advances contribute to increased consumer spending.",
      source: { name: "Consumer Trends" },
      publishedAt: new Date().toISOString(),
      url: "#",
      urlToImage: null,
      content: "Consumer spending patterns are shifting toward innovative and tech-enabled products..."
    }
  ]
};

export const getTopicSpecificMockArticles = (topic: string) => {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('budget') || topicLower.includes('fiscal') || topicLower.includes('2026')) {
    return [
      {
        title: "2026 Budget Proposals Focus on Infrastructure Investment",
        description: "Government announces significant budget allocation for modernizing critical infrastructure.",
        source: { name: "Government News" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "The proposed 2026 budget emphasizes infrastructure development with billions allocated..."
      },
      {
        title: "Economic Growth Forecasts Updated for 2026",
        description: "Economists revise growth projections based on latest economic indicators.",
        source: { name: "Economic Analysis" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Updated forecasts suggest moderate to strong growth potential throughout 2026..."
      },
      {
        title: "Tax Reform Considerations in Upcoming Budget",
        description: "Policy makers debate tax structure changes as part of broader budget discussions.",
        source: { name: "Policy Watch" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Tax reform remains a central topic in budget discussions for the upcoming year..."
      },
      {
        title: "Inflation Management Strategies Outlined",
        description: "Central banks present comprehensive plans to maintain price stability.",
        source: { name: "Monetary Policy Report" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Central banking authorities have outlined coordinated strategies to manage inflation..."
      },
      {
        title: "Employment Outlook Improves for 2026",
        description: "Job creation expectations rise with business confidence indices showing strength.",
        source: { name: "Labor Markets Weekly" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Employment prospects for 2026 are looking increasingly positive across sectors..."
      }
    ];
  }
  
  if (topicLower.includes('tech') || topicLower.includes('ai') || topicLower.includes('artificial')) {
    return [
      {
        title: "Artificial Intelligence Reshapes Industry Landscape",
        description: "AI adoption accelerates across sectors, creating new opportunities and challenges.",
        source: { name: "Tech Trends" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Artificial intelligence continues to revolutionize business operations globally..."
      },
      {
        title: "Machine Learning Models Show Breakthrough Performance",
        description: "Latest generation of ML algorithms demonstrate significant improvements.",
        source: { name: "AI Research" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "New machine learning breakthroughs promise to accelerate technological progress..."
      },
      {
        title: "Automation Transforms Workplace Dynamics",
        description: "Increased automation raises questions about future workforce composition.",
        source: { name: "Future of Work" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Workplace automation is fundamentally changing how organizations operate..."
      },
      {
        title: "Tech Giants Invest Heavily in AI Infrastructure",
        description: "Major technology companies announce unprecedented spending on AI development.",
        source: { name: "Tech Investments" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "Technology leaders are committing massive resources to advance AI capabilities..."
      },
      {
        title: "Regulatory Framework for AI Under Development",
        description: "Governments worldwide work on standards and regulations for AI systems.",
        source: { name: "Policy & Tech" },
        publishedAt: new Date().toISOString(),
        url: "#",
        urlToImage: null,
        content: "International regulatory efforts aim to establish clear AI governance frameworks..."
      }
    ];
  }

  return mockArticles.default;
};
