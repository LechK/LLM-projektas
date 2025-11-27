export async function transcribeAudio(fileName: string): Promise<string> {
  console.log("[transcription.ts]: Calling transcribe API");
  
  const response = await fetch("/api/transcribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Transcription failed");
  }

  const data = await response.json();
  console.log("[transcription.ts]: Transcription received");
  
  return data.transcript;
}

