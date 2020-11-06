import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EntityService} from '../entity/entity.service';
import {Book} from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService extends EntityService<Book>{

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super('/api/book',
                        http,
                        snackBar);
  }
}
