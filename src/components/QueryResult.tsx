import React from 'react';
import { Check, X, Copy } from 'lucide-react';
import type { QueryResult } from '../types';

interface QueryResultProps {
  result: QueryResult;
}

export function QueryResult({ result }: QueryResultProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6">
      <div className="bg-gray-900 rounded-lg p-4 relative">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
        </button>
        <pre className="text-green-400 overflow-x-auto">
          <code>{result.sql}</code>
        </pre>
      </div>
      
      {result.error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <X className="text-red-500 mt-1" size={20} />
          <p className="text-red-700">{result.error}</p>
        </div>
      )}

      {result.results && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-50">
              {/* Dynamic headers based on results */}
            </thead>
            <tbody>
              {/* Dynamic rows based on results */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}