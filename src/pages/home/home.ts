import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../providers/api/api';
import moment from 'moment';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  username:any = "";
  token:any = "";
  data:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiProvider,private qrScanner: QRScanner) {
    this.api.getStorage().then(r => {
      console.log(r);
      this.username = r["user"];
      this.token = r["token"];
      this.getcheckins();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  scan(){
    // Optionally request the permission early
this.qrScanner.prepare()
.then((status: QRScannerStatus) => {
   if (status.authorized) {
     // camera permission was granted


     // start scanning
     let scanSub = this.qrScanner.scan().subscribe((text: string) => {
       console.log('Scanned something', text);

       this.qrScanner.hide(); // hide camera preview
       scanSub.unsubscribe(); // stop scanning
     });

     // show camera preview
     this.qrScanner.show();

     // wait for user to scan something, then the observable callback will be called

   } else if (status.denied) {
     // camera permission was permanently denied
     // you must use QRScanner.openSettings() method to guide the user to the settings page
     // then they can grant the permission from there
   } else {
     // permission was denied, but not permanently. You can ask for permission again at a later time.
   }
})
.catch((e: any) => console.log('Error is', e));
  }


  formatdate(d){
    return moment(d).format("DD-MMM-YYYY");
  }
  logout(){
    this.api.logout();
    this.navCtrl.setRoot("LoginPage");
  }

  getcheckins(){
    this.api.getmyCheckings(this.token).subscribe(r => {
      console.log(r);
      this.data = r["data"];
      console.log(this.data);
    })
  }

}
