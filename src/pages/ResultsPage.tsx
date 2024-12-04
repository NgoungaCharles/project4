import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';
import { QueryResult } from '../components/QueryResult';
import type { QueryResult as QueryResultType } from '../types';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as QueryResultType;

  if (!result) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Query
          </button>
        </div>
        <QueryResult result={result} />
      </div>
    </div>
  );
}