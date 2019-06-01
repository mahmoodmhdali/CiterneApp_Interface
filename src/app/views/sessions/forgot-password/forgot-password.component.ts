import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatProgressBar, MatSnackBar} from '@angular/material';
import {UserService} from '../../../shared/services/database-services/user.service';
import {ResponseBuilderModel} from '../../../shared/models/ResponseBuilder.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  constructor (private router: Router,
               private userService: UserService,
               private snack: MatSnackBar) {
  }

  ngOnInit () {
  }

  submitEmail () {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
    this.userService.resetPassword(JSON.parse('{"email": "' + this.userEmail + '"}')).subscribe(
      (response: ResponseBuilderModel) => {
        this.snack.dismiss();
        this.snack.open(response.data.success, 'OK', {duration: 4000});
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled = false;
        this.router.navigate(['/sessions/signin']);
      }
    );
  }
}
