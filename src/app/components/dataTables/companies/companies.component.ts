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
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.filterService.resetServiceObservers();
  }

  setSearchTerm(term: string): void{
    this.searchTerm = term;
    console.log(term + 'in company');
    this.reloadData();
  }

  reloadData(): void{
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  applyFilter(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  changePage(event): void {
    this.pageSize = event.pageSize;
    this.loadData(this.pageSize, event.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  loadData(pageSize: number, pageIndex: number, filter: string, searchAbleColumns: string[], sortColumn: string, sortDirection: string): void {
    this.isLoading = true;
    console.log('Calling listing Companies');
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
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
  }

  openEditCompanyDialog(company): void {
    const dialogRef = this.dialog.open(EditCompanyComponent, {
      data: { company}
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
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
    this.companyService
      .delete(data.id)
      .subscribe(response => {
        this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.searchAbleColumns, this.sortColumn, this.sortDirection);
      });
  }

  setDisplayed(displayedColumns: string[]): void{
    this.displayedColumns = displayedColumns;
    this.reloadData();
  }

  setSearchable(searchableColumns: string[]): void{
    this.searchAbleColumns = searchableColumns;
    this.reloadData();
  }

  private setSubscriptions(): void{
    this.setSearchTermSubscription();
    this.setDisplayedColumnsSubscription();
    this.setSearchedColumnsSubscription();
  }

  private setSearchTermSubscription(): void{
    this.filterService.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged()).subscribe(searchTerm => this.setSearchTerm(searchTerm));
  }

  private setDisplayedColumnsSubscription(): void{
    this.filterService.displayAbleColumns.subscribe(displayedCol => {
      this.displayedColumns = displayedCol;
      console.log('diCol');
    });
  }

  private setSearchedColumnsSubscription(): void{
    this.filterService.searchAbleColumns.subscribe(searchedCol => {
      this.searchAbleColumns = searchedCol;
      console.log('seCol');
    });
  }
}
