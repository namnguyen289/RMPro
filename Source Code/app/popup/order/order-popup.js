import {Page, ViewController} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
	templateUrl: 'Build/popup/order/order-popup.html'
})
export class OrderPopupPage {
  static get parameters() {
    return [[ViewController],[Http], [UserData]];
  }

   constructor(viewCtrl,http,userData) {
    this.viewCtrl = viewCtrl;
    this.http = http;
    this.userData = userData;
    this.title = "Order List";
    this.foods = userData._orders;
  }

  removeOrder(event,item){
    this.userData.removeItem(item);
  }

  close() {
    this.viewCtrl.dismiss();
  }
  calTotal(order){
    let total = 0;
    for(var i = 0; i < order.length; i++){
        var product = order[i].food;
        total += (product.prd_prc * (!order[i].quantity?0:order[i].quantity));
    }
    return total;
  }
  sendOrders(){
    alert('//todo');
  }
}