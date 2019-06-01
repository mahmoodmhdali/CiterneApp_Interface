import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatStepperModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {QuillModule} from 'ngx-quill';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ReportRouting} from './report.routing';
import {ReportComponent} from './report.component';
import {ChartsModule} from 'ng2-charts';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatButtonModule,
    NgxPermissionsModule,
    MatIconModule,
    MatStepperModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    QuillModule,
    NgxDatatableModule,
    FileUploadModule,
    ChartsModule,
    RouterModule.forChild(ReportRouting)
  ],
  declarations: [ReportComponent],
  entryComponents: []
})
export class ReportModule {
}
