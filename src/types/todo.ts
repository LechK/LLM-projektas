export interface TodoList {
  actionItems?: string[];
  followUps?: string[];
  keyDecisions?: string[];
  importantDates?: string[];
  criticalInfo?: string[];
  raw?: string; // fallback for non-JSON responses
}

