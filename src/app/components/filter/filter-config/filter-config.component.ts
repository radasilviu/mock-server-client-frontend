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

  ngOnInit(): void {
    this.displayedColumnHolder = this.getColumnHolderFromTask(this.data.taskDisplayableColumns, true);
    this.searchableColumnHolder = this.getColumnHolderFromTask(this.data.taskSearchableColumns, false);
    this.updateAllComplete(this.data.taskDisplayableColumns);
    this.updateAllComplete(this.data.taskSearchableColumns);
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

  updateAllComplete(task: Task): void{
    task.completed = task.subcategories != null && task.subcategories.every(t => t.completed);
  }

  someComplete(task: Task): boolean {
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
