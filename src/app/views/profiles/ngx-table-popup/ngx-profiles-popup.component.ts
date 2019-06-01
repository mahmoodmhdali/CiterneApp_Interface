import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {ProfilesService} from '../../../shared/services/database-services/profiles.service';

@Component({
  selector: 'app-ngx-profiles-popup',
  templateUrl: './ngx-profiles-popup.component.html'
})
export class NgxProfilesPopupComponent implements OnInit {
  @ViewChild('fileInput1')
  fileInput1: ElementRef;
  public itemForm: FormGroup;
  disableButton = false;
  apiConfig;
  formIsSubmitted = false;
  fileList1 = [];
  imageName1 = '';

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxProfilesPopupComponent>,
    private fb: FormBuilder,
    private svcGlobal: GlobalService,
    private profilesService: ProfilesService,
    private snack: MatSnackBar) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  get profileMedias () {
    return this.itemForm.get('profileMedias') as FormArray;
  }

  ngOnInit () {
    this.buildItemForm(this.data.payload);
  }

  buildItemForm (item) {
    if (this.data.isNew) {
      this.itemForm = this.fb.group({
        id: [item.id || ''],
        name: [item.name || '', Validators.required],
        imageName1: [item.fileName || ''],
        about: [item.about || '', Validators.required],
        profileMedias: this.fb.array([])
      });
    } else {
      this.itemForm = this.fb.group({
        id: [item.id || ''],
        name: [{value: item.name || '', disabled: true}],
        imageName1: [item.fileName || ''],
        about: [item.about || '', Validators.required],
        profileMedias: this.fb.array([])
      });
    }
    if (item && item.profileMedias) {
      for (const profileMedia of item.profileMedias) {
        this.addProfileMedias(profileMedia.name, profileMedia.path);
      }
    }
  }

  addProfileMedias (nameValue, pathValue) {
    this.profileMedias.push(this.fb.group({name: nameValue, path: pathValue}));
  }

  deleteProfileMedias (index) {
    this.profileMedias.removeAt(index);
  }

  submit () {
    this.disableButton = true;
    const data = this.itemForm.value;
    const formData: FormData = new FormData();
    if (this.fileList1.length > 0) {
      const file: File = this.fileList1[0];
      formData.append('uploadFile1', file, file.name);
    }
    formData.append('info', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    if (this.data.isNew) {
      this.profilesService.addProfile(formData).subscribe(
        (responseBuilder: ResponseBuilderModel) => {
          this.disableButton = false;
          if (responseBuilder.code === + this.apiConfig.SUCCESS) {
            this.formIsSubmitted = true;
            this.dialogRef.close(responseBuilder.data.profile);
            this.snack.open('Profile Added Successfully', 'OK', {duration: 4000});
          } else if (responseBuilder.code === + this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
            this.svcGlobal.checkValidationResults(this.itemForm, responseBuilder.data);
          } else {
            this.snack.open('Error', 'OK', {duration: 4000});
          }
        }
      );
    } else {
      this.profilesService.editProfile(formData).subscribe(
        (responseBuilder: ResponseBuilderModel) => {
          this.disableButton = false;
          if (responseBuilder.code === + this.apiConfig.SUCCESS) {
            this.formIsSubmitted = true;
            this.dialogRef.close(responseBuilder.data.Profile);
            this.snack.open('Profile Updated Successfully', 'OK', {duration: 4000});
          } else if (responseBuilder.code === + this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
            this.svcGlobal.checkValidationResults(this.itemForm, responseBuilder.data);
          } else {
            this.snack.open('Error', 'OK', {duration: 4000});
          }
        }
      );
    }
  }

  image1FileChange (e) {
    this.disableButton = false;
    this.fileList1 = e.target.files;
    if (e.target.files.length === 0) {
      this.itemForm.controls['imageName1'].setValue(this.data.payload.fileName || '');
    } else {
      this.itemForm.controls['imageName1'].setValue(e.target.files[0].name);
      this.imageName1 = e.target.files[0].name;
    }
  }

  removeImage (imageIndex) {
    this.itemForm.controls['imageName' + imageIndex].setValue('');
    if (imageIndex === 1) {
      this.fileInput1.nativeElement.value = '';
    }
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
