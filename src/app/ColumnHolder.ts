export class ColumnHolder{
  private template: string[];
  private currentColumns: string[];
  private fieldIndex: number;

  constructor(template: string[]) {
    this.template = template;
    this.currentColumns = template;
  }

  setField(fieldName: string, shouldAdd: boolean): void{
    this.fieldIndex = this.template.indexOf(fieldName);
    if (this.fieldIndex === -1) {
        throw new Error('There is no field with value ' + fieldName + ' inside template ' + this.template);
    }
    if (shouldAdd) {
      this.show(fieldName);
    }
    else {
      this.hide(fieldName);
    }
  }

  private hide(fieldName: string) {

  }

  private show(fieldName: string) {

  }

  getFields(): string[]{
    return this.currentColumns;
  }
}
