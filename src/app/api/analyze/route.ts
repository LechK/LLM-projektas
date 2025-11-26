import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { loadPrompt, fillPromptTemplate } from '@/lib/prompts';

export async function POST(request: NextRequest) {
  console.log('[route.ts]: Starting call analysis request');
  
  try {
    const { transcript } = await request.json();
    
    if (!transcript) {
      console.log('[route.ts]: No transcript provided');
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('[route.ts]: OpenAI API key not found');
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    console.log('[route.ts]: Sending transcript to OpenAI for analysis');

    // Load prompts from files
    const speakerSystemPrompt = loadPrompt('speaker-identification-system.txt');
    const speakerUserPrompt = loadPrompt('speaker-identification-user.txt');
    
    // First, identify speakers and reformat the transcript
    const speakerAnalysis = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: speakerSystemPrompt
        },
        {
          role: 'user',
          content: fillPromptTemplate(speakerUserPrompt, { transcript })
        }
      ],
      temperature: 0.3,
    });

    const labeledTranscript = speakerAnalysis.choices[0].message.content;
    console.log('[route.ts]: Speaker identification completed');

    // Load todo analysis prompts
    const todoSystemPrompt = loadPrompt('todo-analysis-system.txt');
    const todoUserPrompt = loadPrompt('todo-analysis-user.txt');

    // Now analyze the labeled transcript and create a todo list
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: todoSystemPrompt
        },
        {
          role: 'user',
          content: fillPromptTemplate(todoUserPrompt, { labeledTranscript })
        }
      ],
      temperature: 0.7,
    });

    const todoList = completion.choices[0].message.content;

    console.log('[route.ts]: Call analysis completed successfully');

    return NextResponse.json({
      success: true,
      todoList,
      labeledTranscript,
    });

  } catch (error: any) {
    console.error('[route.ts]: Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}

