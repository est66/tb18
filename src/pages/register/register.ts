import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  constructor(
    private afauth: AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider) {
  }
  
  register(user:User){
    this.auth.registerEmailPassword(user);
  }
}
