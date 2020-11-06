export interface Filterable{
  setDisplayableColumns(cols: string[]): void;
  setSearchableColumns(cols: string[]): void;
  setSearchTerm(term: string): void;
}
