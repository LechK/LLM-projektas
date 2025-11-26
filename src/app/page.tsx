'use client';

import { useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState<string>('');
  const [todoList, setTodoList] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<string>('');

  const handleImportAndAnalyze = async () => {
    console.log('[page.tsx]: Starting import and analyze process');
    setLoading(true);
    setError('');
    setTranscript('');
    setTodoList('');
    setStep('Transcribing audio...');

    try {
      // Step 1: Transcribe the audio
      console.log('[page.tsx]: Calling transcribe API');
      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: 'call.mp3' }),
      });

      if (!transcribeResponse.ok) {
        const errorData = await transcribeResponse.json();
        throw new Error(errorData.error || 'Transcription failed');
      }

      const transcribeData = await transcribeResponse.json();
      console.log('[page.tsx]: Transcription received');
      setTranscript(transcribeData.transcript);

      // Step 2: Identify speakers and analyze the transcript
      setStep('Identifying speakers and analyzing call...');
      console.log('[page.tsx]: Calling analyze API');
      
      const analyzeResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcribeData.transcript }),
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const analyzeData = await analyzeResponse.json();
      console.log('[page.tsx]: Analysis completed');
      
      // Update transcript with labeled version (with speaker identification)
      if (analyzeData.labeledTranscript) {
        setTranscript(analyzeData.labeledTranscript);
      }
      
      setTodoList(analyzeData.todoList);
      setStep('');

    } catch (err: any) {
      console.error('[page.tsx]: Error during process:', err);
      setError(err.message || 'An error occurred');
      setStep('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <main className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Call Transcription & Analysis
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Import, transcribe, and analyze your call recordings with AI
          </p>
        </div>

        {/* Import Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleImportAndAnalyze}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Import & Analyze Call</span>
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {step && (
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{step}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transcript Box */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Transcript (with Speakers)
              </h2>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
              {transcript ? (
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
                  {transcript.split('\n').map((line, index) => {
                    // Highlight speaker labels
                    if (line.includes('[AGENT]')) {
                      return (
                        <p key={index} className="whitespace-pre-wrap">
                          <span className="font-bold text-blue-600 dark:text-blue-400">[AGENT]</span>
                          {line.replace('[AGENT]', '')}
                        </p>
                      );
                    } else if (line.includes('[CALLER]')) {
                      return (
                        <p key={index} className="whitespace-pre-wrap">
                          <span className="font-bold text-green-600 dark:text-green-400">[CALLER]</span>
                          {line.replace('[CALLER]', '')}
                        </p>
                      );
                    }
                    return <p key={index} className="whitespace-pre-wrap">{line}</p>;
                  })}
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 italic">
                  No transcript yet. Click the button above to import and transcribe a call.
                </p>
              )}
            </div>
          </div>

          {/* Todo List Box */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Todo List
              </h2>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
              {todoList ? (
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="text-slate-700 dark:text-slate-300 space-y-2">
                    {todoList.split('\n').map((line, index) => (
                      <div key={index} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 italic">
                  No analysis yet. The AI will generate a todo list from the call transcript.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Powered by OpenAI Whisper & GPT-4</p>
        </div>
      </main>
    </div>
  );
}
