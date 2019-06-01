import { Routes } from '@angular/router';

import {SystemUsersComponent} from './system-users.component';


export const AppSystemUsersRoutes: Routes = [
  { path: '', component: SystemUsersComponent, data: { title: 'System Users' } }
];
