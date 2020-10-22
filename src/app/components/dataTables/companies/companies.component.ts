import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company/company.service';
import {MatSort, Sort} from '@angular/material/sort';
import {EditCompanyComponent} from '../../dialogs/edit-company/edit-company.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCompanyComponent} from '../../dialogs/delete-company/delete-company.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'industry', 'actions'];
  searchAbleColumns: string[] = ['id', 'name', 'industry'];
  sortColumn = 'id';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Company>;

  filter: string;
  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private companyService: CompanyService, private dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.setItem("resource","companies")
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
          this.length = response.totalItems;
          this.isLoading = false;
        }
      );
  }

  sortData(sort: Sort): void {
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  openEditCompanyDialog(company): void {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: { company: company}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
        }
      }
    )
  }

  confirmDeleteDialog(company): void {
    const dialogRef = this.dialog.open(DeleteCompanyComponent, {
      data: { company: company}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.delete(company);
        }
      }
    );
  }

  delete(data): void {
    this.companyService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.filter, this.searchAbleColumns, this.sortColumn, this.sortDirection);
      });
  }
}
