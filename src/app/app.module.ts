import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SondagePage } from '../pages/sondage/sondage';
//pages
import { ProfilPage } from '../pages/profil/profil';
import { FormsPage } from '../pages/forms/forms';
import { TabsPage } from '../pages/tabs/tabs';
import { PublierSondagePage } from '../pages/publier-sondage/publier-sondage';
import { RegisterPage } from '../pages/register/register';
import { FirstTimePage } from '../pages/first-time/first-time';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//extern library
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../pages/login/login';
import { ResponsesPage } from '../pages/responses/responses';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilPage,
    FormsPage,
    TabsPage,
    SondagePage,
    PublierSondagePage,
    FirstTimePage,
    RegisterPage,
    LoginPage,
    ResponsesPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),// imports firebase/app for everything
    AngularFirestoreModule, // imports firebase/firestore for database features
    AngularFireAuthModule, // imports firebase/auth for auth features,
    AngularFireStorageModule, // imports firebase/storage for storage features
    IonicModule.forRoot(MyApp),
    HttpModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilPage,
    FormsPage,
    TabsPage,
    SondagePage,
    PublierSondagePage,
    FirstTimePage,
    RegisterPage,
    LoginPage,
    ResponsesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    UserProvider,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
