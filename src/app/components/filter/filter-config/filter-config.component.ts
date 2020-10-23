import {Component, Inject, OnInit} from '@angular/core';
import {FilterService} from '../../../services/filter/filter.service';
import {Task} from '../../../models/task';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColumnHolder} from '../../../ColumnHolder';
import {FilterDialogTasks} from '../../../FilterDialogTasks';

@Component({
  selector: 'app-filter-config',
  templateUrl: './filter-config.component.html',
  styleUrls: ['./filter-config.component.css']
})
export class FilterConfigComponent implements OnInit {

  constructor(private filterService: FilterService,
              public dialogRef: MatDialogRef<FilterConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FilterDialogTasks) { }

  displayAbleColumns: string[];
  searchAbleColumns: string[];

  displayedColumnHolder: ColumnHolder;
  searchableColumnHolder: ColumnHolder;

  displayAll = true;
  searchAll = false;

  ngOnInit(): void {
    this.displayedColumnHolder = this.getColumnHolderFromTask(this.data.taskDisplayableColumns, true);
    this.searchableColumnHolder = this.getColumnHolderFromTask(this.data.taskSearchableColumns, false);
    this.checkIfAllDisplayable();
    this.checkIfAllSearchable();
  }

  onSubmit(): void {
    let eitherFieldHasChanged = false;
    if (this.searchAbleColumns) {
      this.filterService.searchAbleColumns.next(this.searchAbleColumns);
      eitherFieldHasChanged = true;
    }
    if (this.displayAbleColumns) {
      this.filterService.displayAbleColumns.next(this.displayAbleColumns);
      eitherFieldHasChanged = true;
    }
    if (eitherFieldHasChanged) {
      this.filterService.hasChanged.next();
    }
    this.dialogRef.close();
  }

  // <editor-fold>
  // Display

  checkIfAllDisplayable(): void{
    this.displayAll = this.data.taskDisplayableColumns.subcategories != null &&
      this.data.taskDisplayableColumns.subcategories
        .every(t => t.completed);
  }

  checkIfSomeDisplayable(): boolean {
    if (this.data.taskDisplayableColumns.subcategories == null) {
      return false;
    }
    return this.data.taskDisplayableColumns.subcategories.filter(t => t.completed).length > 0 && !this.displayAll;
  }

  setAllColumnsDisplayable(completed: boolean): void{
    this.displayAll = completed;
    if (this.data.taskDisplayableColumns.subcategories == null) {
      return;
    }
    this.data.taskDisplayableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldDisplay(t.name, completed);
    });
  }

  setFieldDisplay(fieldName: string, shouldAdd: boolean): void{
    this.displayedColumnHolder.setFieldVisibility(fieldName, shouldAdd);
    this.displayAbleColumns = this.displayedColumnHolder.getFields();
  }

  // Search

  checkIfAllSearchable(): void{
    this.searchAll = this.data.taskSearchableColumns.subcategories != null &&
      this.data.taskSearchableColumns.subcategories
        .every(t => t.completed);
  }

  checkIfSomeSearchable(): boolean {
    if (this.data.taskSearchableColumns.subcategories == null) {
      return false;
    }
    return this.data.taskSearchableColumns.subcategories.filter(t => t.completed).length > 0 && !this.searchAll;
  }

  setAllColumnsSearchable(completed: boolean): void{
    this.searchAll = completed;
    if (this.data.taskSearchableColumns.subcategories == null) {
      return;
    }
    this.data.taskSearchableColumns.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldSearch(t.name, completed);
    });
  }

  setFieldSearch(fieldName: string, shouldAdd: boolean): void{
    this.searchableColumnHolder.setFieldVisibility(fieldName, shouldAdd);
    this.searchAbleColumns = this.searchableColumnHolder.getFields();
  }
  // </editor-fold>

  private getColumnHolderFromTask(taskDisplayableColumns: Task, appendActionsColumn: boolean): ColumnHolder{
    const colList: string[] = [];
    taskDisplayableColumns.subcategories.forEach(t => {
      colList.push(t.name);
    });
    if (appendActionsColumn) {
      colList.push('actions');
    }
    return new ColumnHolder(colList);
  }
}
