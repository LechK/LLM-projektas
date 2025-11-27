import { TodoList } from "@/types/todo";

export interface AnalysisResult {
  labeledTranscript: string;
  todoList: TodoList;
}

export async function analyzeTranscript(transcript: string): Promise<AnalysisResult> {
  console.log("[analysis.ts]: Calling analyze API");
  
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Analysis failed");
  }

  const data = await response.json();
  console.log("[analysis.ts]: Analysis completed");
  
  return {
    labeledTranscript: data.labeledTranscript,
    todoList: data.todoList,
  };
}

