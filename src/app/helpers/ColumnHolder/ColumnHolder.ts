export class ColumnHolder{
  private readonly template: string[];
  private currentColumns: string[];

  constructor(template: string[]) {
    this.template = Object.assign([], template);
    this.currentColumns = Object.assign([], template);
  }

  setFieldVisibility(fieldName: string, setVisible: boolean): void{
    const fieldIndex: number = this.template.indexOf(fieldName);
    if (fieldIndex === -1) {
        throw new Error('There is no field with value ' + fieldName + ' inside template: [ ' + this.template + ' ]');
    }
    if (setVisible) {
      this.setVisible(fieldName);
    }
    else {
      this.setInvisible(fieldName);
    }
  }

  private setInvisible(fieldName: string): void{
    if (this.currentColumns.includes(fieldName))
    {
      const fieldIndex = this.currentColumns.indexOf(fieldName);
      this.currentColumns.splice(fieldIndex, 1);
    }
  }

  private setVisible(fieldToAdd: string): void{
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
