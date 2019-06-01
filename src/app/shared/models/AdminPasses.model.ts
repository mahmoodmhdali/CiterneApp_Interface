export class ProfileModel {
  public id: number;
  public name: string;
  public about: string;
  public imagePath: string;
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;

  constructor (id: number, name: string, about: string, imagePath: string,
               createdDate: Date, updatedDate: Date, deletedDate: Date) {
    this.id = id;
    this.name = name;
    this.about = about;
    this.imagePath = imagePath;
    this.updatedDate = updatedDate;
    this.createdDate = createdDate;
    this.deletedDate = deletedDate;
  }
}
