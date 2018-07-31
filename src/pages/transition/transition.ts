import { Component } from '@angular/core';
import { LoadingController  } from 'ionic-angular';

/**
 * Cette page s'affiche lorsque les pages se chargent
 */

@Component({
  selector: 'page-transition',
  templateUrl: 'transition.html',
})
export class TransitionPage {

  constructor(public loadingCtrl: LoadingController) {
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      
      duration: 3000
    });
    loader.present();
  }

}
