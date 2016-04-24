import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/manage/menu/menu-management.html'
})
export class MenuManagementPage {
  static get parameters() {
    return [[NavController], [NavParams],[Http]];
  }

  constructor(nav, navParams,http) {
    this.nav = nav;
    this.http = http;
    this.menu = null;
    this.title = 'Menu Setting';
    this.selectedItem = navParams.get('item');
    if(this.selectedItem){
      this.title = this.selectedItem.mn_nm;
      this.menu = this.selectedItem.sub_mn;
    }else{
      this.http.get('/data/menu?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
          this.menu = data.data;
      });
    }
  }

  itemTapped(event, item) {
    if(item.sub_mn !== undefined && item.sub_mn.length > 0){
      this.nav.push(MenuManagementPage, {
       item: item
     });
    }
  }
  moveItem(item, fromIndex, toIndex) {
    //Move the item in the array
    this.menu.splice(fromIndex, 1);
    this.menu.splice(toIndex, 0, item);
  };
}
