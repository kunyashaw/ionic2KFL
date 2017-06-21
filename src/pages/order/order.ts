import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyOrderPage } from '../my-order/my-order'
import { kflHttpClientService } from '../../service/kflHttpClient'
/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  order = { user_name: '', user_sex: '1', user_phone: '', user_addr: '', did: '' };
  result = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: kflHttpClientService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  checkMyOrder() {
    console.log('btn is clicked');
    this.navCtrl.push(MyOrderPage);
  }
  submitOrder() {
    console.log(this.order);

    this.order.did = this.navParams.get('did');
    var queryStr = "did=" + this.order.did + "&user_name=" + this.order.user_name + "&user_phone=" + this.order.user_phone + "&user_addr=" + this.order.user_addr + "&user_sex=" + this.order.user_sex;
    this.httpService.KflJsonP('/order_add', queryStr).subscribe(response => {
      console.log(response);
      if (response.msg == 'success') {
        sessionStorage.setItem('phone', this.order.user_phone);
        this.result = "下单成功，订单编号为" + response.oid;
      }
      else {
        this.result = "下单失败";
      }


    })
  }

}
