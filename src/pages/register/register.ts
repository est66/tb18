import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  LoginPage: any = LoginPage;
  constructor(
    private afauth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    private alertCtrl: AlertController) {

  }

  register(user: User) {
    if (!user.email.trim().endsWith("@gmail.com")) {
      let alert = this.alertCtrl.create({
        title: 'Email invalide',
        subTitle: user.email + " n'est pas une adresse Gmail valide ex: example@gmail.com",
        buttons: ['ok']
      });
      return alert.present();
    }
    this.auth.registerEmailPassword(user);
  }

}
