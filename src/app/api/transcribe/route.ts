import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  console.log('[route.ts]: Starting transcription request');
  
  try {
    const { fileName } = await request.json();
    
    if (!fileName) {
      console.log('[route.ts]: No file name provided');
      return NextResponse.json({ error: 'File name is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('[route.ts]: OpenAI API key not found');
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });

    // Construct the file path
    const filePath = path.join(process.cwd(), 'public', 'calls', fileName);
    console.log(`[route.ts]: Reading file from ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log('[route.ts]: File not found');
      return NextResponse.json({ error: 'Audio file not found' }, { status: 404 });
    }

    // Read the audio file
    const audioFile = fs.createReadStream(filePath);

    console.log('[route.ts]: Sending to OpenAI for transcription');
    
    // Transcribe the audio using OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });

    console.log('[route.ts]: Transcription completed successfully');

    return NextResponse.json({
      success: true,
      transcript: transcription.text,
    });

  } catch (error: any) {
    console.error('[route.ts]: Transcription error:', error);
    return NextResponse.json(
      { error: error.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}

