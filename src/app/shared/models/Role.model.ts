import {GroupModel} from './Group.model';

export class RoleModel {
  public id: number;
  public role: string;
  public roleLabel: string;
  public isSystemRole: boolean;
  public groupCollection: GroupModel[];

  constructor(id: number, role: string, roleLabel: string, isSystemRole: boolean, groupCollection: GroupModel[]) {
    this.id = id;
    this.role = role;
    this.roleLabel = roleLabel;
    this.isSystemRole = isSystemRole;
    this.groupCollection = groupCollection;
  }
}
