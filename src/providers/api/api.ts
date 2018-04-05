import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController,LoadingController } from 'ionic-angular';
import moment from 'moment';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  public url:String = "http://christmascake.store:3011/";
  constructor(public http: HttpClient,private storage: Storage, public alertCtrl:AlertController,public loadingCtrl: LoadingController) {
    console.log('Hello ApiProvider Provider');
  }

  setStorage(data){
    this.storage.set('user',JSON.stringify(data));
  }

  getStorage(){
    return new Promise((res,rej) => {
      this.storage.get('user').then((val) => {

        res(JSON.parse(val));
      });
    })
  }

  login(email,password){
    return this.http.post(this.url+"user/login",{email:email,password:password});
  }

  checkin(qr,token){
    let d = moment().format("HH:MM").toString();

    return this.http.post(this.url+"api/checkin?qr="+qr+"&token="+token,{logtime:d});
  }

  showalert(title, msg){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  showLoading(title){
    let loader = this.loadingCtrl.create({
      content: title,
      duration: 3000
    });
    return loader;
  }

  logout(){
    this.storage.remove('user');
  }

  getmyCheckings(token){
    return this.http.get(this.url+"api/mycheckins?token="+token);
  }

}
