import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Book} from '../../../models/book';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {BookService} from '../../../services/book/book.service';
import {MatDialog} from '@angular/material/dialog';
import {EditBookComponent} from '../../dialogs/edit-book/edit-book.component';
import {DeleteBookComponent} from '../../dialogs/delete-book/delete-book.component';
import {ColumnHolder} from '../../../ColumnHolder';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService, private dialog: MatDialog) { }

  displayedHolder: ColumnHolder;
  searchableHolder: ColumnHolder;

  displayedColumns: string[];
  searchAbleColumns: string[];

  sortColumn = 'title';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Book>;

  filter: string;
  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;
  isInputFocused = false;

  displayAll = false;
  searchAll = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayableColumns: Task = {
    name: 'Fields to display',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'title', completed: true, color: 'primary'},
      {name: 'category', completed: true, color: 'primary'},
      {name: 'price', completed: true, color: 'primary'}
    ]
  };

  searchableColumns: Task = {
    name: 'Fields to search in',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'title', completed: true, color: 'primary'},
      {name: 'category', completed: true, color: 'primary'},
      {name: 'price', completed: false, color: 'primary'}
    ]
  };

  ngOnInit(): void {
    this.setDisplayedColumns();
    this.setSearchableColumns();
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  private setDisplayedColumns(): void{
    this.displayedHolder = new ColumnHolder(['title', 'category', 'price', 'actions']);
    this.displayedColumns = this.displayedHolder.getFields();
  }

  private setSearchableColumns(): void{
    this.searchableHolder = new ColumnHolder(['title', 'category', 'price']);
    this.searchAbleColumns = this.searchableHolder.getFields();
  }

  loadData(pageSize: number, pageIndex: number, filter: string,
           sortColumn: string, sortDirection: string,
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

  applyFilter(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  changePage(event): void {
    this.pageSize = event.pageSize;
    this.loadData(this.pageSize, event.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: { book }
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
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
        this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
      });
  }

  // Fancy - filter fields

  ShowOptions(): void{
    this.isInputFocused = true;
  }

  hideOptions(): void{
    this.isInputFocused = false;
  }

  // Display

  updateAllComplete(): void{
    this.displayAll = this.displayableColumns.subcategories != null && this.displayableColumns.subcategories.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.displayableColumns.subcategories == null) {
      return false;
    }
    return this.displayableColumns.subcategories.filter(t => t.completed).length > 0 && !this.displayAll;
  }

  setAll(completed: boolean): void{
    this.displayAll = completed;
    if (this.displayableColumns.subcategories == null) {
      return;
    }
    this.displayableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldDisplay(t.name, completed);
    });
  }

  setFieldDisplay(fieldName: string, shouldAdd: boolean): void{
  this.displayedHolder.setField(fieldName, shouldAdd);
  this.displayedColumns = this.displayedHolder.getFields();
  }

  // Search

  updateAllSearchable(): void{
    this.searchAll = this.searchableColumns.subcategories != null && this.searchableColumns.subcategories.every(t => t.completed);
  }

  someSearchable(): boolean {
    if (this.searchableColumns.subcategories == null) {
      return false;
    }
    return this.searchableColumns.subcategories.filter(t => t.completed).length > 0 && !this.searchAll;
  }

  searchAllColumns(completed: boolean): void{
    this.searchAll = completed;
    if (this.searchableColumns.subcategories == null) {
      return;
    }
    this.searchableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldSearch(t.name, completed);
    });
  }

  setFieldSearch(fieldName: string, shouldAdd: boolean): void{
    this.searchableHolder.setField(fieldName, shouldAdd);
    this.searchAbleColumns = this.searchableHolder.getFields();
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);  }
}
