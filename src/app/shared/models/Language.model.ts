export class LanguageModel {
  public id: number;
  public languagename: string;
  public prefix: string;

  constructor(id: number, languagename: string, prefix: string) {
    this.id = id;
    this.languagename = languagename;
    this.prefix = prefix;
  }
}
