export class ColumnHolder{
  private template: string[];
  private currentColumns: string[];

  constructor(template: string[]) {
    this.template = template;
    this.currentColumns = template;
  }

  setField(fieldName: string, shouldAdd: boolean): void{
    const fieldIndex: number = this.template.indexOf(fieldName);
    if (fieldIndex === -1) {
        throw new Error('There is no field with value ' + fieldName + ' inside template ' + this.template);
    }
    if (shouldAdd) {
      this.add(fieldName);
    }
    else {
      this.remove(fieldIndex);
    }
  }

  private remove(fieldIndex: number): void{
    this.currentColumns.splice(fieldIndex, 1);
  }

  private add(fieldName: string): void{

  }

  getFields(): string[]{
    return this.currentColumns;
  }
}
