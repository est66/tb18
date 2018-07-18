import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//firebase import
import * as firebase from 'firebase/app';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../../models/user';



//https://github.com/firebase/firebaseui-web/blob/master/README.md
@Injectable()
export class AuthProvider {
  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>
  usersName: Observable<any[]>
 


  constructor(http: Http,protected afAuth: AngularFireAuth, protected afs: AngularFirestore) {
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
    // Get Auth Data , then Get Firestore Document or null if doesn't exist
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {

          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        }
        else { return Observable.of(null); }
      })



  }


  //BASIC FUNCTION FOR CREATE USER
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => { this.updateUserData(credential.user); })
  }
  //ALL SERVICES FOR CREATE USER -----------
  //EMAIL AND PASSWORD
  async registerEmailPassword(user: User) {
    var userId;
    //try to insert new user
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      userId = result.uid;
    } catch (e) {
      console.log(e);
      alert(e)
      return false
    }
    //set user data to firestore on login
    user.uid = userId;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      password: user.password
    }
    return userRef.set(data);




  }
  //GOOGLE
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const fvfv = new firebase.auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
  }



  //END OF SERVICES -------------------------
  //UPDATING USER DATA
  public updateUserData(user) {
    //set user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(data, { merge: true });

   // return userRef.set(data);
  }





  loginEmailPassword(user: User) {
    //connexion
    var email = user.email;
    var password = user.password;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // ...
    });

  }

  //LOGOUT FUNCTION
  logout() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("Sign-out successful");
      return true;
    }).catch(function (error) {
      // An error happened.
      console.log("An error happened");
      console.error(error);
      return false;
    });
  }
  //TEST IF USER IS LOGGED
  isLogged() {
    var user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      return true;
    } else {
      // No user is signed in.
      return false;
    }
  }

} 
