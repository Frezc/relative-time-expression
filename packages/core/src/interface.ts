export type TokenType = 'unit' | 'ws' | 'int' | 'op' | 'keyword';
export type Unit = 's' | 'm' | 'h' | 'd' | 'w' | 'M' | 'y';
export interface Token {
  type: TokenType;
  raw: string;
  start: number;
  end: number;
}

export interface Node {
  type: string;
}

interface Location {
  start: number;
  end: number;
}

export interface InputExpression extends Node {
  type: 'Expression';
  body: Array<InputOffset | InputOffset>;
}

export interface Expression extends Node, Location {
  type: 'Expression';
  body: Array<Offset | Period>;
}

export interface InputOffset extends Node {
  type: 'Offset';
  op: '+' | '-';
  number: number;
  unit: Unit;
}

export type Offset = InputOffset & Location;

export interface InputPeriod extends Node {
  type: 'Period';
  op: '/' | '\\';
  unit: Unit;
}

export type Period = InputPeriod & Location;
