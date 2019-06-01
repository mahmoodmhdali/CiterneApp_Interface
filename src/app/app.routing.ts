import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './shared/components/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/services/auth/auth.guard';
import {NgxPermissionsGuard} from 'ngx-permissions';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './views/home/home.module#HomeModule',
    data: {title: 'Choose A Demo'}
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: {title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'templateDashboard',
        loadChildren: './views/template-dashboard/template-dashboard.module#TemplateDashboardModule',
        data: {title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'material',
        loadChildren: './views/material/app-material.module#AppMaterialModule',
        data: {title: 'Material', breadcrumb: 'MATERIAL'}
      },
      {
        path: 'dialogs',
        loadChildren: './views/app-dialogs/app-dialogs.module#AppDialogsModule',
        data: {title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'templateProfile',
        loadChildren: './views/template-profile/template-profile.module#TemplateProfileModule',
        data: {title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule',
        data: {title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'tables',
        loadChildren: './views/tables/tables.module#TablesModule',
        data: {title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'tour',
        loadChildren: './views/app-tour/app-tour.module#AppTourModule',
        data: {title: 'Tour', breadcrumb: 'TOUR'}
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#AppFormsModule',
        data: {title: 'Forms', breadcrumb: 'FORMS'}
      },
      {
        path: 'charts',
        loadChildren: './views/charts/charts.module#AppChartsModule',
        data: {title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'map',
        loadChildren: './views/map/map.module#AppMapModule',
        data: {title: 'Map', breadcrumb: 'MAP'}
      },
      {
        path: 'dragndrop',
        loadChildren: './views/dragndrop/dragndrop.module#DragndropModule',
        data: {title: 'Drag and Drop', breadcrumb: 'DND'}
      },
      {
        path: 'inbox',
        loadChildren: './views/app-inbox/app-inbox.module#AppInboxModule',
        data: {title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'calendar',
        loadChildren: './views/app-calendar/app-calendar.module#AppCalendarModule',
        data: {title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'chat',
        loadChildren: './views/app-chats/app-chats.module#AppChatsModule',
        data: {title: 'Chat', breadcrumb: 'CHAT'}
      },
      {
        path: 'cruds',
        loadChildren: './views/cruds/cruds.module#CrudsModule',
        data: {title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'shop',
        loadChildren: './views/shop/shop.module#ShopModule',
        data: {title: 'Shop', breadcrumb: 'SHOP'}
      },
      {
        path: 'icons',
        loadChildren: './views/mat-icons/mat-icons.module#MatIconsModule',
        data: {
          title: 'Icons', breadcrumb: 'MATICONS'
        }
      },
      {
        path: 'users',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/users/users.module#AppUsersModule',
        data: {
          title: 'Users', breadcrumb: 'USERS', permissions: {
            only: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER', 'COMPANY'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'systemUsers',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/system-users/system-users.module#SystemUsersModule',
        data: {
          title: 'System Users', breadcrumb: 'System Users', permissions: {
            only: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'profiles',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/profiles/profiles.module#ProfilesModule',
        data: {
          title: 'Profiles', breadcrumb: 'Profiles', permissions: {
            only: ['SYSTEM', 'OUR_SYSTEM_USER'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'events',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/events/events.module#EventsModule',
        data: {
          title: 'Events', breadcrumb: 'Events', permissions: {
            only: ['SYSTEM', 'OUR_SYSTEM_USER'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'classes',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/classes/classes.module#ClassesModule',
        data: {
          title: 'Classes', breadcrumb: 'Classes', permissions: {
            only: ['SYSTEM', 'OUR_SYSTEM_USER'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'manageReports',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/manage-reports/manage-report.module#ManageReportModule',
        data: {
          title: 'Reports', breadcrumb: 'Reports', permissions: {
            only: ['OUR_SYSTEM_USER'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'report',
        canActivate: [NgxPermissionsGuard],
        loadChildren: './views/report/report.module#ReportModule',
        data: {
          title: 'Report', breadcrumb: 'REPORT', permissions: {
            only: ['INSTALLER', 'VIEW_REPORTS'],
            redirectTo: '/sessions/accessDenied'
          }
        }
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: {title: 'Profile', breadcrumb: 'PROFILE'}
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

