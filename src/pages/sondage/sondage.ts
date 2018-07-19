import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { PublierSondagePage } from '../publier-sondage/publier-sondage';
import * as firebase from 'firebase/app';


interface Form {
  date?: Date;
  formId?: string;
  uid?: any;
  editor?: string;
  title?: string;
  statut?: string;
  editUrl?: string;
  publishedUrl?: string;

}
@Component({
  selector: 'page-sondage',
  templateUrl: 'sondage.html',
})
export class SondagePage {

 form:Form;

 

  constructor(public navCtrl: NavController, private navParams: NavParams, private inAppBrowser: InAppBrowser, private alertCtrl: AlertController,) {
    this.form = navParams.get('form');  
  }
  //-----Tricks to hide and show tabs bars
  ionViewWillEnter(){
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

  openWebPage(url){
    const options: InAppBrowserOptions = {
      location: 'yes',
      toolbar: 'yes',
      zoom: 'no',
      hardwareback:'yes',

    }
    const browser = this.inAppBrowser.create(url, '_self', options);
    browser.show();
  }

  publier(form){
    console.log(form);
    this.navCtrl.push(PublierSondagePage,{form});

  }

  shareForms(){

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
            
            this.navCtrl.pop();
          }
        }
      ]
    });
   
    
    alert.present();
  

  }

}
