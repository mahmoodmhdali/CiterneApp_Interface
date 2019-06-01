import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatProgressBar, MatSnackBar, MatSnackBarRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth/auth.service';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {GlobalService} from '../../../shared/services/global.service';
import {UserProfileModel} from '../../../shared/models/UserProfile.model';
import {LogsService} from '../../../shared/services/logs.service';
import {Subscription} from 'rxjs/Subscription';
import {NavigationService} from '../../../shared/services/navigation.service';
import {CountdownService} from '../../../shared/services/countdown.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  signinForm: FormGroup;
  error = '';
  responseCodeConfig;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  private menuItemsSub: Subscription;

  constructor(private authService: AuthService,
              private svcGlobal: GlobalService,
              private logsService: LogsService,
              private navService: NavigationService,
              private snack: MatSnackBar,
              private countdown: CountdownService) {
    this.responseCodeConfig = this.svcGlobal.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const loggedInUser = this.svcGlobal.getSession('loggedInUser');
      this.authService.loadPermissionsBasedOnLoggedInUser(loggedInUser);
      this.authService.navigationBasedOnRoles();
    }
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
    const parameterValue = localStorage.getItem(btoa('error'));
    if (typeof parameterValue === 'undefined') {
      this.error = parameterValue !== null ? JSON.parse(parameterValue) : '';
      setTimeout(() => {
          if (this.error !== '') {
            this.snack.open(this.error, 'OK', {duration: 4000});
          }
        }
      );
    }
    localStorage.removeItem(btoa('error'));
  }

  signin() {
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.authService.signInUser(signinData.username, signinData.password, signinData.rememberMe).subscribe(
      (response: ResponseBuilderModel) => {
        this.snack.dismiss();
        const that = this;
        setTimeout(function () {
          that.logsService.setLog('ChangePasswordComponent', 'signin', response);
          if (response.code === +that.responseCodeConfig.SUCCESS) {
            const loggedInUser: UserProfileModel = response.data.user;
            that.svcGlobal.setSession('loggedInUser', loggedInUser);
            that.authService.loadPermissionsBasedOnLoggedInUser(loggedInUser);
            that.authService.navigationBasedOnRoles();
          } else if (response.code === +that.responseCodeConfig.UNAUTHORIZED_USER_ACTION) {
            that.snack.open(response.description, 'OK', {duration: 4000});
          } else if (response.code === +that.responseCodeConfig.ALERT) {
            const duration = ((+response.data.remaining) * 1000) - 300 + 1;
            that.countdown.setLockedFor(+response.data.lockedDeuration);
            that.snack.openFromComponent(CountdownSnackbarComponent, {duration});
            that.countdown.start(duration);
          }
          that.progressBar.mode = 'determinate';
          that.submitButton.disabled = false;
        }, 300);
      }
    );
  }

}

@Component({
  selector: 'app-countdown-snackbar',
  template: '<div class="mat-simple-snackbar ng-tns-c8-10 ng-trigger ng-trigger-contentFade ng-star-inserted">' +
  'Your account has been locked for {{ lockedFor }} ' +
  'minutes due to multiple failed login attempts ' +
  '(Try after {{ timeLeft$ | async }} seconds) ' +
  '<button class="mat-simple-snackbar-action ng-tns-c8-13 ng-star-inserted" (click)="close()" style="">OK</button></div>'
})
export class CountdownSnackbarComponent {

  timeLeft$ = this.countdown.timeLeft();
  lockedFor = this.countdown.getLockedFor();

  constructor(private countdown: CountdownService, private snackBarRef: MatSnackBarRef<CountdownSnackbarComponent>) {
  }

  close() {
    this.snackBarRef.dismiss();
  }

}
