import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getUser(){
    const realm = localStorage.getItem("realm");
    const user = JSON.parse(localStorage.getItem("token"))

    return this.http.get("http://localhost:8081/api" + '/user/' + realm + '/' + user.username);
  }
}
