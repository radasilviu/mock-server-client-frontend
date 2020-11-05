import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import {Book} from '../../models/book';
import {BooksComponent} from '../dataTables/books/books.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent<Book>;
  let fixture: ComponentFixture<PaginationComponent<Book>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
