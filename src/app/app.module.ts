import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAERCYk8jJIlVzm2myd1BE-93kLWQ_edBo",
  authDomain: "fir-loginionic2.firebaseapp.com",
  databaseURL: "https://fir-loginionic2.firebaseio.com",
  projectId: "fir-loginionic2",
  storageBucket: "fir-loginionic2.appspot.com",
  messagingSenderId: "606024334887"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen, FileChooser, File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
