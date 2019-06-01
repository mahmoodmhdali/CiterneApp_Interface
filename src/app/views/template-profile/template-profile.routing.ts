import {Routes} from '@angular/router';

import {TemplateProfileComponent} from './template-profile.component';
import {TemplateProfileOverviewComponent} from './template-profile-overview/template-profile-overview.component';
import {TemplateProfileSettingsComponent} from './template-profile-settings/template-profile-settings.component';
import {TemplateProfileBlankComponent} from './template-profile-blank/template-profile-blank.component';

export const TemplateProfileRoutes: Routes = [
  {
    path: '',
    component: TemplateProfileComponent,
    children: [{
      path: 'overview',
      component: TemplateProfileOverviewComponent,
      data: {title: 'Overview', breadcrumb: 'OVERVIEW'}
    },
      {
        path: 'settings',
        component: TemplateProfileSettingsComponent,
        data: {title: 'Settings', breadcrumb: 'SETTINGS'}
      },
      {
        path: 'blank',
        component: TemplateProfileBlankComponent,
        data: {title: 'Blank', breadcrumb: 'BLANK'}
      }]
  }
];
