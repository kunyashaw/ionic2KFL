import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StartPage } from '../pages/start/start';
import { MainPage } from '../pages/main/main'
import { DetailPage } from '../pages/detail/detail'
import { OrderPage } from '../pages/order/order'
import { MyOrderPage } from '../pages/my-order/my-order'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;



  // make HelloIonicPage the root (or first) page
  rootPage = StartPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '起始页面', component: StartPage },
      { title: '菜品列表页面', component: MainPage },
      { title: '详情页面', component: DetailPage },
      { title: '表单提交页面', component: OrderPage },
      { title: '个人订单页面', component: MyOrderPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
