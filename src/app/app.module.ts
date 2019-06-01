import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig} from '@angular/material';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './shared/inmemory-db/inmemory-db.service';

import {rootRouterConfig} from './app.routing';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {ConfigService} from './shared/services/global-config/config.service';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ReportsService} from './shared/services/database-services/reports.service';
import {ReportFiltersService} from './shared/services/database-services/reportFilters.service';
import {ReportStylesService} from './shared/services/database-services/reportStyles.service';
import {LanguageService} from './shared/services/database-services/language.service';
import {UserSettingsService} from './shared/services/database-services/userSettings.service';
import {NotificationEventService} from './shared/services/database-services/NotificationEvent.service';
import {WebNotificationsService} from './shared/services/database-services/webNotifications.service';
import {CountdownService} from './shared/services/countdown.service';
import {NgxUsersPopupComponent} from './views/users/ngx-users-popup/ngx-users-popup.component';
import {AuthInterceptor} from './shared/services/auth/auth.interceptor';
import {GlobalService} from './shared/services/global.service';
import {AuthService} from './shared/services/auth/auth.service';
import {TokensService} from './shared/services/auth/tokens.service';
import {UserService} from './shared/services/database-services/user.service';
import {LogsService} from './shared/services/logs.service';
import {RoleService} from './shared/services/database-services/role.service';
import {ComParentChildService} from './shared/services/ComParentChildService';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load(environment.configFile);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true}),
    RouterModule.forRoot(rootRouterConfig, {useHash: true}),
    NgxPermissionsModule.forRoot()
  ],
  declarations: [AppComponent],
  entryComponents: [],
  providers: [
    ConfigService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: ConfigLoader, deps: [ConfigService], multi: true},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    GlobalService,
    AuthService,
    TokensService,
    UserService,
    LogsService,
    RoleService,
    ReportsService,
    ReportFiltersService,
    ComParentChildService,
    ReportStylesService,
    LanguageService,
    UserSettingsService,
    NotificationEventService,
    WebNotificationsService,
    CountdownService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
