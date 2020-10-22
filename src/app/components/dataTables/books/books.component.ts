import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Book} from '../../../models/book';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {BookService} from '../../../services/book/book.service';
import {MatDialog} from '@angular/material/dialog';
import {EditBookComponent} from '../../dialogs/edit-book/edit-book.component';
import {DeleteBookComponent} from '../../dialogs/delete-book/delete-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  displayedColumns: string[] = ['title', 'category', 'price', 'actions'];
  searchAbleColumns: string[] = ['title', 'category'];
  sortColumn = 'title';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Book>;

  filter: string;
  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    localStorage.setItem("resource", "books")

    this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  loadData(pageSize: number, pageIndex: number, filter: string,
           sortColumn: string, sortDirection: string,
           searchAbleColumns: string[]): void {
    localStorage.setItem("requestType", "GET");
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
    localStorage.setItem("requestType", "PUT")

    const dialogRef = this.dialog.open(EditBookComponent, {
      data: {book}
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
      data: {book}
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
    localStorage.setItem("requestType", "DELETE")

    this.bookService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.filter, this.sortColumn, this.sortDirection, this.searchAbleColumns);
      });
  }
}
