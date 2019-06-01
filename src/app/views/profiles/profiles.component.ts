import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {egretAnimations} from '../../shared/animations/egret-animations';
import {GlobalService} from '../../shared/services/global.service';
import {ProfileModel} from '../../shared/models/AdminPasses.model';
import {ProfilesService} from '../../shared/services/database-services/profiles.service';
import {UserOutletOffersService} from '../../shared/services/database-services/userOutletOffers.service';
import {NgxProfilesPopupComponent} from './ngx-table-popup/ngx-profiles-popup.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  animations: egretAnimations
})
export class ProfilesComponent implements OnInit {
  public items: ProfileModel[];
  apiConfig;
  modelLoaded = 0;
  currentPage = 1;
  itemsPerPage = 9;
  totalItems = 0;
  recordsPerPageValue = 10;
  loadingIndicator = false;

  constructor (
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private profilesService: ProfilesService,
    private userOutletOffersService: UserOutletOffersService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService,
    private svcGlobal: GlobalService
  ) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit () {
    this.getPackages();
  }

  getPackages () {
    this.loadingIndicator = true;
    this.profilesService.getAllProfilesPaging(this.currentPage, this.itemsPerPage).subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          this.items = responseBuilder.data.profiles.profiles;
          this.totalItems = responseBuilder.data.profiles.totalResults;
          this.modelLoaded ++;
          this.loadingIndicator = false;
        }
      }
    );
  }

  handlePageChange (event) {
    this.currentPage = event.offset + 1;
    this.loadingIndicator = true;
    this.profilesService.getAllProfilesPaging(this.currentPage, this.itemsPerPage).subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          this.items = responseBuilder.data.profiles.profiles;
          this.totalItems = responseBuilder.data.profiles.totalResults;
          this.loadingIndicator = false;
        }
      }
    );
  }

  openPopUp (data: any = {}, isNew?) {
    const title = isNew ? 'Add new profile' : 'Update profile';
    const dialogRef: MatDialogRef<any> = this.dialog.open(NgxProfilesPopupComponent, {
      width: '720px',
      disableClose: true,
      data: {title: title, payload: data, isNew: isNew}
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (! res) {
          return;
        }
        this.getPackages();
      });
  }

}
