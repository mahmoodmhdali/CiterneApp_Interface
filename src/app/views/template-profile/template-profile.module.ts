import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';
import {SharedModule} from '../../shared/shared.module';

import {TemplateProfileComponent} from './template-profile.component';
import {TemplateProfileOverviewComponent} from './template-profile-overview/template-profile-overview.component';
import {TemplateProfileSettingsComponent} from './template-profile-settings/template-profile-settings.component';
import {TemplateProfileBlankComponent} from './template-profile-blank/template-profile-blank.component';
import {TemplateProfileRoutes} from './template-profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
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
    SharedModule,
    RouterModule.forChild(TemplateProfileRoutes)
  ],
  declarations: [TemplateProfileComponent, TemplateProfileOverviewComponent, TemplateProfileSettingsComponent, TemplateProfileBlankComponent]
})
export class TemplateProfileModule {
}
