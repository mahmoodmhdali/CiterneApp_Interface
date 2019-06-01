export class ResponseBuilderModel {
  public code: number;
  public description: string;
  public data: any;

  constructor(code: number, description: string, data: any) {
    this.code = code;
    this.description = description;
    this.data = data;
  }
}
