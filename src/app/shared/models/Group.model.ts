import {RoleModel} from './Role.model';
import {UserProfileModel} from './UserProfile.model';
import {ReportModel} from './Report.model';

export class GroupModel {
  public id: number;
  public name: string;
  public description: string;
  public selected: boolean;
  public createdDate: Date;
  public updatedDate: Date;
  public userProfileCollection: UserProfileModel[];
  public roleCollection: RoleModel[];
  public reportCollection: ReportModel[];

  constructor(id: number, name: string, description: string, selected: boolean, createdDate: Date, updatedDate: Date,
              roleCollection: RoleModel[], reportCollection: ReportModel[], userProfileCollection: UserProfileModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.selected = selected;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.userProfileCollection = userProfileCollection;
    this.reportCollection = reportCollection;
    this.roleCollection = roleCollection;
  }
}
