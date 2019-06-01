import {Component, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NavigationService} from '../../../shared/services/navigation.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../shared/services/theme.service';
import {TranslateService} from '@ngx-translate/core';
import {LayoutService} from '../../services/layout.service';
import {GlobalService} from '../../services/global.service';
import {LanguageService} from '../../services/database-services/language.service';
import {LanguageModel} from '../../models/Language.model';
import {WebNotificationsService} from '../../services/database-services/webNotifications.service';
import {ResponseBuilderModel} from '../../models/ResponseBuilder.model';
import {UserSettingsService} from '../../services/database-services/userSettings.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any;
  menuItemSub: Subscription;
  egretThemes: any[] = [];
  currentLang = '';
  availableLangs = [];
  @Input() notificPanel;
  apiConfig;
  public languages: LanguageModel[];
  currentLangSubscription: Subscription;

  constructor(private layout: LayoutService,
              private navService: NavigationService,
              public themeService: ThemeService,
              public authService: AuthService,
              private globalService: GlobalService,
              private languageService: LanguageService,
              public userSettingsService: UserSettingsService,
              public translate: TranslateService,
              public webNotificationsService: WebNotificationsService,
              private renderer: Renderer2) {
    this.apiConfig = this.globalService.getSession('RESPONSE_CODE');
  }

  ngOnInit() {
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
    this.menuItemSub = this.navService.menuItems$
      .subscribe(res => {
        res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
        const limit = 4;
        const mainItems: any[] = res.slice(0, limit);
        if (res.length <= limit) {
          return this.menuItems = mainItems;
        }
        const subItems: any[] = res.slice(limit, res.length - 1);
        mainItems.push({
          name: 'More',
          type: 'dropDown',
          tooltip: 'More',
          icon: 'more_horiz',
          sub: subItems
        });
        this.menuItems = mainItems;
      });
  }

  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
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
