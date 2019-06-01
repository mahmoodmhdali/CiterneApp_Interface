import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule, MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule,
  MatSlideToggleModule, MatSnackBarModule,
  MatTabsModule, MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {SharedModule} from '../../shared/shared.module';

import {ProfileComponent} from './profile.component';
import {ProfileRoutes} from './profile.routing';
import {TranslateModule} from '@ngx-translate/core';
import {AppLoaderModule} from '../../shared/services/app-loader/app-loader.module';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    ReactiveFormsModule,
    AppLoaderModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxPermissionsModule,
    MatSelectModule,
    RouterModule.forChild(ProfileRoutes)
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule {
}
