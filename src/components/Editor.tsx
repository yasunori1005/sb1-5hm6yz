import React, { useState } from 'react';
import { summarizeText } from '../lib/api';

interface EditorProps {
  markdown: string;
  onChange: (value: string) => void;
  onSummarize: (summary: string) => void;
}

function Editor({ markdown, onChange, onSummarize }: EditorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    if (!markdown.trim()) return;
    
    setIsGenerating(true);
    try {
      const summary = await summarizeText(markdown);
      onSummarize(summary);
    } catch (error) {
      console.error('Failed to generate summary:', error);
      alert('Failed to generate summary. Please check your OpenAI API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={markdown}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[500px] p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Write your markdown here..."
      />
      <button
        onClick={handleGenerateSummary}
        disabled={isGenerating || !markdown.trim()}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating Summary...' : 'Generate Summary'}
      </button>
    </div>
  );
}

export default Editor;