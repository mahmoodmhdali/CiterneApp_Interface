import {Routes} from '@angular/router';
import {ProfilesComponent} from './profiles.component';

export const PackagesRoutes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    data: {title: 'Profiles', breadcrumb: 'Profiles'}
  }
];
