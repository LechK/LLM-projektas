import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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

    // First, identify speakers and reformat the transcript
    const speakerAnalysis = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert at analyzing call transcripts and identifying speakers. Your task is to:
1. Identify who is the AGENT (customer service representative, support staff, salesperson) and who is the CALLER (customer, client)
2. Segment the transcript and label each part with the appropriate speaker
3. Format the output clearly with speaker labels

Format your response like this:
[AGENT]: (agent's dialogue)
[CALLER]: (caller's dialogue)

Be intelligent about identifying speakers based on:
- Greetings and introductions
- Who asks for help vs who provides help
- Professional language vs customer language
- Context clues in the conversation`
        },
        {
          role: 'user',
          content: `Please analyze this call transcript and identify the speakers, then reformat it with speaker labels:\n\n${transcript}`
        }
      ],
      temperature: 0.3,
    });

    const labeledTranscript = speakerAnalysis.choices[0].message.content;
    console.log('[route.ts]: Speaker identification completed');

    // Now analyze the labeled transcript and create a todo list
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an expert call analyst. Your task is to analyze call transcripts and extract the most important action items and key points into a structured todo list.

For each call, identify:
1. Action items - specific tasks that need to be completed
2. Follow-ups - people to contact or items to follow up on
3. Key decisions - important decisions made during the call
4. Important dates/deadlines mentioned
5. Critical information that shouldn't be forgotten

Format your response as a clear, prioritized todo list with each item on a new line, starting with "- " (dash and space).`
        },
        {
          role: 'user',
          content: `Please analyze this call transcript and create a comprehensive todo list with all important action items:\n\n${labeledTranscript}`
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

