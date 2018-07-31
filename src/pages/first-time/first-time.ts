import { Component } from '@angular/core';
import { NavController, NavParams, DateTime } from 'ionic-angular';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { UserProvider } from '../../providers/user/user';
import { AuthProvider } from '../../providers/auth/auth';
import { FormsPage } from '../forms/forms';
/**
 * Cette page permet d'entrer les informations utilisateurs lors de la
 * première connexion sur l'application.
 * Cette page ne fait pas partie du prototype car elle contient des bugs
 */

@Component({
  selector: 'page-first-time',
  templateUrl: 'first-time.html',
})


export class FirstTimePage {
  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  userData = {} as User;
  FormsPage: any = FormsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public userProvider: UserProvider) {
  }

  validFirstPart(user: User) {
    //VERIFIE LES INFORMATION DU FORMULLAIRE
    //validation
    // SI VALID ALORS UPDATE DATA

    console.log(user.age);
    console.log(user.langues);
    console.log(user.activity)
    let index = 0;
    let arUser = user.langues;
    arUser.forEach(langue => {
      arUser[langue] = true;
      delete arUser[index];
      index++;
    });
    user.langues = arUser;
    console.log(user.langues);

    this.userProvider.updateFirstData(user);
    console.log("User updated !");
    return this.navCtrl.setRoot(FormsPage);
    // PUIS HIDE LE CHAMP ET PASSE A SECOND PART --> LA FONCTION FAIT DEJA CA

  }

  validSecondPart() {
    //VERIFIE LES INFORMATIONS DU FORMULAIRE
    //SI VALID ALORS ENVOYER LE FORUMLAIRE ET PASSER A LA PAGE ACCEUIL
  }


}
