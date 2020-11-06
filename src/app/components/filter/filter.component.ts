import {Component, OnInit, Input} from '@angular/core';
import {FilterSettings} from '../../models/filterSettings';
import {FilterService} from '../../services/filter/filter.service';
import {MatDialog} from '@angular/material/dialog';
import {FilterConfigComponent} from './filter-config/filter-config.component';
import {FilterColumns} from '../../models/FilterColumns';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService,
              public dialog: MatDialog) { }

  @Input() taskDisplayableColumns: FilterSettings;
  @Input() taskSearchableColumns: FilterSettings;

  ngOnInit(): void {
  }

  applyFilter(event: Event): void {
   const searchTerm = (event.target as HTMLInputElement).value;
   this.filterService.searchTerm.next(searchTerm);
  }

  openConfiguration(): void {
    const dialogRef = this.dialog.open(FilterConfigComponent, {
      data: {
        taskDisplayableColumns: this.taskDisplayableColumns,
        taskSearchableColumns: this.taskSearchableColumns
      }
    });

    dialogRef.afterClosed().subscribe(
      (result: FilterColumns) =>
      {
        if (result)
        {
          this.filterService.displayAbleColumns.next(result.displayableColumns);
          this.filterService.searchAbleColumns.next(result.searchableColumns);
        }
      });
  }
}
