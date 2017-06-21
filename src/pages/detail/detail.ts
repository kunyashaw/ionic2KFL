import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderPage } from '../order/order'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { kflHttpClientService } from '../../service/kflHttpClient'
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {
  //dish = { name: '', img_lg: '', price: '', detail: '', material: '' };
  dish: any;
  constructor(public httpService: kflHttpClientService, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    var id = this.navParams.get('id');
    console.log("did is " + id);
    this.httpService.KflJsonP('/detail', 'id=' + id).subscribe((response: any) => {
      this.dish = response[0];
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  back() {
    this.navCtrl.pop();
  }
  backToRoot() {
    this.navCtrl.popToRoot();
  }
  goToOrder(id) {
    this.navCtrl.push(OrderPage, { did: id });
  }

}
