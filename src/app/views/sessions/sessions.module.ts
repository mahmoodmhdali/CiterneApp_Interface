import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {CountdownSnackbarComponent, SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {SessionsRoutes} from './sessions.routing';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  entryComponents: [
    CountdownSnackbarComponent
  ],
  declarations: [ForgotPasswordComponent, LockscreenComponent, SigninComponent, SignupComponent,
    NotFoundComponent, ErrorComponent, AccessDeniedComponent, CountdownSnackbarComponent,
  ChangePasswordComponent]
})
export class SessionsModule {
}
