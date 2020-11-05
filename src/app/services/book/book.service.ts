import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EntityService} from '../entity/entity.service';

@Injectable({
  providedIn: 'root'
})
export class BookService extends EntityService{

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super('/api/book',
                        http,
                        snackBar);
  }
}
