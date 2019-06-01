import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatProgressBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    const newPassword = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(newPassword));

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return {agreed: true};
        }
        return null;
      })
    });
  }

  signup() {
    const signupData = this.signupForm.value;

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}
