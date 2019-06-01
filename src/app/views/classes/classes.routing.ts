import {Routes} from '@angular/router';
import {ClassesComponent} from './classes.component';

export const ClassesRoutes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    data: {title: 'Classes', breadcrumb: 'Classes'}
  }
];
