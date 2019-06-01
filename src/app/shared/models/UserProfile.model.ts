import {GroupModel} from './Group.model';
import {LanguageModel} from './Language.model';
import {UserCompanyInfoModel} from './UserCompanyInfo.model';
import {UserOutletInfoModel} from './UserOutletInfo.model';
import {UserPassPurchasedModel} from './UserPassPurchased.model';
import {UserOutletOfferPurchasedModel} from './UserOutletOfferPurchased.model';

export class UserProfileModel {
  public id: number;
  public name: string;
  public qrCodePath: string;
  public country: number;
  public parentId: number;
  public type: number;
  public userCompanyInfo: UserCompanyInfoModel;
  public userOutletInfo: UserOutletInfoModel;
  public userPassPurchased: UserPassPurchasedModel[];
  public userOutletOfferPurchased: UserOutletOfferPurchasedModel[];
  public email: string;
  public mobileNumber: string;
  public jobTitle: string;
  public enabled: boolean;
  public accountNonExpired: boolean;
  public accountNonLocked: boolean;
  public credentialNonExpired: boolean;
  public resetPasswordToken: string;
  public resetPasswordTokenValidity: Date;
  public createdDate: Date;
  public updatedDate: Date;
  public deletedDate: Date;
  public groupCollection: GroupModel[];
  public language: LanguageModel;

  constructor(id: number, name: string, qrCodePath: string, country: number, parentId: number, type: number,
              userCompanyInfo: UserCompanyInfoModel, userOutletInfo: UserOutletInfoModel, userPassPurchased: UserPassPurchasedModel[],
              userOutletOfferPurchased: UserOutletOfferPurchasedModel[], credentialNonExpired: boolean, resetPasswordToken: string,
              resetPasswordTokenValidity: Date, createdDate: Date, updatedDate: Date, enabled: boolean, accountNonExpired: boolean,
              accountNonLocked: boolean, groupCollection: GroupModel[], mobileNumber: string, jobTitle: string, deletedDate: Date,
              language: LanguageModel) {
    this.id = id;
    this.name = name;
    this.qrCodePath = qrCodePath;
    this.country = country;
    this.parentId = parentId;
    this.type = type;
    this.userCompanyInfo = userCompanyInfo;
    this.userOutletInfo = userOutletInfo;
    this.userPassPurchased = userPassPurchased;
    this.userOutletOfferPurchased = userOutletOfferPurchased;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.groupCollection = groupCollection;
    this.mobileNumber = mobileNumber;
    this.jobTitle = jobTitle;
    this.enabled = enabled;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.credentialNonExpired = credentialNonExpired;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordTokenValidity = resetPasswordTokenValidity;
    this.deletedDate = deletedDate;
    this.language = language;
  }
}
