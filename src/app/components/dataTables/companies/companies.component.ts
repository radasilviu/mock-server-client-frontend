import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Company} from '../../../models/company';
import {CompanyService} from '../../../services/company/company.service';
import {MatSort, Sort} from '@angular/material/sort';
import {EditCompanyComponent} from '../../dialogs/edit-company/edit-company.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DeleteCompanyComponent} from '../../dialogs/delete-company/delete-company.component';
import {Task} from '../../../models/task';
import {FilterService} from '../../../services/filter/filter.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'industry', 'actions'];
  searchAbleColumns: string[] = ['id', 'name', 'industry'];
  searchTerm: string;

  taskDisplayableColumns: Task = {
    name: 'Fields to display',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'id', completed: true, color: 'primary'},
      {name: 'name', completed: true, color: 'primary'},
      {name: 'industry', completed: true, color: 'primary'}
    ]
  };
  taskSearchableColumns: Task = {
    name: 'Fields to search in',
    completed: true,
    color: 'primary',
    subcategories: [
      {name: 'id', completed: true, color: 'primary'},
      {name: 'name', completed: true, color: 'primary'},
      {name: 'industry', completed: false, color: 'primary'}
    ]
  };

  sortColumn = 'id';
  sortDirection = 'asc';
  dataSource: MatTableDataSource<Company>;

  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private companyService: CompanyService,
              private  filterService: FilterService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.setItem('resource', 'companies');
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.filterService.resetServiceObservers();
  }

  changePage(event): void {
    this.pageSize = event.pageSize;
    this.loadData(this.pageSize, event.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }

  loadData(pageSize: number, pageIndex: number, filter: string, sortColumn: string, sortDirection: string,
           searchAbleColumns: string[]): void {
    localStorage.setItem('requestType', 'GET');
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
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }


  openEditCompanyDialog(company): void {
    localStorage.setItem('requestType', 'PUT');

    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: { company}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
        }
      }
    );
  }

  confirmDeleteDialog(company): void {
    const dialogRef = this.dialog.open(DeleteCompanyComponent, {
      data: { company}
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
    localStorage.setItem('requestType', 'DELETE');
    this.companyService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
      });
  }

  private setSubscriptions(): void{
    this.setSearchTermSubscription();
    this.setDisplayedColumnsSubscription();
    this.setSearchedColumnsSubscription();
    this.setHasChangedSubscription();
  }

  private setSearchTermSubscription(): void{
    this.filterService.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe(searchTerm => this.setSearchTerm(searchTerm));
  }

  private setDisplayedColumnsSubscription(): void{
    this.filterService.displayAbleColumns.subscribe(displayedCol => {
      this.displayedColumns = displayedCol;
    });
  }

  private setSearchedColumnsSubscription(): void{
    this.filterService.searchAbleColumns.subscribe(searchedCol => {
      this.searchAbleColumns = searchedCol;
    });
  }

  private setHasChangedSubscription(): void{
    this.filterService.hasChanged.subscribe(() =>  this.reloadData());
  }

  private setSearchTerm(term: string): void{
    this.searchTerm = term;
    this.reloadData();
  }

  private reloadData(): void{
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }
}
