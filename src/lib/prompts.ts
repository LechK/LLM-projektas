import fs from 'fs';
import path from 'path';

export function loadPrompt(fileName: string): string {
  const promptPath = path.join(process.cwd(), 'data', 'prompts', fileName);
  return fs.readFileSync(promptPath, 'utf-8');
}

export function fillPromptTemplate(template: string, variables: Record<string, string>): string {
  let filled = template;
  for (const [key, value] of Object.entries(variables)) {
    filled = filled.replace(`{${key}}`, value);
  }
  return filled;
}

