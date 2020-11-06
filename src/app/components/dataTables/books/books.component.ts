import {Component} from '@angular/core';
import {Book} from '../../../models/book';
import {BookService} from '../../../services/book/book.service';
import {MatDialog} from '@angular/material/dialog';
import {FilterSettings} from 'src/app/models/filterSettings';
import {FilterService} from '../../../services/filter/filter.service';
import {PaginationComponent} from '../../pagination/pagination.component';
import {EditBookComponent} from '../../dialogs/edit-book/edit-book.component';
import {DeleteBookComponent} from '../../dialogs/delete-book/delete-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']})
export class BooksComponent extends PaginationComponent<Book>{

  editComponent = EditBookComponent;
  deleteDialogComponent = DeleteBookComponent;
  sortColumn = 'title';
  displayedColumns = ['title', 'category', 'price', 'actions'];
  searchAbleColumns = ['title', 'category'];

  constructor(private bookService: BookService,
              filterService: FilterService,
              dialog: MatDialog) {
    super(filterService, bookService, dialog);
  }

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
}
