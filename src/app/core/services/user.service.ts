import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { About, User } from '../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usr: User = { name: '', password: ''};

  constructor(private db: AngularFireDatabase,
    private ngAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router) { }

  getAll(): Observable<any> {
    return this.db.object('/user/about').valueChanges();
  }

  login(): Promise<any> {
    return new Promise(resolve => {
      this.ngAuth.auth
      .signInWithEmailAndPassword(this.usr.name, this.usr.password)
      .then(() => {
        this.goTo('/sobre');
      })
      .catch(err => {
        resolve(err);
      });
    });
  }

  update(newVal: About): Promise<any> {
    return new Promise(resolve => {
      this.db.object(`user/about`).update(newVal)
        .then(() => resolve(null))
        .catch(() => resolve('error'));
    });
  }

  isLogged(): Observable<firebase.User> {
    return this.ngAuth.authState;
  }

  goTo(url: string): void {
    this.ngZone.run(() => {
      return this.router.navigateByUrl(url);
    });
  }

}
