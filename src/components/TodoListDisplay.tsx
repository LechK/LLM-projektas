import { TodoList } from "@/types/todo";

interface TodoListDisplayProps {
  todoList: TodoList | null;
}

export default function TodoListDisplay({ todoList }: TodoListDisplayProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-6 h-6 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Todo List
        </h2>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 min-h-[300px] max-h-[500px] overflow-y-auto">
        {todoList ? (
          <div className="space-y-6">
            {/* Action Items */}
            {todoList.actionItems && todoList.actionItems.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">
                    ⚡
                  </span>
                  Action Items
                </h3>
                <div className="space-y-2">
                  {todoList.actionItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pl-4"
                    >
                      <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0"></div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-ups */}
            {todoList.followUps && todoList.followUps.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400">
                    👥
                  </span>
                  Follow-ups
                </h3>
                <div className="space-y-2">
                  {todoList.followUps.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pl-4"
                    >
                      <div className="mt-2 w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 flex-shrink-0"></div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Decisions */}
            {todoList.keyDecisions &&
              todoList.keyDecisions.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    Key Decisions
                  </h3>
                  <div className="space-y-2">
                    {todoList.keyDecisions.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pl-4"
                      >
                        <div className="mt-2 w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 flex-shrink-0"></div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Important Dates */}
            {todoList.importantDates &&
              todoList.importantDates.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-orange-600 dark:text-orange-400">
                      📅
                    </span>
                    Important Dates/Deadlines
                  </h3>
                  <div className="space-y-2">
                    {todoList.importantDates.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pl-4"
                      >
                        <div className="mt-2 w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400 flex-shrink-0"></div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Critical Information */}
            {todoList.criticalInfo &&
              todoList.criticalInfo.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-red-600 dark:text-red-400">
                      ⚠️
                    </span>
                    Critical Information
                  </h3>
                  <div className="space-y-2">
                    {todoList.criticalInfo.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pl-4"
                      >
                        <div className="mt-2 w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 flex-shrink-0"></div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Fallback for raw text */}
            {todoList.raw && (
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {todoList.raw}
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 dark:text-slate-500 italic">
            No analysis yet. The AI will generate a todo list from the
            call transcript.
          </p>
        )}
      </div>
    </div>
  );
}

