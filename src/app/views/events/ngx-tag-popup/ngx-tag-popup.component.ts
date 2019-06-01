import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ngx-tag-popup',
  templateUrl: './ngx-tag-popup.component.html'
})
export class NgxTagPopupComponent implements OnInit {
  public itemForm: FormGroup;
  profiles = [];

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NgxTagPopupComponent>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit () {
    this.profiles = this.data.profiles;
    this.buildItemForm();
  }

  buildItemForm () {
    this.itemForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  submit () {
    this.dialogRef.close(this.itemForm.value.name);
  }
}
