import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Company} from '../../models/company';
import {Env} from '../../configs/env';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EntityService} from '../entity/entity.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends EntityService<Company>{

  constructor(http: HttpClient, snackBar: MatSnackBar) {
    super('/api/company',
      http,
      snackBar);
  }

  // We can also overwrite methods, but for now we HAVE to overwrite this one, because the urls don't match
  update(id: number, data: Company): Observable<any> {
    const url = Env.resourceServerRootURL + `/api/company/${id}`;

    return this.http.put(url, data)
      .pipe(
        catchError(error => {
          return this.handleError(error, this.snackBar);
        })
      );
  }
}
