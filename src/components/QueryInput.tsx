import React from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { useSuggestions } from '../hooks/useSuggestions';

interface QueryInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

export function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [input, setInput] = React.useState('');
  const { suggestions, loading: suggestionsLoading } = useSuggestions(input);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <textarea
          className="w-full h-32 p-4 border rounded-lg bg-white shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="What would you like to know about your data? (e.g., 'Show me sales from last month')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {suggestions.length > 0 && (
          <div className="absolute left-0 right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => setInput(suggestion)}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <MessageSquarePlus size={20} />
          {isLoading ? 'Processing...' : 'Generate Query'}
        </button>
      </div>
    </form>
  );
}