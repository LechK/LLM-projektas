import { TodoList } from "@/types/todo";

export interface EmailData {
  transcript: string;
  todoList: TodoList;
}

export function formatTodoListForEmail(todoList: TodoList): string {
  let html = '<div style="font-family: Arial, sans-serif;">';

  if (todoList.actionItems && todoList.actionItems.length > 0) {
    html += '<h2 style="color: #2563eb;">⚡ Action Items</h2><ul>';
    todoList.actionItems.forEach(item => {
      html += `<li style="margin-bottom: 8px;">${item}</li>`;
    });
    html += '</ul>';
  }

  if (todoList.followUps && todoList.followUps.length > 0) {
    html += '<h2 style="color: #9333ea;">👥 Follow-ups</h2><ul>';
    todoList.followUps.forEach(item => {
      html += `<li style="margin-bottom: 8px;">${item}</li>`;
    });
    html += '</ul>';
  }

  if (todoList.keyDecisions && todoList.keyDecisions.length > 0) {
    html += '<h2 style="color: #16a34a;">✓ Key Decisions</h2><ul>';
    todoList.keyDecisions.forEach(item => {
      html += `<li style="margin-bottom: 8px;">${item}</li>`;
    });
    html += '</ul>';
  }

  if (todoList.importantDates && todoList.importantDates.length > 0) {
    html += '<h2 style="color: #ea580c;">📅 Important Dates/Deadlines</h2><ul>';
    todoList.importantDates.forEach(item => {
      html += `<li style="margin-bottom: 8px;">${item}</li>`;
    });
    html += '</ul>';
  }

  if (todoList.criticalInfo && todoList.criticalInfo.length > 0) {
    html += '<h2 style="color: #dc2626;">⚠️ Critical Information</h2><ul>';
    todoList.criticalInfo.forEach(item => {
      html += `<li style="margin-bottom: 8px;">${item}</li>`;
    });
    html += '</ul>';
  }

  if (todoList.raw) {
    html += `<div style="white-space: pre-wrap;">${todoList.raw}</div>`;
  }

  html += '</div>';
  return html;
}

export function formatTranscriptForEmail(transcript: string): string {
  const lines = transcript.split('\n');
  let html = '<div style="font-family: monospace; white-space: pre-wrap; background-color: #f8fafc; padding: 16px; border-radius: 8px;">';
  
  lines.forEach(line => {
    if (line.includes('[AGENT]')) {
      html += `<p style="margin: 8px 0;"><strong style="color: #2563eb;">[AGENT]</strong>${line.replace('[AGENT]', '')}</p>`;
    } else if (line.includes('[CALLER]')) {
      html += `<p style="margin: 8px 0;"><strong style="color: #16a34a;">[CALLER]</strong>${line.replace('[CALLER]', '')}</p>`;
    } else {
      html += `<p style="margin: 8px 0;">${line}</p>`;
    }
  });
  
  html += '</div>';
  return html;
}

