import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['.logOut { cursor: pointer; }']
})
export class AppComponent {
  public appPages = [
    // title, url, icon
    [ 'Início', '', 'home' ],
    [ 'Sobre', '/sobre', 'person' ],
    [ 'Login', '/login', 'person' ],
  ];

  constructor(public user: UserService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
