export class Extendable{
  displayedColumns: string[];
  searchAbleColumns: string[];
  searchTerm: string;

  constructor(input: string){

  }

  setSearchTerm(term: string): void{
    this.searchTerm = term;
    this.reloadData();
  }

  setDisplayableColumns(cols: string[]): void{
    this.displayedColumns = cols;
  }

  setSearchableColumns(cols: string[]): void{
    this.searchAbleColumns = cols;
    this.reloadData();
  }


  private reloadData(): void{

  }
}
