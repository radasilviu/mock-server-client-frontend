import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  deleteUserById(id: number): Observable<string> {
    return this.http.delete('' + id, {responseType: 'text'});
  }
  editUserById(id: number, user: User): Observable<any>{
    return this.http.put('' + id, user);
  }
}
