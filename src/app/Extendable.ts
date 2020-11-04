import {OnInit} from '@angular/core';
import {Filterable} from './Filterable';
import {EntityService} from './services/entity/entity.service';

export class Extendable implements OnInit, Filterable{
  displayedColumns: string[];
  searchAbleColumns: string[];
  searchTerm: string;

  constructor(private entityService: EntityService){
  console.log('bruh');
  }

  ngOnInit(): void{
    console.log('Hi');
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
