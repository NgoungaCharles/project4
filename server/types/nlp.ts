export enum TokenType {
  SELECT = 'SELECT',
  WHERE = 'WHERE',
  ORDER_BY = 'ORDER_BY',
  GROUP_BY = 'GROUP_BY',
  AGGREGATE = 'AGGREGATE',
  WORD = 'WORD'
}

export interface Token {
  type: TokenType;
  value: string;
}

export enum QueryType {
  BASIC = 'BASIC',
  FILTERED = 'FILTERED',
  AGGREGATE = 'AGGREGATE',
  UNKNOWN = 'UNKNOWN'
}