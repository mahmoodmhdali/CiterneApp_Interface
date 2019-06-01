import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule,
  MatStepperModule, MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {QuillModule} from 'ngx-quill';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {ManageReportsRoutes} from './manage-report.routing';
import {ManageReportComponent} from './manage-report/manage-report.component';
import {TranslateModule} from '@ngx-translate/core';
import {ViewReportsComponent} from './view-reports.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    FlexLayoutModule,
    MatToolbarModule,
    QuillModule,
    NgxDatatableModule,
    FileUploadModule,
    RouterModule.forChild(ManageReportsRoutes)
  ],
  declarations: [ManageReportComponent, ViewReportsComponent]
})
export class ManageReportModule {
}
