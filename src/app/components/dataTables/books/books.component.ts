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
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FilterService} from '../../../services/filter/filter.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']})
export class BooksComponent implements OnInit {

  constructor(private bookService: BookService,
              private filterService: FilterService,
              private dialog: MatDialog) { }

  displayedColumns: string[] = ['title', 'category', 'price', 'actions'];
  searchAbleColumns: string[] = ['title', 'category'];
  searchTerm: string;

  taskDisplayableColumns: Task = {
    name: 'Fields to display',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'title', completed: true, color: 'primary'},
      {name: 'category', completed: true, color: 'primary'},
      {name: 'price', completed: true, color: 'primary'}
    ]
  };
  taskSearchableColumns: Task = {
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
    this.setSearchTermSubscription();
  }

  setSearchTermSubscription(): void{
    this.filterService.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe(searchTerm => this.setSearchTerm(searchTerm));
  }

  reloadData(): void{
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
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

  // applyFilter(filter: string): void {
  //   this.searchTerm = filter;
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  //   this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  // }

  setDisplayed(displayedColumns: string[]): void{
    this.displayedColumns = displayedColumns;
    this.reloadData();
  }

  setSearchable(searchableColumns: string[]): void{
    this.searchAbleColumns = searchableColumns;
    this.reloadData();
  }

  setSearchTerm(term: string): void{
    this.searchTerm = term;
    console.log(term + 'in book');
    this.reloadData();
  }
}
