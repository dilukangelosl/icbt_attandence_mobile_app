import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

name:any = "";
phone:any = "";
email:any = "";
password:any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public api:ApiProvider) {
  }


  register(name,phone,email,password){

if(name == "" || phone == "" || email == "" || password == ""){
  this.api.showalert("Failed","Required All Fields");

}else{
  let loader = this.api.showLoading("Please wait..");
  loader.present();
  this.api.register(name,phone,email,password).subscribe(r => {
    console.log(r);
    if(r["status"]){
      this.api.showalert("Success",r["msg"]);
      loader.dismiss();
      this.viewCtrl.dismiss();
    }else{
      this.api.showalert("Failed",r["msg"]);
    }

  })
}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
