import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/order/order.html'
})
export class OrderListPage {
  static get parameters() {
    return [[NavController], [NavParams],[Http]];
  }

  constructor(nav, navParams,http) {
    this.nav = nav;
    this.http = http;
    this.orderList = null;
    // this.selectedItem = navParams.get('item');
    // this.title = this.selectedItem.mn_nm;
    // this.http.get('/data/listfood?res_id=' + 'FIRST_RES' + '&mn_id=' + this.selectedItem.mn_id).map(res => res.json()).subscribe(data => {
    //       this.foods = data.data;
    //   });
  }
  getOrderList(){
    return this.orderList;
  }
}