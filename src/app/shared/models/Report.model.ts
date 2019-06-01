import {ReportFilterModel} from './ReportFilter.model';
import {ReportStyleModel} from './ReportStyle.model';
import {GroupModel} from './Group.model';

export class ReportModel {
  public id: number;
  public name: string;
  public procName: string;
  public lastQueryContainsWhere: boolean;
  public lastQueryContainsGroup: boolean;
  public lastQueryContainsOrder: boolean;
  public reportFilters: ReportFilterModel[];
  public reportStyleCollection: ReportStyleModel[];
  public chartTitle: string;
  public chartSubTitle: string;
  public groupCollection: GroupModel[];

  constructor(id: number, name: string, procName: string, lastQueryContainsWhere: boolean,
              lastQueryContainsGroup: boolean, lastQueryContainsOrder: boolean, reportFilters: ReportFilterModel[],
              reportStyleCollection: ReportStyleModel[], groupCollection: GroupModel[], chartTitle: string, chartSubTitle: string) {
    this.id = id;
    this.name = name;
    this.procName = procName;
    this.lastQueryContainsWhere = lastQueryContainsWhere;
    this.lastQueryContainsGroup = lastQueryContainsGroup;
    this.lastQueryContainsOrder = lastQueryContainsOrder;
    this.groupCollection = groupCollection;
    this.reportFilters = reportFilters;
    this.reportStyleCollection = reportStyleCollection;
    this.chartTitle = chartTitle;
    this.chartSubTitle = chartSubTitle;
  }
}
