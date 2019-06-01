export class DropDownValuesModel {
  public relatedField: string;
  public value: string;

  constructor(relatedField: string, value: string) {
    this.relatedField = relatedField;
    this.value = value;
  }
}
