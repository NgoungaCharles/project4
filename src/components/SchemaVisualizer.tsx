import React from 'react';
import { Table } from 'lucide-react';
import type { DatabaseSchema } from '../types';

interface SchemaVisualizerProps {
  schema: DatabaseSchema;
}

export function SchemaVisualizer({ schema }: SchemaVisualizerProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Table size={20} />
        Database Schema
      </h2>
      <div className="space-y-6">
        {Object.values(schema.tables).map((table) => (
          <div key={table.name} className="border rounded-lg p-4">
            <h3 className="font-medium text-blue-600 mb-2">{table.name}</h3>
            <div className="space-y-1">
              {table.columns.map((column) => (
                <div
                  key={column.name}
                  className="flex items-center text-sm text-gray-600"
                >
                  <span className="w-1/3">{column.name}</span>
                  <span className="w-1/3 text-gray-500">{column.type}</span>
                  <span className="w-1/3 text-gray-400 text-xs">
                    {column.constraints?.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}