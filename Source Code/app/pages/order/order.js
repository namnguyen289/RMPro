import {Page, NavController, NavParams} from 'ionic-angular';
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
    this.selectedItem = navParams.get('item');
    this.title = this.selectedItem.mn_nm;
    this.http.get('/data/orders?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
          this.orderList = data.data;
      });
  }
}