import OpenAI from 'openai';

export async function summarizeText(text: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that summarizes blog posts in 100 characters or less, optimized for social media sharing."
      },
      {
        role: "user",
        content: `Summarize this blog post in 100 characters or less: ${text}`
      }
    ],
    max_tokens: 50,
  });

  return response.choices[0].message.content || '';
}

export async function shareToX(text: string, summary: string): Promise<void> {
  const apiKey = import.meta.env.VITE_TWITTER_API_KEY;
  
  // In a real implementation, you would use the X API here
  // This is just a placeholder to demonstrate the concept
  console.log('Sharing to X:', { text, summary, apiKey });
}