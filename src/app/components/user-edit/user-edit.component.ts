import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private service: DashboardService) { }

  // items = [{name: 'jean', surname: 'kruger'}, {name: 'bobby', surname: 'marais'}];
  items: any[] = [];
  ngOnInit(): void {
    this.service.readFromFile().subscribe(
      x => this.items = JSON.parse(x).data
    );
  }

}
