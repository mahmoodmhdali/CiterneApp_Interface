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
import {EventsComponent} from './events.component';
import {NgxEventsPopupComponent} from './ngx-event-popup/ngx-events-popup.component';
import {EventsRoutes} from './events.routing';
import {EventsService} from '../../shared/services/database-services/events.service';
import {EventClassTypeService} from '../../shared/services/database-services/eventClassType.service';
import {EventClassCategoryService} from '../../shared/services/database-services/eventClassCategory.service';
import {ProfilesService} from '../../shared/services/database-services/profiles.service';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {NgxTagPopupComponent} from './ngx-tag-popup/ngx-tag-popup.component';
import {NgxEventImagesPopupComponent} from './ngx-event-images-popup/ngx-event-images-popup.component';

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
    MatProgressSpinnerModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(EventsRoutes)
  ],
  declarations: [EventsComponent, NgxEventsPopupComponent, NgxTagPopupComponent, NgxEventImagesPopupComponent],
  providers: [EventsService, EventClassTypeService, EventClassCategoryService, ProfilesService],
  entryComponents: [NgxEventsPopupComponent, NgxTagPopupComponent, NgxEventImagesPopupComponent]
})
export class EventsModule {
}
