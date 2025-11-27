# 🎙️ Call Transcription & Analysis

An AI-powered system for transcribing call recordings, identifying speakers, and automatically extracting actionable insights using OpenAI's Whisper and GPT-4.

## ✨ Features

- **Audio Transcription**: Convert call recordings to text using OpenAI Whisper
- **Speaker Identification**: Automatically identify and label speakers (Agent/Caller)
- **Smart Analysis**: Extract action items, key decisions, follow-ups, and critical information
- **Email Reports**: Automatically send formatted analysis reports to your email
- **Modern UI**: Beautiful, responsive interface with dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key
- Email service API key (Resend or SendGrid)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file with your API keys:

```bash
# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Email Configuration
EMAIL_PROVIDER=resend
RECIPIENT_EMAIL=yourname@example.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=onboarding@resend.dev
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - Reusable React components
- `/src/services` - Service layer for business logic
- `/src/types` - TypeScript type definitions
- `/public/calls` - Audio file storage
- `/data/prompts` - AI prompt templates

## 🎨 Branding

The app features a modern blue gradient icon combining:
- Microphone symbol (representing audio/calls)
- Checklist document (representing analysis/todos)

Colors: Blue (#3B82F6) to Dark Blue (#1E40AF) gradient

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI Whisper & GPT-4
- **Email**: Resend/SendGrid

## 📝 License

MIT
