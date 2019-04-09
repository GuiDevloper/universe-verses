import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { About, User } from '../models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../../modal/modal.page';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usr: User = { name: '', password: ''};

  constructor(private db: AngularFireDatabase,
    private ngAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController) { }

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
      .catch(err => resolve(this.handleError(err)));
    });
  }

  update(newVal: About): Promise<any> {
    return new Promise(resolve => {
      if (newVal.bio.length > 0 && newVal.nome.length > 0) {
        this.db.object(`user/about`).update(newVal)
        .then(() => resolve(null))
        .catch(err => resolve(err));
      } else {
        resolve('Hey! Se descreva em todos os campos');
      }
    });
  }

  isLogged(): Observable<firebase.User> {
    return this.ngAuth.authState;
  }

  logOut(): void {
    this.ngAuth.auth.signOut().then(() => this.goTo(''));
  }

  goTo(url: string): void {
    this.ngZone.run(() => {
      return this.router.navigateByUrl(url);
    });
  }

  async alert(err: string) {
    const Modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { erro: err }
    });
    Modal.present();
  }

  handleError(err: any): string {
    err = err.code.includes('invalid-email') ?
    'Epa! Preencha todos os campos corretamente' : (
      err.code.includes('wrong-password') ? 'Ops, senha errada' : (
        err.code.includes('user-not-found') ?
        'Nenhuma conta de Versador correspondente' :
        'Eita! Algo desaconteceu, tente novamente'
      )
    );
    return err;
  }

}
