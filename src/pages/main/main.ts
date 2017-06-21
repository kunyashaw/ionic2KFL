import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail'
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { kflHttpClientService } from '../../service/kflHttpClient'



/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})


export class MainPage implements OnInit {
  list = [];
  constructor(public http: Http,
    public kflService: kflHttpClientService,
    public jsonp: Jsonp, public navCtrl: NavController, public navParams: NavParams) {

  }
  ngOnInit() {
    console.log('init firest page data');
    this.kflService.KflJsonP('/main', "start=0").subscribe((response) => {
      console.log(response, this.list);
      this.list = response;
    })
    // http://jsfiddle.net/echo/jsonp/?callback=JSONP_CALLBACK
    //return this.jsonp.request('http://jsfiddle.net/echo/jsonp/?callback=JSONP_CALLBACK')
    // return this.jsonp.request('http://localhost:8080/main?callback=JSONP_CALLBACK')
    //   .map(res => res.json())
    //   .subscribe((response) => {
    //     console.log(response);
    //     this.list = response;
    //   }, (error) => {
    //     console.error(error);
    //   });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  search(event) {
    console.log(event.target.value);
    this.kflService.KflJsonP('/search', 'name=' + event.target.value).subscribe((response: any) => {
      this.list = response;
    })
  }

  loadMore(infinite) {
    console.log('load more');
    this.kflService.KflJsonP('/main', "start=" + this.list.length).subscribe((response) => {
      console.log(response, this.list);
      this.list = this.list.concat(response);
      infinite.complete();
    })
  }



  jumpToDetail(did) {
    this.navCtrl.push(DetailPage, { id: did });
  }
}
