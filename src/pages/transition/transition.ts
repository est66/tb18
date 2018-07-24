import { Component } from '@angular/core';
import { LoadingController  } from 'ionic-angular';

/**
 * Generated class for the TransitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
