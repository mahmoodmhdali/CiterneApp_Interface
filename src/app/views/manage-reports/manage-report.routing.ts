import {Routes} from '@angular/router';

import {ManageReportComponent} from './manage-report/manage-report.component';
import {ViewReportsComponent} from './view-reports.component';

export const ManageReportsRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'manage',
      component: ManageReportComponent,
      data: {title: 'Manage Report', breadcrumb: 'Manage Report'}
    }, {
      path: '',
      component: ViewReportsComponent,
      data: {title: 'Reports', breadcrumb: 'Reports'}
    }, {
      path: 'manage/:id',
      component: ManageReportComponent,
      data: {title: 'Edit Report', breadcrumb: 'Edit Report'}
    }, {
      path: 'view/:id',
      component: ManageReportComponent,
      data: {title: 'View Report', breadcrumb: 'View Report'}
    }]
  }
];
