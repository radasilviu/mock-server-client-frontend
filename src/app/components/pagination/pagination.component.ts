import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {FilterService} from '../../services/filter/filter.service';
import {EntityService} from '../../services/entity/entity.service';
import {MatDialog} from '@angular/material/dialog';
import {Filterable} from '../../models/Filterable';
import {ComponentType} from '@angular/cdk/overlay';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnInit, OnDestroy, Filterable {

  editComponent: ComponentType<unknown>;
  deleteDialogComponent: ComponentType<unknown>;
  displayedColumns: string[];
  searchAbleColumns: string[];
  searchTerm = '';

  constructor(private filterService: FilterService,
              private entityService: EntityService<T>,
              private dialog: MatDialog) { }

  sortColumn: string;
  sortDirection = 'asc';
  dataSource: MatTableDataSource<T>;

  length: number;
  pageSize = 100;
  pageIndex = 0;

  isLoading = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
    this.filterService.setFilterSubscriptions(this);
  }

  ngOnDestroy(): void {
    this.filterService.resetServiceObservers();
  }

  setSearchTerm(term: string): void{
    this.searchTerm = term;
    this.reloadData();
  }

  setDisplayableColumns(cols: string[]): void{
    this.displayedColumns = cols;
  }

  setSearchableColumns(cols: string[]): void{
    this.searchAbleColumns = cols;
    this.reloadData();
  }

  loadData(pageSize: number, pageIndex: number, filter: string, sortColumn: string, sortDirection: string,
           searchAbleColumns: string[]): void{
    this.isLoading = true;
    this.entityService
      .list(pageSize, pageIndex, filter, searchAbleColumns, sortColumn, sortDirection)
      .subscribe(
        response => {
          this.dataSource = new MatTableDataSource(response.data);
          this.length = response.totalItems;
          this.isLoading = false;
        }
      );
  }

  changePage(event): void{
    this.pageSize = event.pageSize;
    this.reloadData();
  }

  sortData(sort: Sort): void{
    this.sortColumn = sort.active;
    this.sortDirection = sort.direction;
    this.reloadData();
  }

  openEditDialog(entity: T): void{
    const dialogRef = this.dialog.open(this.editComponent, {
      data: { entity }
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.reloadData();
        }
      }
    );
  }

  openDeleteDialog(entity: T): void{
    const dialogRef = this.dialog.open(this.deleteDialogComponent, {
      data: { entity }
    });
    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.delete(entity);
        }
      }
    );
  }

  delete(data): void{
    this.entityService
      .delete(data.id)
      .subscribe(() => {
        this.reloadData();
      });
  }

  protected reloadData(): void{
    this.loadData(this.pageSize, this.pageIndex, this.searchTerm, this.sortColumn, this.sortDirection, this.searchAbleColumns);
  }
}
