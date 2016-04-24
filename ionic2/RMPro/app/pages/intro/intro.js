import {Page, NavController, NavParams} from 'ionic-angular';
import {MenuPage} from '../list-menu/list-menu';

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
      image: "img/intro_bg1.jpg"
    },
    {
      title: "Coffee",
      description: "Bring home the coffee they serve in award winning restaurants.",
      image: "img/intro_bg2.jpg"
    }
  ];
  }
  shownIntro($event){
    this.nav.setRoot(MenuPage);
  }
}
