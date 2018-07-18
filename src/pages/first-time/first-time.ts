import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-first-time',
  templateUrl: 'first-time.html',
})


export class FirstTimePage {
  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  userData = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public userProvider: UserProvider) {
  }

  validFirstPart(user: User) {
    //VERIFIE LES INFORMATION DU FORMULLAIRE
    //validation
    // SI VALID ALORS UPDATE DATA
    this.userProvider.updateFirstData(user);
    alert("User updated !");
    return this.navCtrl.setRoot(HomePage);
    // PUIS HIDE LE CHAMP ET PASSE A SECOND PART --> LA FONCTION FAIT DEJA CA

  }

  validSecondPart() {
    //VERIFIE LES INFORMATIONS DU FORMULAIRE
    //SI VALID ALORS ENVOYER LE FORUMLAIRE ET PASSER A LA PAGE ACCEUIL
  }


}
