import {ReportModel} from './Report.model';

export class ReportStyleModel {
  public id: number;
  public name: string;
  public reportCollection: ReportModel[];

  constructor(id: number, name: string, reportCollection: ReportModel[]) {
    this.id = id;
    this.name = name;
    this.reportCollection = reportCollection;
  }
}
