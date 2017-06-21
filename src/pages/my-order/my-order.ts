import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { kflHttpClientService } from '../../service/kflHttpClient'
/**
 * Generated class for the MyOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-order',
  templateUrl: 'my-order.html',
})
export class MyOrderPage implements OnInit {
  orderList = [];
  constructor(public httpService: kflHttpClientService, public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit() {
    this.httpService.KflJsonP('/myOrder', "phone=" + sessionStorage.getItem('phone')).subscribe(response => { 
      this.orderList = response;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderPage');
  }



}
