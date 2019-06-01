import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import * as humanizeDuration from 'humanize-duration';
import {WebNotificationsService} from '../../services/database-services/webNotifications.service';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';
import {AppConfirmService} from '../../services/app-confirm/app-confirm.service';
import {GlobalService} from '../../services/global.service';
import {WebNotificationsModel} from '../../models/WebNotifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @Input() notificPanel;

  humanizeDurationOptions: { round?: boolean, units: string[] };
  notifications: WebNotificationsModel[] = [];
  newNotificationsFlag = true;
  loadedNotifications = false;
  notificationRefreshRate: number;
  refreshNotificationSubscription: Subscription;
  loadedNotificationsSubscription: Subscription;
  // fetchNotificationsSubscription: Subscription;


  constructor(private router: Router, public webNotificationsService: WebNotificationsService,
              private confirmService: AppConfirmService, private svcGlobal: GlobalService) {
    this.notificationRefreshRate = +this.svcGlobal.getSession('NOTIFICATION_REFRESH_RATE');
    this.humanizeDurationOptions = {
      round: true,
      units: ['d', 'h', 'm']
    };
  }

  ngOnInit() {
    // this.getCountWebNotifications();
    this.router.events.subscribe((routeChange) => {
      if (routeChange instanceof NavigationEnd) {
        this.notificPanel.close();
      }
    });

    this.loadedNotificationsSubscription = this.webNotificationsService.getLoadedNotifications().subscribe((value: boolean) => {
        this.loadedNotifications = value;
        if (!value) {
          // this.getWebNotifications();
        }
      }
    );

    // this.fetchNotificationsSubscription = this.webNotificationsService.getFetchNotifications().subscribe((value: Date) => {
    //     // this.getCountWebNotifications();
    //   }
    // );

    this.refreshNotificationSubscription = Observable.interval(this.notificationRefreshRate).subscribe(x => {
      this.webNotificationsService.setFetchNotifications();
    });
  }

  getWebNotifications() {
    this.webNotificationsService.getWebNotifications(!this.newNotificationsFlag).subscribe(res => {
        this.notifications = res.data.notifications;
        if (this.notifications instanceof Array) {
          this.notifications = this.notifications.map(notification => {
            const dateAdded = Date.parse(notification.dateAdded);
            const dateAddedHuman = Date.now() - dateAdded;
            notification = Object.assign(notification, {
              color: notification.hasSEEN ? 'primary' : 'warn',
              dateAddedHuman: humanizeDuration(dateAddedHuman, this.humanizeDurationOptions)
            });
            return notification;
          });
          this.webNotificationsService.setLoadedNotifications(true);
        }
      }
    );
  }

  onNotificationClick(href: String) {
    if (href) {
      this.router.navigate([href]);
    }
  }

  updateWebNotifications() {
    this.confirmService.confirm({
      title: 'Update Notifications',
      message: 'Are you sure you want to mark notifications as read?'
    }).subscribe((confirmResponse) => {
      if (confirmResponse) {
        this.webNotificationsService.updateWebNotifications().subscribe(res => {
          // this.getWebNotifications();
          this.webNotificationsService.notificationsCount = 0;
        });
      }
    });
  }

  // getCountWebNotifications() {
  //   this.webNotificationsService.getCountWebNotifications().subscribe(res => {
  //       this.webNotificationsService.notificationsCount = res.data.notifications;
  //     }
  //   );
  // }

  ngOnDestroy() {
    this.refreshNotificationSubscription.unsubscribe();
    // this.fetchNotificationsSubscription.unsubscribe();
    this.loadedNotificationsSubscription.unsubscribe();
  }

}
