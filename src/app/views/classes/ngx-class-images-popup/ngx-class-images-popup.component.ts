import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {EventsService} from '../../../shared/services/database-services/events.service';
import {AppConfirmService} from '../../../shared/services/app-confirm/app-confirm.service';

@Component({
  selector: 'app-ngx-event-images-popup',
  templateUrl: './ngx-class-images-popup.component.html'
})
export class NgxClassImagesPopupComponent implements OnInit, AfterViewInit {
  public itemForm: FormGroup;
  disableButton = false;
  apiConfig;
  formIsSubmitted = false;
  @ViewChild('fileInput1')
  fileInput1: ElementRef;
  @ViewChild('fileInput2')
  fileInput2: ElementRef;
  @ViewChild('fileInput3')
  fileInput3: ElementRef;
  @ViewChild('fileInput4')
  fileInput4: ElementRef;
  fileList1 = [];
  fileList2 = [];
  fileList3 = [];
  fileList4 = [];
  imageName1 = '';
  imageName2 = '';
  imageName3 = '';
  imageName4 = '';
  isUploading = false;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxClassImagesPopupComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private svcGlobal: GlobalService,
    private eventsService: EventsService,
    private cdr: ChangeDetectorRef,
    private confirmService: AppConfirmService,
    private snack: MatSnackBar) {
    this.apiConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit () {
    this.buildItemForm(this.data.payload);
  }

  ngAfterViewInit () {
    this.cdr.detectChanges();
  }

  buildItemForm (item) {
    this.itemForm = this.fb.group({
      id: [item.id || '']
    });
    const index1: number = item.eventClassImages !== undefined ? item.eventClassImages.indexOf(
      item.eventClassImages.find(image => image.imageIndex === 1)) : - 1;
    this.itemForm.addControl('imageName1', new FormControl(index1 < 0 ?
      '' : item.eventClassImages[index1].fileName || '', Validators.required));
    const index2: number = item.eventClassImages !== undefined ? item.eventClassImages.indexOf(
      item.eventClassImages.find(image => image.imageIndex === 2)) : - 1;
    this.itemForm.addControl('imageName2', new FormControl(index2 < 0 ?
      '' : item.eventClassImages[index2].fileName || ''));
    const index3: number = item.eventClassImages !== undefined ? item.eventClassImages.indexOf(
      item.eventClassImages.find(image => image.imageIndex === 3)) : - 1;
    this.itemForm.addControl('imageName3', new FormControl(index3 < 0 ?
      '' : item.eventClassImages[index3].fileName || ''));
    const index4: number = item.eventClassImages !== undefined ? item.eventClassImages.indexOf(
      item.eventClassImages.find(image => image.imageIndex === 4)) : - 1;
    this.itemForm.addControl('imageName4', new FormControl(index4 < 0 ?
      '' : item.eventClassImages[index4].fileName || ''));
  }

  submit () {
    this.isUploading = true;
    this.disableButton = true;
    const data = this.itemForm.value;
    const formData: FormData = new FormData();
    if (this.fileList1.length > 0) {
      const file: File = this.fileList1[0];
      formData.append('uploadFile1', file, file.name);
    }
    if (this.fileList2.length > 0) {
      const file: File = this.fileList2[0];
      formData.append('uploadFile2', file, file.name);
    }
    if (this.fileList3.length > 0) {
      const file: File = this.fileList3[0];
      formData.append('uploadFile3', file, file.name);
    }
    if (this.fileList4.length > 0) {
      const file: File = this.fileList4[0];
      formData.append('uploadFile4', file, file.name);
    }
    formData.append('info', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    this.eventsService.editImages(formData).subscribe(
      (responseBuilder: ResponseBuilderModel) => {
        this.disableButton = false;
        this.isUploading = false;
        if (responseBuilder.code === + this.apiConfig.SUCCESS) {
          this.formIsSubmitted = true;
          this.dialogRef.close(responseBuilder.data);
          this.snack.open('Class Images Updated Successfully', 'OK', {duration: 4000});
        } else if (responseBuilder.code === + this.apiConfig.PARAMETERS_VALIDATION_ERROR) {
          this.svcGlobal.checkValidationResults(this.itemForm, responseBuilder.data);
        } else {
          this.snack.open('Error', 'OK', {duration: 4000});
        }
      }
    );
  }

  image1FileChange (e) {
    this.disableButton = false;
    this.fileList1 = e.target.files;
    if (e.target.files.length === 0) {
      const index1: number = this.data.payload.eventClassImages !== undefined ?
        this.data.payload.eventClassImages.indexOf(
          this.data.payload.eventClassImages.find(image => image.imageIndex === 1)) : - 1;
      this.itemForm.controls['imageName1'].setValue(index1 < 0 ?
        '' : this.data.payload.eventClassImages[index1].fileName || '');
    } else {
      this.itemForm.controls['imageName1'].setValue(e.target.files[0].name);
      this.imageName1 = e.target.files[0].name;
    }
  }

  image2FileChange (e) {
    this.disableButton = false;
    this.fileList2 = e.target.files;
    if (e.target.files.length === 0) {
      const index2: number = this.data.payload.eventClassImages !== undefined ?
        this.data.payload.eventClassImages.indexOf(
          this.data.payload.eventClassImages.find(image => image.imageIndex === 2)) : - 1;
      this.itemForm.controls['imageName2'].setValue(index2 < 0 ?
        '' : this.data.payload.eventClassImages[index2].fileName || '');
    } else {
      this.itemForm.controls['imageName2'].setValue(e.target.files[0].name);
      this.imageName2 = e.target.files[0].name;
    }
  }

  image3FileChange (e) {
    this.disableButton = false;
    this.fileList3 = e.target.files;
    if (e.target.files.length === 0) {
      const index3: number = this.data.payload.eventClassImages !== undefined ?
        this.data.payload.eventClassImages.indexOf(
          this.data.payload.eventClassImages.find(image => image.imageIndex === 3)) : - 1;
      this.itemForm.controls['imageName3'].setValue(index3 < 0 ?
        '' : this.data.payload.eventClassImages[index3].fileName || '');
    } else {
      this.itemForm.controls['imageName3'].setValue(e.target.files[0].name);
      this.imageName3 = e.target.files[0].name;
    }
  }

  image4FileChange (e) {
    this.disableButton = false;
    this.fileList4 = e.target.files;
    if (e.target.files.length === 0) {
      const index4: number = this.data.payload.eventClassImages !== undefined ?
        this.data.payload.eventClassImages.indexOf(
          this.data.payload.eventClassImages.find(image => image.imageIndex === 4)) : - 1;
      this.itemForm.controls['imageName4'].setValue(index4 < 0 ?
        '' : this.data.payload.eventClassImages[index4].fileName || '');
    } else {
      this.itemForm.controls['imageName4'].setValue(e.target.files[0].name);
      this.imageName4 = e.target.files[0].name;
    }
  }

  removeImage (imageIndex) {
    this.itemForm.controls['imageName' + imageIndex].setValue('');
    if (imageIndex === 1) {
      this.fileInput1.nativeElement.value = '';
    } else if (imageIndex === 2) {
      this.fileInput2.nativeElement.value = '';
    } else if (imageIndex === 3) {
      this.fileInput3.nativeElement.value = '';
    } else if (imageIndex === 4) {
      this.fileInput4.nativeElement.value = '';
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
        if (this.data.isNew) {
          this.confirmService.confirm(
            {message: 'WARNING: Class will not be visible in application. You should at least upload the main image. Are you sure you want to close?'})
            .subscribe(res => {
              if (res) {
                this.dialogRef.close(false);
              }
            });
        } else {
          this.dialogRef.close(false);
        }
      }
      return true;
    }
    if (this.data.isNew) {
      this.confirmService.confirm(
        {message: 'WARNING: Event will not be visible in application. You should at least upload the main image. Are you sure you want to close?'})
        .subscribe(res => {
          if (res) {
            this.dialogRef.close(false);
          }
        });
    } else {
      this.dialogRef.close(false);
    }
  }

}
