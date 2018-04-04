import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ApiProvider} from '../providers/api/api';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any ;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public api:ApiProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.api.getStorage().then(r => {
        if(r == null){
          this.rootPage = "LoginPage"
        }else{
          this.rootPage = "HomePage"
        }
      })
    });
  }
}

