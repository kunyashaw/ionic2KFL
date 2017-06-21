import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StartPage } from '../pages/start/start';
import { MainPage } from '../pages/main/main'
import { DetailPage } from '../pages/detail/detail'
import { OrderPage } from '../pages/order/order'
import { MyOrderPage } from '../pages/my-order/my-order'
import { kflHttpClientService } from '../service/kflHttpClient'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    StartPage,
    DetailPage,
    OrderPage,
    MyOrderPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    DetailPage,
    OrderPage,
    MyOrderPage,
    MainPage
  ],
  providers: [
    kflHttpClientService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
