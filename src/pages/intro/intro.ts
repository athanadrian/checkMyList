import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  slideOptions: any;

  constructor(public navCtrl: NavController) {

    this.slideOptions = {
      pager: true
    };
  }

  ionViewDidLoad() {
    console.log('Hello IntroPage Page');
  }

  startApp(){
    this.navCtrl.setRoot(HomePage);
  }

}
