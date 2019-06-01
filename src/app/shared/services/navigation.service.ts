import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {NgxPermissionsService} from 'ngx-permissions';

interface IMenuItem {
  type: string;       // Possible values: link/dropDown/icon/separator/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  roles?: string[];   // Array of roles
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}

interface IChildItem {
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  roles?: string[];   // Array of roles
  sub?: IChildItem[];
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  defaultMenu: IMenuItem[] = [
    {
      name: 'REPORT',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'report',
      roles: ['SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'Manage Reports',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'manageReports',
      roles: ['INSTALLER']
    },
    {
      name: 'Manage Reports',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'manageReports',
      roles: ['INSTALLER']
    }, {
      name: 'System Users',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'systemUsers',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'USERS',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'users',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Profiles',
      type: 'link',
      tooltip: 'Classes/Events',
      icon: 'face',
      state: 'profiles',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Events',
      type: 'link',
      tooltip: 'Events',
      icon: 'event_seat',
      state: 'events',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Classes',
      type: 'link',
      tooltip: 'Classes',
      icon: 'accessibility',
      state: 'classes',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'templateDashboard',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'INBOX',
      type: 'link',
      tooltip: 'Inbox',
      icon: 'inbox',
      state: 'inbox',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CHAT',
      type: 'link',
      tooltip: 'Chat',
      icon: 'chat',
      state: 'chat',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CRUD Table',
      type: 'link',
      tooltip: 'CRUD Table',
      icon: 'format_list_bulleted',
      state: 'cruds/ngx-table',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      tooltip: 'Shop',
      icon: 'shopping_cart',
      state: 'shop',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'PRODUCTS', state: ''},
        {name: 'PRODUCT DETAILS', state: 'products/5a9ae2106f155194e5c95d67'},
        {name: 'CART', state: 'cart'},
        {name: 'CHECKOUT', state: 'checkout'}
      ]
    },
    {
      name: 'CALENDAR',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'date_range',
      state: 'calendar',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      state: 'dialogs',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'CONFIRM', state: 'confirm'},
        {name: 'LOADER', state: 'loader'},
      ]
    },
    {
      name: 'MATERIAL',
      type: 'dropDown',
      tooltip: 'Material',
      icon: 'favorite',
      state: 'material',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BUTTONS', state: 'buttons'},
        {name: 'CARDS', state: 'cards'},
        {name: 'GRIDS', state: 'grids'},
        {name: 'LISTS', state: 'lists'},
        {name: 'MENU', state: 'menu'},
        {name: 'TABS', state: 'tabs'},
        {name: 'SELECT', state: 'select'},
        {name: 'RADIO', state: 'radio'},
        {name: 'AUTOCOMPLETE', state: 'autocomplete'},
        {name: 'SLIDER', state: 'slider'},
        {name: 'PROGRESS', state: 'progress'},
        {name: 'SNACKBAR', state: 'snackbar'},
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      tooltip: 'Forms',
      icon: 'description',
      state: 'forms',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BASIC', state: 'basic'},
        {name: 'EDITOR', state: 'editor'},
        {name: 'UPLOAD', state: 'upload'},
        {name: 'WIZARD', state: 'wizard'}
      ]
    },
    {
      name: 'TABLES',
      type: 'dropDown',
      tooltip: 'Tables',
      icon: 'format_line_spacing',
      state: 'tables',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'FULLSCREEN', state: 'fullscreen'},
        {name: 'PAGING', state: 'paging'},
        {name: 'FILTER', state: 'filter'},
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      tooltip: 'Profile',
      icon: 'person',
      state: 'templateProfile',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'OVERVIEW', state: 'overview'},
        {name: 'SETTINGS', state: 'settings'},
        {name: 'BLANK', state: 'blank'},
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'MAP',
      type: 'link',
      tooltip: 'Map',
      icon: 'add_location',
      state: 'map',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CHARTS',
      type: 'link',
      tooltip: 'Charts',
      icon: 'show_chart',
      state: 'charts',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DND',
      type: 'link',
      tooltip: 'Drag and Drop',
      icon: 'adjust',
      state: 'dragndrop',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      state: 'sessions',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'SIGNUP', state: 'signup'},
        {name: 'SIGNIN', state: 'signin'},
        {name: 'FORGOT', state: 'forgot-password'},
        {name: 'LOCKSCREEN', state: 'lockscreen'},
        {name: 'NOTFOUND', state: '404'},
        {name: 'ERROR', state: 'error'}
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      state: 'others',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'GALLERY', state: 'gallery'},
        {name: 'PRICINGS', state: 'pricing'},
        {name: 'USERS', state: 'users'},
        {name: 'BLANK', state: 'blank'},
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      tooltip: 'Material Icons',
      icon: 'store',
      state: 'icons',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DOC',
      type: 'extLink',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'http://egret-doc.mhrafi.com/',
      roles: ['OUR_SYSTEM_USER']
    }
  ];
  separatorMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Citerne App'
    },
    {
      name: 'REPORT',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'report',
      roles: ['SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'Manage Reports',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'manageReports',
      roles: ['INSTALLER']
    }, {
      name: 'System Users',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'systemUsers',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'USERS',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'users',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Profiles',
      type: 'link',
      tooltip: 'Classes/Events',
      icon: 'face',
      state: 'profiles',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Events',
      type: 'link',
      tooltip: 'Events',
      icon: 'event_seat',
      state: 'events',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Classes',
      type: 'link',
      tooltip: 'Classes',
      icon: 'accessibility',
      state: 'classes',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'templateDashboard',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'INBOX',
      type: 'link',
      tooltip: 'Inbox',
      icon: 'inbox',
      state: 'inbox',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CHAT',
      type: 'link',
      tooltip: 'Chat',
      icon: 'chat',
      state: 'chat',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CRUD Table',
      type: 'link',
      tooltip: 'CRUD Table',
      icon: 'format_list_bulleted',
      state: 'cruds/ngx-table',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      tooltip: 'Shop',
      icon: 'shopping_cart',
      state: 'shop',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'PRODUCTS', state: ''},
        {name: 'PRODUCT DETAILS', state: 'products/5a9ae2106f155194e5c95d67'},
        {name: 'CART', state: 'cart'},
        {name: 'CHECKOUT', state: 'checkout'}
      ]
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      state: 'dialogs',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'CONFIRM', state: 'confirm'},
        {name: 'LOADER', state: 'loader'},
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      tooltip: 'Profile',
      icon: 'person',
      state: 'templateProfile',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'OVERVIEW', state: 'overview'},
        {name: 'SETTINGS', state: 'settings'},
        {name: 'BLANK', state: 'blank'},
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour',
      roles: ['OUR_SYSTEM_USER']
    },
    // {
    //   type: 'separator',
    //   name: 'Integrated components'
    // },
    {
      name: 'CALENDAR',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'date_range',
      state: 'calendar',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'MATERIAL',
      type: 'dropDown',
      tooltip: 'Material',
      icon: 'favorite',
      state: 'material',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BUTTONS', state: 'buttons'},
        {name: 'CARDS', state: 'cards'},
        {name: 'GRIDS', state: 'grids'},
        {name: 'LISTS', state: 'lists'},
        {name: 'MENU', state: 'menu'},
        {name: 'TABS', state: 'tabs'},
        {name: 'SELECT', state: 'select'},
        {name: 'RADIO', state: 'radio'},
        {name: 'AUTOCOMPLETE', state: 'autocomplete'},
        {name: 'SLIDER', state: 'slider'},
        {name: 'PROGRESS', state: 'progress'},
        {name: 'SNACKBAR', state: 'snackbar'},
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      tooltip: 'Forms',
      icon: 'description',
      state: 'forms',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BASIC', state: 'basic'},
        {name: 'EDITOR', state: 'editor'},
        {name: 'UPLOAD', state: 'upload'},
        {name: 'WIZARD', state: 'wizard'}
      ]
    },
    {
      name: 'TABLES',
      type: 'dropDown',
      tooltip: 'Tables',
      icon: 'format_line_spacing',
      state: 'tables',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'FULLSCREEN', state: 'fullscreen'},
        {name: 'PAGING', state: 'paging'},
        {name: 'FILTER', state: 'filter'},
      ]
    },
    {
      name: 'MAP',
      type: 'link',
      tooltip: 'Map',
      icon: 'add_location',
      state: 'map',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CHARTS',
      type: 'link',
      tooltip: 'Charts',
      icon: 'show_chart',
      state: 'charts',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DND',
      type: 'link',
      tooltip: 'Drag and Drop',
      icon: 'adjust',
      state: 'dragndrop',
      roles: ['OUR_SYSTEM_USER']
    },
    // {
    //   type: 'separator',
    //   name: 'Other components',
    //   roles: ['OUR_SYSTEM_USER']
    // },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      state: 'sessions',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'SIGNUP', state: 'signup'},
        {name: 'SIGNIN', state: 'signin'},
        {name: 'FORGOT', state: 'forgot-password'},
        {name: 'LOCKSCREEN', state: 'lockscreen'},
        {name: 'NOTFOUND', state: '404'},
        {name: 'ERROR', state: 'error'}
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      state: 'others',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'GALLERY', state: 'gallery'},
        {name: 'PRICINGS', state: 'pricing'},
        {name: 'USERS', state: 'users'},
        {name: 'BLANK', state: 'blank'},
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      tooltip: 'Material Icons',
      icon: 'store',
      state: 'icons',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DOC',
      type: 'extLink',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'http://egret-doc.mhrafi.com/',
      roles: ['OUR_SYSTEM_USER']
    }
  ];
  iconMenu: IMenuItem[] = [
    {
      name: 'REPORT',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'report',
      roles: ['SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'Manage Reports',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'manageReports',
      roles: ['INSTALLER']
    },
    {
      name: 'Manage Reports',
      type: 'link',
      tooltip: 'Dialogs',
      icon: 'find_replace',
      state: 'manageReports',
      roles: ['INSTALLER']
    }, {
      name: 'System Users',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'systemUsers',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'USERS',
      type: 'link',
      tooltip: 'users',
      icon: 'account_box',
      state: 'users',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Profiles',
      type: 'link',
      tooltip: 'Classes/Events',
      icon: 'face',
      state: 'profiles',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Events',
      type: 'link',
      tooltip: 'Events',
      icon: 'event_seat',
      state: 'events',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    }, {
      name: 'Classes',
      type: 'link',
      tooltip: 'Classes',
      icon: 'accessibility',
      state: 'classes',
      roles: ['VIEW_USERS', 'ADD_USERS', 'EDIT_USERS', 'DELETE_USERS', 'SYSTEM', 'OUR_SYSTEM_USER']
    },
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'Home',
      icon: 'home',
      state: 'home',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'Profile',
      icon: 'person',
      state: 'templateProfile/overview',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'TOUR',
      type: 'icon',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      type: 'separator',
      name: 'Main Items',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DASHBOARD',
      type: 'link',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'templateDashboard',
      roles: ['OUR_SYSTEM_USER'],
      badges: [{color: 'accent', value: '100+'}],
    },
    {
      name: 'CRUD Table',
      type: 'link',
      tooltip: 'CRUD Table',
      icon: 'format_list_bulleted',
      state: 'cruds/ngx-table',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'ECOMMERCE',
      type: 'dropDown',
      tooltip: 'Shop',
      icon: 'shopping_cart',
      state: 'shop',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'PRODUCTS', state: ''},
        {name: 'PRODUCT DETAILS', state: 'products/5a9ae2106f155194e5c95d67'},
        {name: 'CART', state: 'cart'},
        {name: 'CHECKOUT', state: 'checkout'}
      ]
    },
    {
      name: 'INBOX',
      type: 'link',
      tooltip: 'Inbox',
      icon: 'inbox',
      state: 'inbox',
      roles: ['OUR_SYSTEM_USER'],
      badges: [{color: 'primary', value: '4'}],
    },
    {
      name: 'CHAT',
      type: 'link',
      tooltip: 'Chat',
      icon: 'chat',
      state: 'chat',
      roles: ['OUR_SYSTEM_USER'],
      badges: [{color: 'warn', value: '1'}]
    },
    {
      name: 'CALENDAR',
      type: 'link',
      tooltip: 'Calendar',
      icon: 'date_range',
      state: 'calendar',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DIALOGS',
      type: 'dropDown',
      tooltip: 'Dialogs',
      icon: 'filter_none',
      state: 'dialogs',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'CONFIRM', state: 'confirm'},
        {name: 'LOADER', state: 'loader'},
      ]
    },
    {
      name: 'MATERIAL',
      type: 'dropDown',
      tooltip: 'Material',
      icon: 'favorite',
      state: 'material',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BUTTONS', state: 'buttons'},
        {name: 'CARDS', state: 'cards'},
        {name: 'GRIDS', state: 'grids'},
        {name: 'LISTS', state: 'lists'},
        {name: 'MENU', state: 'menu'},
        {name: 'TABS', state: 'tabs'},
        {name: 'SELECT', state: 'select'},
        {name: 'RADIO', state: 'radio'},
        {name: 'AUTOCOMPLETE', state: 'autocomplete'},
        {name: 'SLIDER', state: 'slider'},
        {name: 'PROGRESS', state: 'progress'},
        {name: 'SNACKBAR', state: 'snackbar'},
      ]
    },
    {
      name: 'FORMS',
      type: 'dropDown',
      tooltip: 'Forms',
      icon: 'description',
      state: 'forms',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'BASIC', state: 'basic'},
        {name: 'EDITOR', state: 'editor'},
        {name: 'UPLOAD', state: 'upload'},
        {name: 'WIZARD', state: 'wizard'}
      ]
    },
    {
      name: 'TABLES',
      type: 'dropDown',
      tooltip: 'Tables',
      icon: 'format_line_spacing',
      state: 'tables',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'FULLSCREEN', state: 'fullscreen'},
        {name: 'PAGING', state: 'paging'},
        {name: 'FILTER', state: 'filter'},
      ]
    },
    {
      name: 'PROFILE',
      type: 'dropDown',
      tooltip: 'Profile',
      icon: 'person',
      state: 'templateProfile',
      roles: ['OUR_SYSTEM_USER'],
      badges: [{color: 'primary', value: '2'}],
      sub: [
        {name: 'OVERVIEW', state: 'overview'},
        {name: 'SETTINGS', state: 'settings'},
        {name: 'BLANK', state: 'blank'},
      ]
    },
    {
      name: 'TOUR',
      type: 'link',
      tooltip: 'Tour',
      icon: 'flight_takeoff',
      state: 'tour',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'MAP',
      type: 'link',
      tooltip: 'Map',
      icon: 'add_location',
      state: 'map',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'CHARTS',
      type: 'link',
      tooltip: 'Charts',
      icon: 'show_chart',
      state: 'charts',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'DND',
      type: 'link',
      tooltip: 'Drag and Drop',
      icon: 'adjust',
      state: 'dragndrop',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      state: 'sessions',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'SIGNUP', state: 'signup'},
        {name: 'SIGNIN', state: 'signin'},
        {name: 'FORGOT', state: 'forgot-password'},
        {name: 'LOCKSCREEN', state: 'lockscreen'},
        {name: 'NOTFOUND', state: '404'},
        {name: 'ERROR', state: 'error'}
      ]
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      state: 'others',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {name: 'GALLERY', state: 'gallery'},
        {name: 'PRICINGS', state: 'pricing'},
        {name: 'USERS', state: 'users'},
        {name: 'BLANK', state: 'blank'}
      ]
    },
    {
      name: 'MATICONS',
      type: 'link',
      tooltip: 'Material Icons',
      icon: 'store',
      state: 'icons',
      roles: ['OUR_SYSTEM_USER']
    },
    {
      name: 'Multi Level',
      type: 'dropDown',
      tooltip: 'Multi Level',
      icon: 'format_align_center',
      state: '',
      roles: ['OUR_SYSTEM_USER'],
      sub: [
        {
          name: 'Level Two', type: 'dropDown', state: 'fake-1', sub: [
            {name: 'Level Three', state: 'fake-2'},
            {name: 'Level Three', state: 'fake-3'}
          ]
        },
        {name: 'Level Two', state: 'fake-4'},
        {name: 'Level Two', state: 'fake-5'}
      ]
    },
    {
      name: 'DOC',
      type: 'extLink',
      tooltip: 'Documentation',
      icon: 'library_books',
      state: 'http://egret-doc.mhrafi.com/',
      roles: ['OUR_SYSTEM_USER']
    }
  ];
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.separatorMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';

  constructor (private ngxPermissionsService: NgxPermissionsService) {
  }

  getMenuItems (): Observable<IMenuItem[]> {
    return this.menuItems$;
  }

  setMenuItems (): void {
    this.menuItems.next(this.separatorMenu);
    for (let i = 0; i < this.separatorMenu.length; i ++) {
      let disabled = true;
      if (this.separatorMenu[i].roles !== undefined) {
        for (const role of this.separatorMenu[i].roles) {
          if ((typeof this.ngxPermissionsService.getPermission(role)) !== 'undefined') {
            disabled = false;
          }
        }
        this.separatorMenu[i].disabled = disabled;
      }
      if (this.separatorMenu[i].sub !== undefined) {
        for (let j = 0; j < this.separatorMenu[i].sub.length; j ++) {
          disabled = true;
          if (this.separatorMenu[i].sub[j].roles !== undefined) {
            for (const role of this.separatorMenu[i].sub[j].roles) {
              if ((typeof this.ngxPermissionsService.getPermission(role)) !== 'undefined') {
                disabled = false;
              }
            }
            this.separatorMenu[i].sub[j].disabled = disabled;
          }
        }
      }
    }
  }

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for

  // different user type.
  publishNavigationChange (menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.defaultMenu);
    }
  }
}
