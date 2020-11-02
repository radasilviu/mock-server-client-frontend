import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Book} from '../../../models/book';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {BookService} from '../../../services/book/book.service';
import {MatDialog} from '@angular/material/dialog';
import {EditBookComponent} from '../../dialogs/edit-book/edit-book.component';
import {DeleteBookComponent} from '../../dialogs/delete-book/delete-book.component';
import { FilterSettings } from 'src/app/models/filterSettings';
import {FilterService} from '../../../services/filter/filter.service';
import {Filterable} from '../../../Filterable';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']})
export class BooksComponent implements OnInit, OnDestroy, Filterable {

  constructor(private bookService: BookService,
              private filterService: FilterService,
              private dialog: MatDialog) { }

  displayedColumns: string[] = ['title', 'category', 'price', 'actions'];
  searchAbleColumns: string[] = ['title', 'category'];
  searchTerm: string;

  taskDisplayableColumns: FilterSettings = {
    name: 'Fields to display',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'title', completed: true, color: 'primary'},
      {name: 'category', completed: true, color: 'primary'},
      {name: 'price', completed: true, color: 'primary'}
    ]
  };
  taskSearchableColumns: FilterSettings = {
    name: 'Fields to search in',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'title', completed: true, color: 'primary'},
      {name: 'category', completed: true, color: 'primary'},
      {name: 'price', completed: false, color: 'primary'}
    ]
  };

  sortColumn = 'title';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Book>;

  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
    this.filterService.setFilterSubscriptions(this);
  }

  ngOnDestroy(): void {
    this.filterService.resetServiceObservers();
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

  loadData(pageSize: number, pageIndex: number, filter: string, sortColumn: string, sortDirection: string,
           searchAbleColumns: string[]): void {
    this.isLoading = true;
    this.bookService
      .list(pageSize, pageIndex, filter, searchAbleColumns, sortColumn, sortDirection)
      .subscribe(
        response => {
          this.dataSource = new MatTableDataSource(response.data);
          this.length = response.totalItems;
          this.isLoading = false;
        }
      );
  }

  changePage(event): void {
    this.pageSize = event.pageSize;
    this.loadData(this.pageSize, event.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: { book }
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
        }
      }
    );
  }

  confirmDeleteDialog(book): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: { book }
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.delete(book);
        }
      }
    );
  }

  delete(data): void {
    this.bookService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
      });
  }

  private reloadData(): void{
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }
}
