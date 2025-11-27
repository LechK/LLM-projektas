interface TranscriptDisplayProps {
  transcript: string;
}

export default function TranscriptDisplay({ transcript }: TranscriptDisplayProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-6 h-6 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Transcript (with Speakers)
        </h2>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
        {transcript ? (
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
            {transcript.split("\n").map((line, index) => {
              // Highlight speaker labels
              if (line.includes("[AGENT]")) {
                return (
                  <p key={index} className="whitespace-pre-wrap">
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      [AGENT]
                    </span>
                    {line.replace("[AGENT]", "")}
                  </p>
                );
              } else if (line.includes("[CALLER]")) {
                return (
                  <p key={index} className="whitespace-pre-wrap">
                    <span className="font-bold text-green-600 dark:text-green-400">
                      [CALLER]
                    </span>
                    {line.replace("[CALLER]", "")}
                  </p>
                );
              }
              return (
                <p key={index} className="whitespace-pre-wrap">
                  {line}
                </p>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">
            No transcript yet. Click the button above to import and
            transcribe a call.
          </p>
        )}
      </div>
    </div>
  );
}

