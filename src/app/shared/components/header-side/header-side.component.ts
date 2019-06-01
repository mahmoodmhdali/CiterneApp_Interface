import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {LayoutService} from '../../services/layout.service';
import {TranslateService} from '@ngx-translate/core';
import {UserSettingsService} from '../../services/database-services/userSettings.service';
import {LanguageService} from '../../services/database-services/language.service';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../services/auth/auth.service';
import {WebNotificationsService} from '../../services/database-services/webNotifications.service';
import {Subscription} from 'rxjs/Rx';
import {LanguageModel} from '../../models/Language.model';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';
import {NgxPermissionsService} from 'ngx-permissions';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit, OnDestroy {
  @Input() notificPanel;
  currentLang = '';
  public availableLangs = [];
  public egretThemes;
  public layoutConf: any;
  apiConfig;
  showToggle = true;
  public languages: LanguageModel[];
  currentLangSubscription: Subscription;

  constructor(private themeService: ThemeService,
              private layout: LayoutService,
              private globalService: GlobalService,
              private languageService: LanguageService,
              public userSettingsService: UserSettingsService,
              private ngxPermissionsService: NgxPermissionsService,
              public translate: TranslateService,
              public authService: AuthService,
              public webNotificationsService: WebNotificationsService,
              private renderer: Renderer2) {
    this.apiConfig = this.globalService.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
    if(typeof this.ngxPermissionsService.getPermission('OUTLET') !== 'undefined'){
      this.showToggle = false;
    }
    this.currentLangSubscription = this.languageService.getCurrentLang().subscribe((value: string) => {
        if (value !== 'none') {
          this.currentLang = value;
        }
      }
    );
    this.currentLang = this.globalService.getLanguage();
    this.languageService.setCurrentLang(this.currentLang);
    setTimeout(() => {
      if (this.currentLang === 'ar' || this.currentLang === 'fa') {
        this.layout.publishLayoutChange({dir: 'rtl'});
      } else {
        this.layout.publishLayoutChange({dir: 'ltr'});
      }
    });
    this.languageService.getLanguages().subscribe(
      (responseBuilder) => {
        if (responseBuilder.code === +this.apiConfig.SUCCESS) {
          this.languages = responseBuilder.data.languages;
          this.languages.map((lang: LanguageModel) => {
            this.availableLangs.push({id: lang.id, name: lang.languagename, code: lang.prefix});
          });
        }
      }
    );
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
  }

  ngOnDestroy() {
    this.currentLangSubscription.unsubscribe();
  }

  setLang() {
    this.globalService.setSession('lang', this.currentLang);
    this.translate.use(this.currentLang);
    if (this.currentLang === 'ar' || this.currentLang === 'fa') {
      this.layout.publishLayoutChange({dir: 'rtl'});
    } else {
      this.layout.publishLayoutChange({dir: 'ltr'});
    }
    const langId = this.languages.find(language => language.prefix === this.currentLang).id;
    this.userSettingsService.changeLanguage(langId).subscribe((responseBuilder: ResponseBuilderModel) => {
      this.globalService.setSession('loggedInUser', responseBuilder.data.user);
    });
  }

  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }

  toggleNotific() {
    this.webNotificationsService.setLoadedNotifications(false);
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: true});
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true});
  }

  signOut() {
    this.authService.signOut();
  }
}
