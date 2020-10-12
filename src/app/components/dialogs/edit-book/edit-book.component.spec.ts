import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookComponent } from './edit-book.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Book} from '../../../models/book';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {
            book: {
              author: 'Freida Wilkinson V',
              category: 'Fairy tale',
              id: 'ff808181751cd99c01751cd99f4b019b',
              price: 477,
              title: 'A Catskill Eagle'
            }
          }},
        { provide: MatDialogRef, useValue: {} }],
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    // component.data = ;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
