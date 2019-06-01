import {Routes} from '@angular/router';
import {TemplateDashboardComponent} from './template-dashboard.component';


export const TemplateDashboardRoutes: Routes = [
  {path: '', component: TemplateDashboardComponent, data: {title: 'Dashboard'}}
];
