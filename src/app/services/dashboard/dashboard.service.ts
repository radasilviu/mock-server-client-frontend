import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  readFromFile(): Observable<string> {
    return this.http.get('assets/tableInput.json', {responseType: 'text'});
  }
  deleteById(id: number): Observable<string> {
    return this.http.delete('' + id, {responseType: 'text'});
  }
  editById(id: number, user: User): Observable<any>{
    return this.http.put('' + id, user);
  }
}
