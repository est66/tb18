import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { PublierSondagePage } from '../publier-sondage/publier-sondage';
import * as firebase from 'firebase/app';

/**
 * Cette page donne un aperçu du sondage et permet aux utilisateurs de consulter, 
 * modifier supprimer, publier ou stopper le partage de leur Google Forms. 
 * Les boutons de modification et d’aperçu redirigent les utilisateurs vers les 
 * formulaires Google Forms.

 */


interface Form {
  date?: Date;
  formId?: string;
  uid?: any;
  editor?: string;
  title?: string;
  statut?: string;
  editUrl?: string;
  publishedUrl?: string;
  published:boolean

}
@Component({
  selector: 'page-sondage',
  templateUrl: 'sondage.html',
})
export class SondagePage {

  form: Form;
  db: any;

  

  constructor(public navCtrl: NavController, private navParams: NavParams, private inAppBrowser: InAppBrowser, private alertCtrl: AlertController, ) {
    this.form = navParams.get('form');
    this.db = firebase.firestore();
  }
  //-----Tricks to hide and show tabs bars
  ionViewWillEnter() {
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.visibility = 'hidden';
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SondagePage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.visibility = 'hidden';
      });
    }
  }
  ionViewWillLeave() {
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.visibility = 'visible';
      });
    }
  }

  //-----Tricks to hide and show tabs bars

  openWebPage(url) {
    const options: InAppBrowserOptions = {
      location: 'yes',
      toolbar: 'yes',
      zoom: 'no',
      hardwareback: 'yes',

    }
    const browser = this.inAppBrowser.create(url, '_self', options);
    browser.show();
  }

  publier(form) {
    console.log(form);
    this.navCtrl.push(PublierSondagePage, { form });

  }

  shareForms() {

  }

  deleteForms() {
    let formsIsDeleted = false;
    let alert = this.alertCtrl.create({
      title: 'Êtes-vous sûre de vouloir supprimer ce Google Forms ?',
      buttons: [
        {
          text: 'Non',

          handler: data => {
            console.log('Canceled');
          }
        },
        {
          text: 'Oui',
          handler: data => {
            var db = firebase.firestore();

            db.collection("forms").doc(this.form.formId).delete().then(function () {
              console.log("Document successfully deleted!");

            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });

            db.collection("user_form_response").doc(this.form.formId + this.form.uid).delete().then(function () {
              console.log("Document successfully deleted!");

            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });

            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  async brouillon() {
    if(!this.form.published) return;
    let users = this.db.collection('users');
    let arrayOfUsers =
      await users.get()
        .then(function (querySnapshot) {
          let arrayU = [];
          querySnapshot.forEach(function (doc) {
            arrayU.push(doc.data().uid);
          });
          return arrayU;
        }).catch(function (error) { console.log("Error getting documents: ", error); });
    arrayOfUsers = arrayOfUsers.filter(userId => userId != this.form.uid);
    for (const uid of arrayOfUsers) {
      let formsPublished = {
        "published": false
      }
      this.db.collection("user_form_response").doc(this.form.formId + uid).update(formsPublished);
    }
    let formsPublished = {
      "published": false
    }
    this.db.collection("forms").doc(this.form.formId).update(formsPublished);
    this.form.published = false;


  }

}
