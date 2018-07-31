import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../models/user';
import { RegisterPage } from '../../pages/register/register';
//import { UserAgent } from '@ionic-native/user-agent';
//import { Firebaseui } from 'firebaseui'
//import * as firebaseui from 'firebaseui';
//import { FirebaseUiProvider } from 'firebaseui'
//firebase import
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsPage } from '../forms/forms';

/**
 * La page de Login permet aux utilisateurs de se connecter à l'application 
 * rediriger l'utilisateur vers la page qui permet aux utilisateurs 
 * se créer un compte (Register).
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  user = {} as User;
  RegisterPage: any = RegisterPage;
  FormsPage: any = FormsPage;
  loginCredential: FormGroup;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public auth: AuthProvider,
    public formBuilder: FormBuilder,
    public events: Events,
   // private googlePlus: GooglePlus,
    //private userAgent: UserAgent,

  ) {
    //FORM VALIDATOR
    //https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
    this.loginCredential = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

  }

  //LOGIN DE L'UTILISATEUR AVEC EMAIL ET MOT DE PASSE
  login(user: User) {
    //validation du formulaire
    if (!this.loginCredential.valid) { alert("Email or password error"); return null; }
    //connexion
    if (this.auth.loginEmailPassword(user)) this.navCtrl.setRoot(FormsPage);

  }
  //REDIRECTION VERS LA PAGE DE CRéATION DE COMPTE
  register() {
    this.navCtrl.push(RegisterPage);
  }
}
