import {Component, Inject, OnInit} from '@angular/core';
import {FilterService} from '../../../services/filter/filter.service';
import {FilterSettings} from '../../../models/filterSettings';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColumnHolder} from '../../../helpers/ColumnHolder/ColumnHolder';
import {FilterDialogSettings} from '../../../models/FilterDialogSettings';

@Component({
  selector: 'app-filter-config',
  templateUrl: './filter-config.component.html',
  styleUrls: ['./filter-config.component.css']
})
export class FilterConfigComponent implements OnInit {

  constructor(private filterService: FilterService,
              public dialogRef: MatDialogRef<FilterConfigComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FilterDialogSettings) { }

  displayAbleColumns: string[];
  searchAbleColumns: string[];

  displayedColumnHolder: ColumnHolder;
  searchableColumnHolder: ColumnHolder;

  ngOnInit(): void {
    this.displayedColumnHolder = this.getColumnHolderFromTask(this.data.taskDisplayableColumns, true);
    this.searchableColumnHolder = this.getColumnHolderFromTask(this.data.taskSearchableColumns, false);
    this.updateAllComplete(this.data.taskDisplayableColumns);
    this.updateAllComplete(this.data.taskSearchableColumns);
  }

  onSubmit(): void {
    if (this.searchAbleColumns) {
      this.filterService.searchAbleColumns.next(this.searchAbleColumns);
    }
    if (this.displayAbleColumns) {
      this.filterService.displayAbleColumns.next(this.displayAbleColumns);
    }
    this.dialogRef.close();
  }

  // <editor-fold>

  updateAllComplete(task: FilterSettings): void{
    task.completed = task.subcategories != null && task.subcategories.every(t => t.completed);
  }

  someComplete(task: FilterSettings): boolean {
    if (task.subcategories == null) {
      return false;
    }
    return task.subcategories.filter(t => t.completed).length > 0 && !task.completed;
  }

  setAllDisplayable(completed: boolean): void{
    const task = this.data.taskDisplayableColumns;
    task.completed = completed;
    if (task.subcategories == null) {
      return;
    }
    task.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldDisplay(t.name, completed);
    });
  }

  setAllSearchable(completed: boolean): void{
    const task = this.data.taskSearchableColumns;
    task.completed = completed;
    if (task.subcategories == null) {
      return;
    }
    task.subcategories.forEach(t => {
      t.completed = completed;
      this.setFieldSearch(t.name, completed);
    });
  }

  setFieldDisplay(fieldName: string, makeVisible: boolean): void{
    this.displayedColumnHolder.setFieldVisibility(fieldName, makeVisible);
    this.displayAbleColumns = this.displayedColumnHolder.getFields();
  }

  setFieldSearch(fieldName: string, shouldAdd: boolean): void{
    this.searchableColumnHolder.setFieldVisibility(fieldName, shouldAdd);
    this.searchAbleColumns = this.searchableColumnHolder.getFields();
  }
  // </editor-fold>

  private getColumnHolderFromTask(taskDisplayableColumns: FilterSettings, appendActionsColumn: boolean): ColumnHolder{
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
