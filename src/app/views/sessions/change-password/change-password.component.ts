import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatProgressBar, MatSnackBar, MatSnackBarRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {LogsService} from '../../../shared/services/logs.service';
import {NavigationService} from '../../../shared/services/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/database-services/user.service';
import {CustomValidators} from 'ng2-validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  signinForm: FormGroup;
  error = '';
  responseCodeConfig;
  public hasIconTypeMenuItem: boolean;
  token = '';
  hidePassword = true;
  hideConfirmPassword = true;

  constructor (private router: Router,
               private authService: AuthService,
               private svcGlobal: GlobalService,
               private logsService: LogsService,
               private navService: NavigationService,
               private snack: MatSnackBar,
               private userService: UserService,
               private activatedRoute: ActivatedRoute) {
    this.responseCodeConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit () {
    this.signinForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

    // const newPassword = new FormControl('', Validators.required);
    // const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(newPassword)]);
    // this.signinForm.addControl('newPassword', newPassword);
    // this.signinForm.addControl('confirmPassword', confirmPassword);



    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.userService.getUserByToken(this.token).subscribe(
          (response: ResponseBuilderModel) => {
            if (response.code === + this.responseCodeConfig.SUCCESS) {
              if (! response.data.user) {
                this.router.navigate(['/sessions/signin']);
                this.snack.open('Link has been expired', 'OK', {duration: 4000});
              }
            } else {
              this.router.navigate(['/sessions/signin']);
              this.snack.open('Link has been expired', 'OK', {duration: 4000});
            }
          }
        );
      } else {
        this.router.navigate(['/sessions/signin']);
      }
    });
  }

  signin () {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.userService.changePasswordByToken(this.token, signinData).subscribe(
      (response: ResponseBuilderModel) => {
        if (response.code === + this.responseCodeConfig.SUCCESS) {
          this.authService.signOut();
          this.snack.open('Password Changed Successfully', 'OK', {duration: 4000});
        } else if (response.code === + this.responseCodeConfig.PARAMETERS_VALIDATION_ERROR) {
          this.svcGlobal.checkValidationResults(this.signinForm, response.data);
        } else {
          this.router.navigate(['/sessions/signin']);
          this.snack.open('Link has been expired', 'OK', {duration: 4000});
        }
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled = false;
      }
    );
  }

}
