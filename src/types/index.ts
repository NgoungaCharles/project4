export interface QueryResult {
  sql: string;
  error?: string;
  results?: any[];
}

export interface DatabaseSchema {
  tables: {
    [key: string]: {
      name: string;
      columns: Array<{
        name: string;
        type: string;
        constraints?: string[];
      }>;
    };
  };
}

export type DatabaseType = 'mysql' | 'postgresql' | 'sqlite';