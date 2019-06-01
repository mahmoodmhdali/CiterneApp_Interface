import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {NavigationService} from '../../services/navigation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent implements OnDestroy, OnInit{
  @Input('items') public menuItems: any[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  public newMenuItems: any[] = [];
  menuItemsSubscription: Subscription;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.navigationService.setMenuItems();
    this.menuItemsSubscription = this.navigationService.getMenuItems().subscribe((value: any[]) => {
        this.newMenuItems = value;
      }
    );
  }

  ngOnDestroy() {
    this.menuItemsSubscription.unsubscribe();
  }

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        {name: 'SUBITEM', state: 'cards'},
        {name: 'SUBITEM', state: 'buttons'}
      ]
    });
  }
}
