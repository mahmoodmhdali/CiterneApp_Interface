export class DashboardModel {
  public id: number;
  public title: string;
  public subTitle: string;
  public itemType: number;
  public counterValueBackend: string;
  public labels: string[];
  public values = [];
  public colors: string;
  public xaxiscolumn: string;

  constructor(id: number, title: string, subTitle: string, itemType: number, counterValueBackend: string, labels: string[], values: any[], colors: string, xaxiscolumn: string) {
    this.id = id;
    this.title = title;
    this.subTitle = subTitle;
    this.itemType = itemType;
    this.counterValueBackend = counterValueBackend;
    this.labels = labels;
    this.values = values;
    this.colors = colors;
    this.xaxiscolumn = xaxiscolumn;
  }
}
