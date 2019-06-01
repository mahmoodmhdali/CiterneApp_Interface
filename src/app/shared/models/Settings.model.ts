// import {GroupModel} from './Group.model';
export class SettingsModel {
}

export class SettingsColumnsModel {
  public columnId: number;
  public columnName: string;
  public columnValue: any;
  public columnDescription: string;
  public labelDisplay: string;
  public fieldType: string; // Number , text , dropdown ,  checkbox, accordion
  public fieldOptions: FieldOptionsModel[]; // in case dropdown
  public relatedColumns: SettingsColumnsModel[]; // in case accordion checked and has related fields
  public relatedFields: SettingsColumnsModel[]; // in case accordion checked and has related fields
  public accordionOptions: any[];
  public accordionItems: AccordionItemsModel;
  public editable: number;
  public subTableName: string;
  public columnCategory: string;
  public filterVal = '';
  public isExpanded = false;

  constructor(columnId: number, columnName: string, columnValue: any, columnDescription: string,
              labelDisplay: string, fieldType: string, fieldOptions: FieldOptionsModel[],
              relatedColumns: SettingsColumnsModel[], relatedFields: SettingsColumnsModel[], accordionOptions: any[],
              accordionItems: AccordionItemsModel, editable: number, subTableName: string, columnCategory: string, filterVal: string,
              isExpanded: boolean) {
    this.columnId = columnId;
    this.columnName = columnName;
    this.columnValue = columnValue;
    this.columnDescription = columnDescription;
    this.labelDisplay = labelDisplay;
    this.fieldType = fieldType;
    this.fieldOptions = fieldOptions;
    this.relatedColumns = relatedColumns;
    this.relatedFields = relatedFields;
    this.accordionOptions = accordionOptions;
    this.accordionItems = accordionItems;
    this.editable = editable;
    this.subTableName = subTableName;
    this.columnCategory = columnCategory;
    this.filterVal = filterVal;
    this.isExpanded = isExpanded;
  }
}

export class FieldOptionsModel {
  public optionId: string;
  public optionName: string;

  constructor(optionId: string, optionName: string) {
    this.optionId = optionId;
    this.optionName = optionName;

  }
}

export class AccordionItemsModel {
  public rows = [];
  public temprows = [];
  public columns: AccordioColumnModel [];

  constructor(rows, temprows, columns: AccordioColumnModel[]) {
    this.rows = rows;
    this.temprows = temprows;
    this.columns = columns;

  }
}

export class AccordioColumnModel {
  public rowName: string;
  public rowDisplay: string;
  public showRow: boolean;

  constructor(rowName: string, rowDisplay: string, showRow: boolean) {
    this.rowName = rowName;
    this.rowDisplay = rowDisplay;
    this.showRow = showRow;

  }
}

export class SubSettingsModel {
  public columnId: String;
  public data: any;

  constructor(columnId, data) {
    this.columnId = columnId;
    this.data = data;

  }
}
