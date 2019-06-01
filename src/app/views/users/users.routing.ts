import { Routes } from '@angular/router';

import {AppUsersComponent} from './users.component';


export const AppUsersRoutes: Routes = [
  { path: '', component: AppUsersComponent, data: { title: 'Users' } }
];
