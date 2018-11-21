import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:String = "";
  password:String ="";
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider, public modalCtrl:ModalController) {
  }

  register(){
    this.modalCtrl.create("RegisterPage").present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(email,password){

if(this.email == "" || this.password == ""){
  this.api.showalert("Invalid","required Fields");
}else{
  let loader = this.api.showLoading("Please wait");
loader.present();
  this.api.login(this.email,this.password).subscribe(r => {
    console.log(r);
    loader.dismiss();
        if(!r["success"]){
          this.api.showalert("Login Failed", r["msg"]);
        }else{
          this.api.setStorage(r);
          this.navCtrl.setRoot("HomePage");
        }
  })
}

  }

}
