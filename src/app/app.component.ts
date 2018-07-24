import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Transition } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { FormsPage } from '../pages/forms/forms';
import { TransitionPage } from '../pages/transition/transition';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TransitionPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthProvider,
  ) {

    // User is redirected to the right page depend of its situation
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // If there's no user logged in send him to the LoginPage
      if (user != null) this.rootPage = FormsPage; 
      // Else go to HomePage
      else this.rootPage = LoginPage;
    });
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isFirstTime(userId) {
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(userId);
    docRef.get().then(function (doc) {

      if (doc.exists && doc.data().prenom == undefined) {

        console.log("Document data:", doc.data().prenom);

        return true;

      } else {
        console.log("No such document!");
        return false;
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    }

    );
    console.log(docRef);
    return docRef;

  }
}
