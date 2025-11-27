"use client";

import { useState } from "react";
import { TodoList } from "@/types/todo";
import { transcribeAudio } from "@/services/transcription";
import { analyzeTranscript } from "@/services/analysis";
import LoadingButton from "@/components/LoadingButton";
import StatusMessage from "@/components/StatusMessage";
import TranscriptDisplay from "@/components/TranscriptDisplay";
import TodoListDisplay from "@/components/TodoListDisplay";

export default function Home() {
  const [transcript, setTranscript] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<string>("");

  const handleImportAndAnalyze = async () => {
    console.log("[page.tsx]: Starting import and analyze process");
    setLoading(true);
    setError("");
    setTranscript("");
    setTodoList(null);
    setStep("Transcribing audio...");

    try {
      // Step 1: Transcribe the audio
      const transcriptText = await transcribeAudio("call.mp3");
      setTranscript(transcriptText);

      // Step 2: Identify speakers and analyze the transcript
      setStep("Identifying speakers and analyzing call...");
      const { labeledTranscript, todoList: analysis } = await analyzeTranscript(
        transcriptText
      );

      // Update transcript with labeled version (with speaker identification)
      if (labeledTranscript) {
        setTranscript(labeledTranscript);
      }

      setTodoList(analysis);
      setStep("");
    } catch (err: unknown) {
      console.error("[page.tsx]: Error during process:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setStep("");
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
          <LoadingButton loading={loading} onClick={handleImportAndAnalyze} />
        </div>

        {/* Status Message */}
        <StatusMessage step={step} error={error} />

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TranscriptDisplay transcript={transcript} />
          <TodoListDisplay todoList={todoList} />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Powered by OpenAI Whisper & GPT-4</p>
        </div>
      </main>
    </div>
  );
}
