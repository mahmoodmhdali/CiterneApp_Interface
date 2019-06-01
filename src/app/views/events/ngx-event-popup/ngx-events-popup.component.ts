import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {EventsService} from '../../../shared/services/database-services/events.service';
import {NgxTagPopupComponent} from '../ngx-tag-popup/ngx-tag-popup.component';

@Component({
  selector: 'app-ngx-events-popup',
  templateUrl: './ngx-events-popup.component.html'
})
export class NgxEventsPopupComponent implements OnInit, AfterViewInit {
  public itemForm: FormGroup;
  disableButton = false;
  apiConfig;
  formIsSubmitted = false;
  categories;
  types;
  profiles;
  profileCollection: FormControl;
  eventClassCastAndCreditsExists = true;
  eventClassSchedulesExists = true;
  eventClassMediasExists = true;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxEventsPopupComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private svcGlobal: GlobalService,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef,
    private snack: MatSnackBar) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  get eventClassCastAndCredits () {
    return this.itemForm.get('eventClassCastAndCredits') as FormArray;
  }

  get eventClassMedias () {
    return this.itemForm.get('eventClassMedias') as FormArray;
  }

  get eventClassSchedules () {
    return this.itemForm.get('eventClassSchedules') as FormArray;
  }

  ngOnInit () {
    this.categories = this.data.categories;
    this.types = this.data.types;
    this.profiles = this.data.profiles;
    this.buildItemForm(this.data.payload);
  }

  ngAfterViewInit () {
    this.cdr.detectChanges();
  }

  buildItemForm (item) {
    this.itemForm = this.fb.group({
      id: [item.id || ''],
      title: [item.title || '', Validators.required],
      ticketingURL: [item.ticketingURL || ''],
      eventIndex: [item.eventIndex || '', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]],
      eventClassCategory: [item.eventClassCategory ? item.eventClassCategory.id : '' || '', Validators.required],
      duration: [item.duration || '', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]],
      about: [item.about || '', Validators.required],
      eventClassCastAndCredits: this.fb.array([]),
      eventClassSchedules: this.fb.array([]),
      eventClassMedias: this.fb.array([]),
      dateFrom: [item.dateFrom || '']
    });
    const profilesIds = [];
    if (item.profileCollection) {
      for (const profile of item.profileCollection) {
        profilesIds.push(profile.id);
      }
    }
    this.profileCollection = new FormControl(profilesIds, Validators.required);
    this.itemForm.addControl('profileCollection', this.profileCollection);
    if (item.eventClassCastAndCredits) {
      console.log(item.eventClassCastAndCredits);
      for (const castAndCredit of item.eventClassCastAndCredits) {
        this.addEventClassCastAndCredits(castAndCredit.title, castAndCredit.description, castAndCredit.index, false);
      }
    }
    if (item.eventClassMedias) {
      for (const media of item.eventClassMedias) {
        this.addEventClassMedias(media.name, media.path, false);
      }
    }
    if (item.eventClassSchedules) {
      for (const schedule of item.eventClassSchedules) {
        this.addEventClassSchedules(new Date(schedule.showDateTime), false);
      }
    }
  }

  addEventClassCastAndCredits (titleValue, descriptionValue, indexValue, changeState) {
    if (changeState) {
      this.eventClassCastAndCreditsExists = true;
    }
    this.eventClassCastAndCredits.push(this.fb.group({
      title: [titleValue, Validators.required],
      description: [descriptionValue, Validators.required],
      index: [indexValue, [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]]
    }));
  }

  deleteEventClassCastAndCredits (index) {
    this.eventClassCastAndCredits.removeAt(index);
  }

  addEventClassMedias (nameValue, pathValue, changeState) {
    if (changeState) {
      this.eventClassMediasExists = true;
    }
    this.eventClassMedias.push(this.fb.group({
      name: [nameValue, Validators.required],
      path: [pathValue, Validators.required]
    }));
  }

  deleteEventClassMedias (index) {
    this.eventClassMedias.removeAt(index);
  }

  addEventClassSchedules (showDateTimeValue, changeState) {
    if (changeState) {
      this.eventClassSchedulesExists = true;
    }
    this.eventClassSchedules.push(this.fb.group({showDateTime: [showDateTimeValue, Validators.required]}));
  }

  deleteEventClassSchedules (index) {
    this.eventClassSchedules.removeAt(index);
  }

  submit () {
    this.disableButton = true;
    const data = this.itemForm.value;
    // this.eventClassCastAndCreditsExists = true;
    // this.eventClassSchedulesExists = true;
    // this.eventClassMediasExists = true;
    // if (data.eventClassCastAndCredits.length <= 0 || data.eventClassSchedules.length <= 0 || data.eventClassMedias.length <= 0) {
    if (data.eventClassSchedules.length <= 0) {
      // if (data.eventClassCastAndCredits.length <= 0) {
      //   this.eventClassCastAndCreditsExists = false;
      // }
      // if (data.eventClassMedias.length <= 0) {
      //   this.eventClassMediasExists = false;
      // }
      if (data.eventClassSchedules.length <= 0) {
        this.eventClassSchedulesExists = false;
      }
      this.disableButton = false;
    } else {
      for (let i = 0; i < data.eventClassSchedules.length; i ++) {
        const newDate = new Date(data.eventClassSchedules[i].showDateTime);
        newDate.setSeconds(0);
        data.eventClassSchedules[i].showDateTime = newDate;
      }
      data.eventClassType = 1;
      if (this.data.isNew) {
        this.eventsService.addEvent(data).subscribe(
          (responseBuilder: ResponseBuilderModel) => {
            this.disableButton = false;
            if (responseBuilder.code === + this.apiConfig.SUCCESS) {
              this.formIsSubmitted = true;
              this.dialogRef.close(responseBuilder.data.eventClass);
              this.snack.open('Event Added Successfully', 'OK', {duration: 4000});
            } else if (responseBuilder.code === + this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
              this.svcGlobal.checkValidationResults(this.itemForm, responseBuilder.data);
            } else {
              this.snack.open('Error', 'OK', {duration: 4000});
            }
          }
        );
      } else {
        this.eventsService.editEvent(data).subscribe(
          (responseBuilder: ResponseBuilderModel) => {
            this.disableButton = false;
            if (responseBuilder.code === + this.apiConfig.SUCCESS) {
              this.formIsSubmitted = true;
              this.dialogRef.close(responseBuilder.data);
              this.snack.open('Event Updated Successfully', 'OK', {duration: 4000});
            } else if (responseBuilder.code === + this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
              this.svcGlobal.checkValidationResults(this.itemForm, responseBuilder.data);
            } else {
              this.snack.open('Error', 'OK', {duration: 4000});
            }
          }
        );
      }
    }
  }

  clearDate (index) {
    (<FormGroup> this.itemForm.controls['eventClassSchedules'].get(index.toString())).controls['showDateTime']
      .reset('', Validators.required);
  }

  tagProfile (index) {
    const title = 'Tag Profile';
    const dialogRef: MatDialogRef<any> = this.dialog.open(NgxTagPopupComponent, {
      disableClose: true,
      data: {
        title: title,
        profiles: this.profiles
      }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (! res) {
          return;
        }
        (<FormGroup> this.itemForm.controls['eventClassCastAndCredits'].get(index.toString())).controls['description']
          .setValue(this.itemForm.value.eventClassCastAndCredits[index].description + ' ~' + res + '~ ');
      });
  }

  canDeactivate (): boolean {
    return this.formIsSubmitted || ! this.itemForm.dirty;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification () {
    if (! this.canDeactivate()) {
      return confirm('You have unsaved changes! If you leave, your changes will be lost.');
    }
    return true;
  }

  closeDialog () {
    if (! this.canDeactivate()) {
      const userApproval = confirm('You have unsaved changes! If you leave, your changes will be lost.');
      if (userApproval) {
        this.dialogRef.close(false);
      }
      return true;
    }
    this.dialogRef.close(false);
  }

}
