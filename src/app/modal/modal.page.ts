import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {
  erro: string;

  constructor(public nvParams: NavParams,
    private modalCtrl: ModalController) {
    this.erro = nvParams.get('erro');
    console.log(this.erro);
  }

  closeModal(): void {
    this.modalCtrl.dismiss();
  }

}
