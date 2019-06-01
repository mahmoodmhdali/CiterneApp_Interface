import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  navigateToHomePage() {
    this.authService.navigationBasedOnRoles();
  }

  signOut() {
    this.authService.signOut();
  }

}
