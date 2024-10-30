import React, { useState } from 'react';
import { PenLine, Eye, Twitter, Settings } from 'lucide-react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import SettingsModal from './components/SettingsModal';
import { shareToX } from './lib/api';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [summary, setSummary] = useState('');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [showSettings, setShowSettings] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!import.meta.env.VITE_OPENAI_API_KEY || !import.meta.env.VITE_TWITTER_API_KEY) {
      alert('Please configure your API keys in settings');
      return;
    }

    setIsPosting(true);
    try {
      await shareToX(markdown, summary);
      alert('Successfully shared to X!');
    } catch (error) {
      console.error('Failed to post:', error);
      alert('Failed to share to X. Please check your API key and try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <PenLine className="h-6 w-6 text-indigo-600" />
              <span className="font-semibold text-xl text-gray-900">MarkBlog</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setView('edit')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  view === 'edit'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <PenLine className="h-4 w-4" />
                  <span>Edit</span>
                </div>
              </button>
              <button
                onClick={() => setView('preview')}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  view === 'preview'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {view === 'edit' ? (
              <Editor 
                markdown={markdown} 
                onChange={setMarkdown} 
                onSummarize={setSummary}
              />
            ) : (
              <Preview markdown={markdown} />
            )}
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Summary for X (max 100 chars)
                </label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  maxLength={100}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your post summary..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {summary.length}/100 characters
                </p>
              </div>
              <button
                onClick={handlePost}
                disabled={isPosting || !summary.trim() || !markdown.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Twitter className="h-4 w-4 mr-2" />
                {isPosting ? 'Sharing...' : 'Share on X'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <SettingsModal 
        open={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}

export default App;