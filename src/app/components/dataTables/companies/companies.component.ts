import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company/company.service';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'actions'];
  searchAbleColumns: string[] = ['id', 'name'];
  sortColumn = 'id';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Company>;

  filter: string;
  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  applyFilter(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  changePage(event): void {
    this.pageSize = event.pageSize;
    this.loadData(this.pageSize, event.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  loadData(pageSize: number, pageIndex: number, filter: string, searchAbleColumns: string[], sortColumn: string, sortDirection: string): void {
    this.isLoading = true;
    this.companyService
      .list(pageSize, pageIndex, filter, searchAbleColumns, sortColumn, sortDirection)
      .subscribe(
        response => {
          this.dataSource = new MatTableDataSource(response.data);
          this.length = response.filtered;
          this.isLoading = false;
        }
      );
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }
/*
  openEditUserDialog(user): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user: user}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
        }
      }
    )
  }

  confirmDeleteDialog(user): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: { user: user}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.delete(user);
        }
      }
    );
  }
*/
  delete(data): void {
    this.companyService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
      });
  }
}
