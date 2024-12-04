import React from 'react';
import { Database, Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Database className="text-blue-600" size={32} />
        <Sparkles className="text-yellow-400 absolute -top-1 -right-1" size={16} />
      </div>
      <span className="text-2xl font-bold text-gray-900">QNLP</span>
    </div>
  );
}