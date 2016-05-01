import {Page, Modal, NavController, NavParams} from 'ionic-angular';
import {OrderPopupPage} from '../../../popup/order/order-popup';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/manage/menu/menu-management.html'
})
export class MenuManagementPage {
  static get parameters() {
    return [[NavController],[Http]];
  }

  constructor(nav) {
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
      console.log(this.menu);
    }
  }
showModal() {
    let modal = Modal.create(OrderPopupPage);
    this.nav.present(modal);
  }
  // itemTapped(event, item) {
  //    if(item.sub_mn !== undefined && item.sub_mn.length != 0){
  //    this.nav.push(MenuManagementPage, {
  //      item: item
  //    });
  //  }
  // }
  // editMenu(event, item) {
  //   let orderPopup = Modal.create(OrderPopupPage);
  //   this.nav.present(orderPopup,{item:item,type:'EDT'});
  // }
  // addMenu(event,item) {
  //   let orderPopup = Modal.create(OrderPopupPage);
  //   // this.nav.present(orderPopup, {item:item,type:'CUR'});
  // }
  // addSubMenu(event, item) {
  //   let orderPopup = Modal.create(OrderPopupPage);
  //   this.nav.present(orderPopup,{item:item,type:'SUB'});
  // }
  // removeMenu(event, item) {
    
  // }
  // moveItem(item, fromIndex, toIndex) {
  //   // //Move the item in the array
  //   // this.menu.splice(fromIndex, 1);
  //   // this.menu.splice(toIndex, 0, item);
  // };
}
