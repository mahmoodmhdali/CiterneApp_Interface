import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';
import {Subscription} from 'rxjs';
import {ObservableMedia} from '@angular/flex-layout';
import {TranslateService} from '@ngx-translate/core';
import {ThemeService} from '../../../services/theme.service';
import {LayoutService} from '../../../services/layout.service';
import {filter} from 'rxjs/operators';
import {GlobalService} from '../../../services/global.service';
import {ComParentChildService} from '../../../services/ComParentChildService';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-layout',
  providers: [TranslatePipe],
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public isModuleLoading: Boolean = false;
  // private headerFixedBodyPS: PerfectScrollbar;
  public scrollConfig = {};
  public layoutConf: any = {};
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private subscription: Subscription;
  // private sidebarPS: PerfectScrollbar;

  // private bodyPS: PerfectScrollbar;
  private routerEventSub: Subscription;
  private mediaSub: Subscription;

  constructor(private router: Router,
              public translate: TranslateService,
              private globalService: GlobalService,
              private comParentChildService: ComParentChildService,
              public themeService: ThemeService,
              private layout: LayoutService,
              private media: ObservableMedia) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((routeChange: NavigationEnd) => {
        this.layout.adjustLayout({route: routeChange.url});
      });

    // Translator init
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.translate.use(this.globalService.getLanguage());
  }

  ngOnInit() {
    this.subscription = this.comParentChildService.on('call-parent').subscribe(() => this.parentFunction());
    this.layoutConf = this.layout.layoutConf;
    // this.layout.adjustLayout();

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }

  ngAfterViewInit() {
    // this.layoutConfSub = this.layout.layoutConf$.subscribe(change => {
    //   // this.initBodyPS(change)
    // })
  }

  // initBodyPS(layoutConf:any = {}) {
  //   if(layoutConf.navigationPos === 'side' && layoutConf.topbarFixed) {
  //     if (this.bodyPS) this.bodyPS.destroy();
  //     if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
  //     this.headerFixedBodyPS = new PerfectScrollbar('.rightside-content-hold', {
  //       suppressScrollX: true
  //     });
  //     this.scrollToTop('.rightside-content-hold');
  //   } else {
  //     if (this.bodyPS) this.bodyPS.destroy();
  //     if (this.headerFixedBodyPS) this.headerFixedBodyPS.destroy();
  //     this.bodyPS = new PerfectScrollbar('.main-content-wrap', {
  //       suppressScrollX: true
  //     });
  //     this.scrollToTop('.main-content-wrap');
  //   }
  // }
  scrollToTop(selector: string) {
    if (document) {
      const element = <HTMLElement>document.querySelector(selector);
      element.scrollTop = 0;
    }
  }

  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  componentAdded(msg) {
  }

  componentRemoved(msg) {
    const container = document.querySelector('.rightside-content-hold');
    container.scrollTo({left: 0, top: 0, behavior: 'smooth'});
  }

  parentFunction() {
    this.componentRemoved(null);
  }

}
