import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const parameterValue = localStorage.getItem(btoa('error'));
    if (typeof parameterValue === 'undefined') {
      this.error = parameterValue !== null ? JSON.parse(parameterValue) : '';
      localStorage.removeItem(btoa('error'));
    }
  }

  navigateToHomePage() {
    this.authService.navigationBasedOnRoles();
  }

  signOut() {
    this.authService.signOut();
  }

}
