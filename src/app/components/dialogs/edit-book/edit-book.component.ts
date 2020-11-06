import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookService} from '../../../services/book/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editBookForm: FormGroup;
  private bookId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService) { }

  ngOnInit(): void {
    this.bookId = this.data.entity.id;
    this.editBookForm = new FormGroup({
      author: new FormControl(this.data.entity.author, [ Validators.required]),
      price: new FormControl(this.data.entity.price, [ Validators.required]),
      title: new FormControl(this.data.entity.title, [ Validators.required])
    });
  }

  get author(): AbstractControl { return this.editBookForm.get('author'); }
  get price(): AbstractControl { return this.editBookForm.get('price'); }
  get title(): AbstractControl { return this.editBookForm.get('title'); }

  onSubmit(): void {
    this.bookService
      .update(this.bookId, this.editBookForm.value)
      .subscribe();
  }
}
