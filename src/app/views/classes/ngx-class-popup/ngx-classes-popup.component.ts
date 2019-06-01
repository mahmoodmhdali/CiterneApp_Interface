import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {EventsService} from '../../../shared/services/database-services/events.service';

@Component({
  selector: 'app-ngx-classes-popup',
  templateUrl: './ngx-classes-popup.component.html'
})
export class NgxClassesPopupComponent implements OnInit, AfterViewInit {
  public itemForm: FormGroup;
  disableButton = false;
  apiConfig;
  formIsSubmitted = false;
  categories;
  types;
  profiles;
  profileCollection: FormControl;
  eventClassSchedulesExists = true;
  days = [{name: 'Monday', value: 1},
    {name: 'Tuesday', value: 2},
    {name: 'Wednesday', value: 3},
    {name: 'Thursday', value: 4},
    {name: 'Friday', value: 5},
    {name: 'Saturday', value: 6},
    {name: 'Sunday', value: 7}];

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxClassesPopupComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private svcGlobal: GlobalService,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef,
    private snack: MatSnackBar) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
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
      eventIndex: [item.eventIndex || '', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]],
      ticketingURL: [item.ticketingURL || ''],
      eventClassCategory: [item.eventClassCategory ? item.eventClassCategory.id : '' || '', Validators.required],
      numberOfParticipants: [item.numberOfParticipants || '', [Validators.required, Validators.pattern(/^[0-9]{1,6}$/)]],
      about: [item.about || '', Validators.required],
      eventClassSchedules: this.fb.array([]),
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
    if (item.eventClassSchedules) {
      for (const schedule of item.eventClassSchedules) {
        this.addEventClassSchedules(schedule.classDayIndex, new Date(schedule.time), false);
      }
    }
  }

  addEventClassSchedules (classDayIndexValue, timeValue, changeState) {
    if (changeState) {
      this.eventClassSchedulesExists = true;
    }
    this.eventClassSchedules.push(this.fb.group({
      classDayIndex: [classDayIndexValue, Validators.required],
      time: [timeValue, Validators.required]
    }));
  }

  deleteEventClassSchedules (index) {
    this.eventClassSchedules.removeAt(index);
  }

  submit () {
    this.disableButton = true;
    const data = this.itemForm.value;
    if (data.eventClassSchedules.length <= 0) {
      if (data.eventClassSchedules.length <= 0) {
        this.eventClassSchedulesExists = false;
      }
      this.disableButton = false;
    } else {
      for (let i = 0; i < data.eventClassSchedules.length; i ++) {
        const newDate = new Date(data.eventClassSchedules[i].time);
        newDate.setSeconds(0);
        data.eventClassSchedules[i].time = newDate;
      }
      data.eventClassType = 2;
      if (this.data.isNew) {
        this.eventsService.addEvent(data).subscribe(
          (responseBuilder: ResponseBuilderModel) => {
            this.disableButton = false;
            if (responseBuilder.code === + this.apiConfig.SUCCESS) {
              this.formIsSubmitted = true;
              this.dialogRef.close(responseBuilder.data.eventClass);
              this.snack.open('Class Added Successfully', 'OK', {duration: 4000});
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
              this.snack.open('Class Updated Successfully', 'OK', {duration: 4000});
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
    (<FormGroup> this.itemForm.controls['eventClassSchedules'].get(index.toString())).controls['time']
      .reset('', Validators.required);
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
