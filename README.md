# 🗞️ AI News Intelligence Dashboard

A professional, high-performance news aggregation and analysis platform powered by **Next.js**, **Groq (Llama 3)**, and **NewsAPI**. This dashboard utilizes a multi-agent AI system to synthesize live news into personalized briefings with deep market insights.

![Project Preview](https://github.com/Yaser-123/AI-News-Dashboard/blob/main/public/placeholder.jpg?raw=true)

## 🚀 Key Features

*   **Multi-Agent Reasoning**: Four specialized AI agents (News, Analysis, Personalization, Video) collaborate to generate your briefing.
*   **Deep Dive Analysis**: Professional slide-out panel for exploring macroeconomic trends and actionable insights.
*   **Personalization**: Tailors language and emphasis for either "Beginner" or "Investor" profiles.
*   **Audio Briefings**: Integrated text-to-speech for hands-free daily news consumption.
*   **Search History**: Persistently tracks your recent topics for quick access.
*   **Premium UI**: Sleek dark mode design with glassmorphism, smooth animations, and responsive layout.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
*   **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
*   **LLM Provider**: [Groq](https://groq.com/) (Llama-3.3-70b-versatile)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Tailwind CSS](https://tailwindcss.com/)

## ⚙️ Project Setup

### 1. Prerequisites
*   Node.js (LTS version)
*   `pnpm` or `npm`
*   Groq API Key (from [Groq Console](https://console.groq.com/))
*   NewsAPI Key (from [NewsAPI.org](https://newsapi.org/))

### 2. Clone and Install
```bash
git clone https://github.com/Yaser-123/AI-News-Dashboard.git
cd AI-News-Dashboard
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to start using the dashboard.

## 🤖 AI Agent Workflow

1.  **News Agent**: Aggregates and cleans raw data from global news sources.
2.  **Analysis Agent**: Identifies underlying market signals and macroeconomic trends.
3.  **Personalization Agent**: Adapts the briefing structure to match the user's expertise level.
4.  **Video Agent**: Generates a natural narration script for the highlights.

## 📄 License
MIT License - Case-study project created for professional demonstration.
