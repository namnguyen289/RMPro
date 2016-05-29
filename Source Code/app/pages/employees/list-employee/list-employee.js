import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/employees/list-employee/list-employee.html'
})
export class ListEmployeePage {
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
