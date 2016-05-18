import {Page, NavController, NavParams} from 'ionic-angular';
import {ListFoodPage} from '../list-food/list-food';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/list-menu/list-menu.html'
})
export class MenuPage {
  static get parameters() {
    return [[NavController], [NavParams],[Http]];
  }

  constructor(nav, navParams,http) {
    this.nav = nav;
    this.http = http;
    this.menu = null;
    this.title = 'Menu';
    this.selectedItem = navParams.get('item');
    if(this.selectedItem){
      this.title = this.selectedItem.mn_nm;
      this.menu = this.selectedItem.sub_mn;
    }else{
      this.http.get('/data/menu?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
          this.menu = data.data;
      },
    err => {
        console.log("Oops!");
    });
    }
  }

  itemTapped(event, item) {
    if(item.sub_mn === undefined || item.sub_mn.length == 0){
      this.nav.push(ListFoodPage, {
       item: item
     });
    }else{
     this.nav.push(MenuPage, {
       item: item
     });
   }
  }
}
