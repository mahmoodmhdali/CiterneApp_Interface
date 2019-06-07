import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {AppConfirmService} from '../../shared/services/app-confirm/app-confirm.service';
import {AppLoaderService} from '../../shared/services/app-loader/app-loader.service';
import {egretAnimations} from '../../shared/animations/egret-animations';
import {GlobalService} from '../../shared/services/global.service';
import {ProfileModel} from '../../shared/models/AdminPasses.model';
import {NgxEventsPopupComponent} from './ngx-event-popup/ngx-events-popup.component';
import {EventsService} from '../../shared/services/database-services/events.service';
import {EventClassTypeService} from '../../shared/services/database-services/eventClassType.service';
import {EventClassCategoryService} from '../../shared/services/database-services/eventClassCategory.service';
import {forkJoin} from 'rxjs';
import {ProfilesService} from '../../shared/services/database-services/profiles.service';
import {NgxEventImagesPopupComponent} from './ngx-event-images-popup/ngx-event-images-popup.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: egretAnimations
})
export class EventsComponent implements OnInit {
  public items: ProfileModel[];
  apiConfig;
  timeGMTPlus = 0;
  modelLoaded = 0;
  currentPage = 1;
  itemsPerPage = 9;
  totalItems = 0;
  recordsPerPageValue = 10;
  loadingIndicator = false;

  constructor (
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private eventsService: EventsService,
    private confirmService: AppConfirmService,
    private eventClassTypeService: EventClassTypeService,
    private eventClassCategoryService: EventClassCategoryService,
    private profilesService: ProfilesService,
    private loader: AppLoaderService,
    private svcGlobal: GlobalService
  ) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
    this.timeGMTPlus = this.svcGlobal.getSession('TIME_GMT_PLUS');
  }

  ngOnInit () {
    this.getPackages();
  }

  getPackages () {
    this.loadingIndicator = true;
    this.eventsService.getAllEventsPaging(this.currentPage, this.itemsPerPage).subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          this.items = responseBuilder.data.eventClasses.eventClasses;
          this.totalItems = responseBuilder.data.eventClasses.totalResults;
          this.modelLoaded ++;
          this.loadingIndicator = false;
        }
      }
    );
  }

  handlePageChange (event) {
    this.currentPage = event.offset + 1;
    this.loadingIndicator = true;
    this.eventsService.getAllEventsPaging(this.currentPage, this.itemsPerPage).subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          this.items = responseBuilder.data.eventClasses.eventClasses;
          this.totalItems = responseBuilder.data.eventClasses.totalResults;
          this.loadingIndicator = false;
        }
      }
    );
  }

  openPopUp (data: any = {}, isNew?) {
    this.loader.open('Please Wait');
    if (! isNew) {
      this.eventsService.getEvent(data.id).subscribe(
        (responseBuilder) => {
          if (responseBuilder.code === + this.apiConfig.SUCCESS) {
            data = responseBuilder.data.EventClass;
            forkJoin([this.eventClassTypeService.getAllEventClassTypes(),
              this.eventClassCategoryService.getAllEventClassCategories(),
              this.profilesService.getAllProfiles()])
              .subscribe(responses => {
                if (responses[0].code === + this.apiConfig.SUCCESS &&
                  responses[1].code === + this.apiConfig.SUCCESS &&
                  responses[2].code === + this.apiConfig.SUCCESS) {
                  this.loader.close();
                  const title = isNew ? 'Add new event' : 'Update event';
                  const dialogRef: MatDialogRef<any> = this.dialog.open(NgxEventsPopupComponent, {
                    width: '720px',
                    height: '600px',
                    disableClose: true,
                    data: {
                      title: title,
                      payload: data,
                      isNew: isNew,
                      types: responses[0].data.eventClassTypes,
                      categories: responses[1].data.eventClassCategories,
                      profiles: responses[2].data.profiles
                    }
                  });
                  dialogRef.afterClosed()
                    .subscribe(res => {
                      if (! res) {
                        return;
                      }
                      this.getPackages();
                    });
                }
              });
          }
        }
      );
    } else {
      forkJoin([this.eventClassTypeService.getAllEventClassTypes(),
        this.eventClassCategoryService.getAllEventClassCategories(),
        this.profilesService.getAllProfiles()])
        .subscribe(responses => {
          if (responses[0].code === + this.apiConfig.SUCCESS &&
            responses[1].code === + this.apiConfig.SUCCESS &&
            responses[2].code === + this.apiConfig.SUCCESS) {
            this.loader.close();
            const title = isNew ? 'Add new event' : 'Update event';
            const dialogRef: MatDialogRef<any> = this.dialog.open(NgxEventsPopupComponent, {
              width: '720px',
              height: '600px',
              disableClose: true,
              data: {
                title: title,
                payload: data,
                isNew: isNew,
                types: responses[0].data.eventClassTypes,
                categories: responses[1].data.eventClassCategories,
                profiles: responses[2].data.profiles
              }
            });
            dialogRef.afterClosed()
              .subscribe(res => {
                if (! res) {
                  return;
                }
                if (isNew) {
                  this.openImagesPopUp(res, true);
                } else {
                  this.getPackages();
                }
              });
          }
        });
    }
  }

  openImagesPopUp (data: any = {}, isNew?) {
    this.loader.open('Please Wait');
    this.eventsService.getEvent(data.id).subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          data = responseBuilder.data.EventClass;
          this.loader.close();
          const title = isNew ? 'Add new \"' + data.title + '\" images' : 'Update \"' + data.title + '\" images';
          const dialogRef: MatDialogRef<any> = this.dialog.open(NgxEventImagesPopupComponent, {
            disableClose: true,
            data: {
              title: title,
              payload: data,
              isNew: isNew
            }
          });
          dialogRef.afterClosed()
            .subscribe(res => {
              if (! res) {
                return;
              }
              if (isNew) {
                this.getPackages();
              }
            });
        }
      }
    );
  }

  openDeletePopUp (id) {
    this.confirmService.confirm(
      {message: 'Are you sure you want to delete this event?'})
      .subscribe(res => {
        if (res) {
          this.loadingIndicator = true;
          this.eventsService.deleteEvent(id).subscribe(
            (responseBuilder) => {
              this.loadingIndicator = false;
              if (responseBuilder.code === + this.apiConfig.SUCCESS) {
                this.getPackages();
                this.snack.open('Event Deleted Successfully', 'OK', {duration: 4000});
              } else {
                this.snack.open('Error', 'OK', {duration: 4000});
              }
            }
          );
        }
      });
  }

  millisecondsToDate (milliseconds) {
    const date = new Date(milliseconds);
    date.setHours(date.getHours() - this.timeGMTPlus);
    return date.getTime();
  }

}
