import {Page, Modal, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {OrderPopupPage} from '../../popup/order/order-popup';
import {UserData} from "../../providers/user-data";
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/list-food/list-food.html'
})
export class ListFoodPage {
  static get parameters() {
    return [[NavController], [NavParams],[Http], [UserData]];
  }

  constructor(nav, navParams,http,userData) {
    this.nav = nav;
    this.http = http;
    this.userData = userData;
    this.selectedItem = navParams.get('item');
    this.title = this.selectedItem.mn_nm;


    this.http.get('/data/listfood?res_id=' + 'FIRST_RES' + '&mn_id=' + this.selectedItem.mn_id).map(res => res.json()).subscribe(data => {
          this.foods = data.data;
      });
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  placeOrder(event,item){
    this.userData.addItem(item);
  }
  removeOrder(event,item){
    this.userData.removeItem(item);
  }
  showModal() {
    let modal = Modal.create(OrderPopupPage);
    this.nav.present(modal);
  }
}
