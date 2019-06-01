import {ReportModel} from './Report.model';
import {DropDownValuesModel} from './DropDownValues.model';

export class ReportFilterModel {
  public id: number;
  public reportField: string;
  public fieldType: string;
  public displayName: string;
  public required: boolean;
  public report: ReportModel;
  public selectQuery: string;
  public fieldIndex: string;
  public dropDownValues: DropDownValuesModel[];

  constructor(id: number, reportField: string, fieldType: string, displayName: string, required: boolean,
              selectQuery: string, fieldIndex: string, report: ReportModel, dropDownValues: DropDownValuesModel[]) {
    this.id = id;
    this.reportField = reportField;
    this.fieldType = fieldType;
    this.displayName = displayName;
    this.selectQuery = selectQuery;
    this.report = report;
    this.required = required;
    this.fieldIndex = fieldIndex;
    this.dropDownValues = dropDownValues;
  }
}
