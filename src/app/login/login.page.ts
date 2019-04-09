import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public user: UserService) { }

  ngOnInit() {
  }

  login(): void {
    this.user.login().then(err => this.user.alert(err));
  }

}
