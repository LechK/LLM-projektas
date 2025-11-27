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
  const [emailStatus, setEmailStatus] = useState<string>("");

  const handleImportAndAnalyze = async () => {
    console.log("[page.tsx]: Starting import and analyze process");
    setLoading(true);
    setError("");
    setTranscript("");
    setTodoList(null);
    setEmailStatus("");
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
      const finalTranscript = labeledTranscript || transcriptText;
      setTranscript(finalTranscript);
      setTodoList(analysis);

      // Step 3: Automatically send email with results
      setStep("Sending results to email...");
      console.log("[page.tsx]: Automatically sending email");

      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcript: finalTranscript,
            todoList: analysis,
          }),
        });

        const emailData = await emailResponse.json();

        if (!emailResponse.ok) {
          throw new Error(emailData.error || "Failed to send email");
        }

        console.log("[page.tsx]: Email sent successfully");
        setEmailStatus(`✓ ${emailData.message || "Email sent successfully!"}`);
      } catch (emailErr: unknown) {
        console.error("[page.tsx]: Error sending email:", emailErr);
        const emailErrorMessage =
          emailErr instanceof Error ? emailErr.message : "Failed to send email";
        setEmailStatus(`⚠ Email failed: ${emailErrorMessage}`);
      }

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

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          <LoadingButton loading={loading} onClick={handleImportAndAnalyze} />
        </div>

        {/* Status Message */}
        <StatusMessage step={step} error={error} />

        {/* Email Status */}
        {emailStatus && (
          <div className="mb-6 text-center">
            <p
              className={`text-sm font-medium ${
                emailStatus.startsWith("✓")
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {emailStatus}
            </p>
          </div>
        )}

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
