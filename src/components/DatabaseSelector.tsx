import React from 'react';
import { Database } from 'lucide-react';
import type { DatabaseType } from '../types';

interface DatabaseSelectorProps {
  selected: DatabaseType;
  onSelect: (type: DatabaseType) => void;
}

export function DatabaseSelector({ selected, onSelect }: DatabaseSelectorProps) {
  const databases: Array<{ type: DatabaseType; label: string }> = [
    { type: 'postgresql', label: 'PostgreSQL' },
    { type: 'mysql', label: 'MySQL' },
    { type: 'sqlite', label: 'SQLite' },
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <Database className="text-gray-600" size={24} />
      <div className="flex gap-2">
        {databases.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selected === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}