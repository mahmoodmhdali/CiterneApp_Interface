import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {ClassesComponent} from './classes.component';
import {NgxClassesPopupComponent} from './ngx-class-popup/ngx-classes-popup.component';
import {EventsService} from '../../shared/services/database-services/events.service';
import {EventClassTypeService} from '../../shared/services/database-services/eventClassType.service';
import {EventClassCategoryService} from '../../shared/services/database-services/eventClassCategory.service';
import {ProfilesService} from '../../shared/services/database-services/profiles.service';
import {OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {ClassesRoutes} from './classes.routing';
import {NgxClassImagesPopupComponent} from './ngx-class-images-popup/ngx-class-images-popup.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    SharedModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(ClassesRoutes)
  ],
  declarations: [ClassesComponent, NgxClassesPopupComponent, NgxClassImagesPopupComponent],
  providers: [EventsService, EventClassTypeService, EventClassCategoryService, ProfilesService],
  entryComponents: [NgxClassesPopupComponent, NgxClassImagesPopupComponent]
})
export class ClassesModule {
}
