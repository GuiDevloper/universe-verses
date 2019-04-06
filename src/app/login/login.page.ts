import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  error: string;

  constructor(public user: UserService) { }

  ngOnInit() {
  }

  login(): void {
    this.user.login().then(err => this.error = err);
  }

}
