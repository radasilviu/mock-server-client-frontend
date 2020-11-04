import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookComponent } from './delete-book.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

describe('DeleteBookComponent', () => {
  let component: DeleteBookComponent;
  let fixture: ComponentFixture<DeleteBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookComponent ],
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
