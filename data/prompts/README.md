# AI Prompts Documentation

This folder contains all the prompts used in the call transcription and analysis system.

## File Structure

### Speaker Identification Prompts

- **`speaker-identification-system.txt`** - System prompt for identifying Agent vs Caller
- **`speaker-identification-user.txt`** - User prompt template for speaker identification
  - Variables: `{transcript}` - The raw transcript from Whisper

### Todo List Analysis Prompts

- **`todo-analysis-system.txt`** - System prompt for extracting action items and todos
- **`todo-analysis-user.txt`** - User prompt template for todo generation
  - Variables: `{labeledTranscript}` - The transcript with speaker labels

## How to Use

The prompts are automatically loaded by the API routes using the `loadPrompt()` function from `src/lib/prompts.ts`.

### Example:

```typescript
import { loadPrompt, fillPromptTemplate } from '@/lib/prompts';

// Load a prompt
const systemPrompt = loadPrompt('speaker-identification-system.txt');

// Fill in variables
const userPrompt = fillPromptTemplate(
  loadPrompt('speaker-identification-user.txt'),
  { transcript: 'Hello, how can I help you?' }
);
```

## Prompt Engineering Tips

1. **Speaker Identification**: Uses lower temperature (0.3) for more consistent speaker labeling
2. **Todo Analysis**: Uses higher temperature (0.7) for more creative action item generation
3. **Format**: Keep clear formatting instructions for consistent output
4. **Variables**: Use `{variableName}` syntax for template variables

## Modifying Prompts

To modify prompts:
1. Edit the `.txt` files directly
2. The changes will be applied on the next API call (hot reload in dev mode)
3. No code changes required!

