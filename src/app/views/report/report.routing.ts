import {Routes} from '@angular/router';
import {ReportComponent} from './report.component';

export const ReportRouting: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {title: 'Report', breadcrumb: 'REPORT'}
  }
];
