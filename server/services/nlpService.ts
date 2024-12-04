import { query } from '../db';
import { TokenType, Token, QueryType } from '../types/nlp';

interface TableInfo {
  tableName: string;
  columns: string[];
}

export class NLPService {
  private keywords = {
    select: ['show', 'get', 'find', 'display', 'list'],
    where: ['where', 'with', 'that', 'having'],
    orderBy: ['order by', 'sorted by', 'arranged by'],
    groupBy: ['group by', 'grouped by'],
    limit: ['limit', 'only', 'top', 'first'],
    join: ['combined with', 'joined with', 'along with'],
    aggregate: ['count', 'sum', 'average', 'minimum', 'maximum']
  };

  private async getTableInfo(): Promise<TableInfo[]> {
    const sql = `
      SELECT 
        table_name,
        array_agg(column_name) as columns
      FROM information_schema.columns
      WHERE table_schema = 'public'
      GROUP BY table_name;
    `;
    
    const result = await query(sql);
    return result.rows;
  }

  private tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    const words = input.toLowerCase().split(/\s+/);
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Check for keywords
      if (this.keywords.select.includes(word)) {
        tokens.push({ type: TokenType.SELECT, value: word });
      } else if (this.keywords.where.includes(word)) {
        tokens.push({ type: TokenType.WHERE, value: word });
      } else if (this.keywords.orderBy.includes(word)) {
        tokens.push({ type: TokenType.ORDER_BY, value: word });
      } else if (this.keywords.aggregate.includes(word)) {
        tokens.push({ type: TokenType.AGGREGATE, value: word });
      } else {
        tokens.push({ type: TokenType.WORD, value: word });
      }
    }
    
    return tokens;
  }

  private async identifyQueryType(tokens: Token[]): Promise<QueryType> {
    const hasSelect = tokens.some(t => t.type === TokenType.SELECT);
    const hasAggregate = tokens.some(t => t.type === TokenType.AGGREGATE);
    const hasWhere = tokens.some(t => t.type === TokenType.WHERE);
    
    if (hasAggregate) return QueryType.AGGREGATE;
    if (hasWhere) return QueryType.FILTERED;
    if (hasSelect) return QueryType.BASIC;
    return QueryType.UNKNOWN;
  }

  private async buildSQL(tokens: Token[], tables: TableInfo[]): Promise<string> {
    const queryType = await this.identifyQueryType(tokens);
    let sql = '';
    
    switch (queryType) {
      case QueryType.BASIC:
        sql = this.buildBasicQuery(tokens, tables);
        break;
      case QueryType.FILTERED:
        sql = this.buildFilteredQuery(tokens, tables);
        break;
      case QueryType.AGGREGATE:
        sql = this.buildAggregateQuery(tokens, tables);
        break;
      default:
        throw new Error('Unable to determine query type');
    }
    
    return sql;
  }

  private buildBasicQuery(tokens: Token[], tables: TableInfo[]): string {
    // Implementation for basic SELECT queries
    const table = this.findRelevantTable(tokens, tables);
    return `SELECT * FROM ${table.tableName} LIMIT 100;`;
  }

  private buildFilteredQuery(tokens: Token[], tables: TableInfo[]): string {
    // Implementation for WHERE clause queries
    const table = this.findRelevantTable(tokens, tables);
    const whereIndex = tokens.findIndex(t => t.type === TokenType.WHERE);
    const condition = tokens.slice(whereIndex + 1).map(t => t.value).join(' ');
    
    return `SELECT * FROM ${table.tableName} WHERE ${condition} LIMIT 100;`;
  }

  private buildAggregateQuery(tokens: Token[], tables: TableInfo[]): string {
    // Implementation for aggregate queries
    const table = this.findRelevantTable(tokens, tables);
    const aggToken = tokens.find(t => t.type === TokenType.AGGREGATE);
    const column = this.findRelevantColumn(tokens, table);
    
    return `SELECT ${aggToken?.value}(${column}) FROM ${table.tableName};`;
  }

  private findRelevantTable(tokens: Token[], tables: TableInfo[]): TableInfo {
    for (const table of tables) {
      if (tokens.some(t => t.value.includes(table.tableName))) {
        return table;
      }
    }
    return tables[0]; // Fallback to first table
  }

  private findRelevantColumn(tokens: Token[], table: TableInfo): string {
    for (const column of table.columns) {
      if (tokens.some(t => t.value.includes(column))) {
        return column;
      }
    }
    return '*'; // Fallback to all columns
  }

  async generateSuggestions(input: string): Promise<string[]> {
    const tables = await this.getTableInfo();
    const tokens = this.tokenize(input);
    const suggestions: string[] = [];

    // Generate context-aware suggestions
    if (tokens.length === 0) {
      suggestions.push(
        'Show all records from a table',
        'Find records where condition is met',
        'Calculate the total of a column'
      );
    } else if (tokens.some(t => t.type === TokenType.SELECT)) {
      tables.forEach(table => {
        suggestions.push(`Show all ${table.tableName}`);
      });
    }

    return suggestions.slice(0, 5); // Return top 5 suggestions
  }

  async processQuery(input: string): Promise<{ sql: string; error?: string }> {
    try {
      const tables = await this.getTableInfo();
      const tokens = this.tokenize(input);
      const sql = await this.buildSQL(tokens, tables);
      
      return { sql };
    } catch (error) {
      return { 
        sql: '', 
        error: error instanceof Error ? error.message : 'Failed to process query' 
      };
    }
  }
}