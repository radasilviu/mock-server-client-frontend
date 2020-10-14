export class ColumnHolder{
  private readonly template: string[];
  private currentColumns: string[];

  constructor(template: string[]) {
    this.template = Object.assign([], template);
    this.currentColumns = Object.assign([], template);
  }

  setField(fieldName: string, shouldAdd: boolean): void{
    let fieldIndex: number = this.template.indexOf(fieldName);
    if (fieldIndex === -1) {
        throw new Error('There is no field with value ' + fieldName + ' inside template ' + this.template);
    }
    if (shouldAdd) {
      this.add(fieldName);
    }
    else {
      if (this.currentColumns.includes(fieldName)) {
        fieldIndex = this.currentColumns.indexOf(fieldName);
        this.remove(fieldIndex);
      }
    }
  }

  private remove(fieldIndex: number): void{
    this.currentColumns.splice(fieldIndex, 1);
  }

  private add(fieldToAdd: string): void{
    const temp: string[] = [];
    this.template.forEach(
      (value) => {
        if (this.currentColumns.includes(value) || value === fieldToAdd) {
          temp.push(value);
        }
      }
    );
    this.currentColumns = temp;
  }

  getFields(): string[]{
    return this.currentColumns;
  }
}
