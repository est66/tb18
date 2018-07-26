import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//firebase import
import * as firebase from 'firebase/app';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../../models/user';
import { AuthProvider } from '../auth/auth';


@Injectable()
export class UserProvider extends AuthProvider {
  userStatut: Observable<User>;

  constructor(http: Http, afAuth: AngularFireAuth, afs: AngularFirestore) {
    super(http, afAuth, afs);
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
    // Get Auth Data , then Get Firestore Document or null if doesn't exist
    this.userStatut = this.afAuth.authState
      .switchMap(user => {
        if (user) {

          return this.afs.doc<User>(`statuts/${user.uid}`).valueChanges()
        }
        else { return Observable.of(null); }
      })

  }


  ionViewDidLoad() {
    //get userId
    const userId = firebase.auth().currentUser.uid;
    //Observable Statut
    var db = firebase.firestore();
    db.collection('statuts').doc(userId);
  }
  //UPDATING USER DATA ON FIRST PAGE
  updateFirstData(user) {
    //validation
    //-------------
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
    // Get Auth Data , then Get Firestore Document or null if doesn't exist
    // Get the data
    var usersRef = db.collection("users");
    //set user data to firestore
    const userId = firebase.auth().currentUser.uid;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${userId}`);
    console.log(user);
    const data: User = {
      prenom: user.prenom,
      nom: user.nom,
      age: user.age,
      sexe: user.sexe,
      activity:user.activity,
      //CONTACT
      rue: user.rue,
      rueNo: user.rueNo,
      npa: user.npa,
      ville: user.ville,
      canton: user.canton,
      telephone: user.telephone, 
    }
    //IF USER IS ADDED THEN GO TO THE NEXT PAGE SECOND-DATA
    let updated = userRef.update(data).then(function (docRef) {
      console.log("Document written with ID: ", docRef);
    })
      .catch(function (error) {
        alert(error);
        console.error("Error adding document: ", error);
      })
  }
}
