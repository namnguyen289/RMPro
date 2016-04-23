import {Page, NavController, NavParams} from 'ionic-angular';
import {ListPage} from '../list/list';

@Page({
  templateUrl: 'build/pages/intro/intro.html'
})
export class IntroPage {
   static get parameters() {
    return [[NavController], [NavParams]];
  }
  constructor(nav, navParams) {
  	this.nav = nav;
  	this.slides = [
    {
      title: "Restaurant",
      description: "We love food, lots of different food, just like you.",
      image: "img/intro_bg1.jpg",
      lastFlg:false
    },
    {
      title: "Coffee",
      description: "Bring home the coffee they serve in award winning restaurants.",
      image: "img/intro_bg2.jpg",
      lastFlg:true
    }
  ];
  }
  shownIntro($event){
    this.nav.setRoot(ListPage);
  }
}
