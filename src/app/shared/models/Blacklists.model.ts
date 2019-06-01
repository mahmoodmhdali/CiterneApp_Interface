
export class BlacklistsModel {
  public id: number;
  public msisdn: string;
  public dateblacklisted: Date;
  public bwflag: boolean;

  constructor(id: number, msisdn: string, dateblacklisted: Date, bwflag: boolean) {
    this.id = id;
    this.msisdn = msisdn;
    this.dateblacklisted = dateblacklisted;
    this.bwflag = bwflag;
  }
}
