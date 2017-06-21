import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main'
import { MyOrderPage } from '../my-order/my-order'

/**
 * Generated class for the StartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  mainPage: any;
  myOrder: any;
  start: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mainPage = MainPage;
    this.myOrder = MyOrderPage;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
  }

  jumpToMain() {
    this.navCtrl.push(MainPage);
  }

}
