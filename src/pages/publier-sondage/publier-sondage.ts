import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http } from '@angular/http';
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
  published: boolean

}
interface Filter {
  country?: string;
  sexe?: string;
  ages?: any;
  answers?: number;
  activity?: string;
  lang?: string;
  geo?: any;
}
interface User {
  uid?: any
}

interface Wallet { opicoins?: number }


@Component({
  selector: 'page-publier-sondage',
  templateUrl: 'publier-sondage.html',
})
export class PublierSondagePage {
  form: Form;
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  filter: Filter = {
    sexe: "homme", activity: "etudiant", lang: "fra", ages: {
      upper: 75,
      lower: 16
    },
    answers: 1000,
    country: "CH"

  };
  filterChoice: any;
  numberOfQuestion: number;
  wallet: Observable<Wallet>;
  db: any;
  formIdUrl: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    public httpClient: Http
  ) {
    // Initialize Cloud Firestore through Firebase

    this.form = navParams.get('form');
    this.filterChoice = "aucun";
    this.usersCollection = afs.collection('users');
    this.users = this.usersCollection.valueChanges();
    this.wallet = afs.doc<Wallet>('wallet/' + this.form.uid).valueChanges();
    this.db = firebase.firestore();
    this.getNumberOfQuestion();
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
    //console.log('ionViewDidLoad PublierSondagePage');
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

  targetCount() {
    //console.log(this.filter);
    if (this.filterChoice == "aucun") {
      this.usersCollection = this.afs.collection('users', ref => ref.where('langues.' + this.filter.lang, '==', true));
    }
    if (this.filterChoice == "sexe") {
      this.usersCollection = this.afs.collection('users', ref => ref.where('sexe', '==', this.filter.sexe).where('langues.' + this.filter.lang, '==', true));
    }
    if (this.filterChoice == "age") {
      this.usersCollection = this.afs.collection('users', ref => ref.where('age', '>=', this.filter.ages.lower).where('age', '<=', this.filter.ages.upper).where('langues.' + this.filter.lang, '==', true));
    }
    if (this.filterChoice == "activity") {
      this.usersCollection = this.afs.collection('users', ref => ref.where('activity', '==', this.filter.activity).where('langues.' + this.filter.lang, '==', true));
    }

    //query is simplified for the proof of concept and to have enough user that can respond to the Google Forms
    this.usersCollection = this.afs.collection('users');
    this.users = this.usersCollection.valueChanges();
  }
  //Get number of question using Apps Script --> Get all users and remove decorative ellements (title, description etc.)
  async getNumberOfQuestion() {
    let formID = encodeURI(this.form.formId);
    const url = "https://script.google.com/macros/s/AKfycbxP5mgxhqjAwKZJYz8E1lXsknu5VKUJNVUB6NapUtwX0EPX4V36/exec?";
    const encoded = "formId=" + formID;
    //console.log(encoded);
    const response = await this.httpClient.get(url + encoded).map(res => res).subscribe(data => {
      this.numberOfQuestion = data._body;
     // console.log(this.numberOfQuestion);

    });
   // console.log(response);


  }


  async publier() {
    //prepare the query
    let query;
    if (this.filterChoice == "aucun") {
      query = this.db.collection('users').where('langues.' + this.filter.lang, '==', true);
    }
    if (this.filterChoice == "sexe") {
      query = this.db.collection('users').where('sexe', '==', this.filter.sexe).where('langues.' + this.filter.lang, '==', true);
    }
    if (this.filterChoice == "age") {
      query = this.db.collection('users').where('age', '>=', this.filter.ages.lower).where('age', '<=', this.filter.ages.upper).where('langues.' + this.filter.lang, '==', true);
    }
    if (this.filterChoice == "activity") {
      query = this.db.collection('users').where('activity', '==', this.filter.activity).where('langues.' + this.filter.lang, '==', true);
    }
    //return the query
    //the query is simplified fot the proof of concept of application
    query = this.db.collection('users');
    let arrayOfUsers =
      await query.get()
        .then(function (querySnapshot) {
          let arrayU = [];
          querySnapshot.forEach(function (doc) {
            arrayU.push(doc.data().uid);
          });

          return arrayU;
        }).catch(function (error) { console.log("Error getting documents: ", error); });
    //console.log(arrayOfUsers);
    //filter the query to remove the active user
    arrayOfUsers = arrayOfUsers.filter(userId => userId != this.form.uid);
    //console.log(arrayOfUsers);
    //calculate rewards
    let rewards;
    if (this.filterChoice == "aucun") rewards = this.numberOfQuestion * 0.2 * 100; else rewards = this.numberOfQuestion * 0.2 * 1.2 * 100


    for (const uid of arrayOfUsers) {
      let formResponseToAdd = {
        "id": this.form.formId + uid,
        "uid": uid,
        "userFormUid": this.form.uid,
        "formId": this.form.formId,
        "formTitle": this.form.title,
        "nbQuestions": this.numberOfQuestion,
        "rewards": rewards,
        "isCompleted": false,
        "published": true
      }
      this.db.collection("user_form_response").doc(this.form.formId + uid).set(formResponseToAdd);
    }
    let formsPublished = {
      "published": true
    }
    this.db.collection("forms").doc(this.form.formId).update(formsPublished);

    this.form.published = true;
    //share the form to every correponding user

  }

}
