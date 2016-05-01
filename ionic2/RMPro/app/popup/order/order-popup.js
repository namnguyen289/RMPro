import {Page, Modal, NavController, ViewController} from 'ionic-angular';

@Page({
	templateUrl: 'Build/popup/order/orderPopup.html',
})
export class OrderPopupPage {
  static get parameters() {
    return [[NavController], [NavParams],[Http],[Modal]];
  }

  constructor(nav, navParams,http,modal) {
    this.nav = nav;
    this.http = http;
    this.modal =modal;
    this.title = 'Menu Setting';
    this.menu = navParams.get('item');
    if(this.menu){
      this.title = this.selectedItem.mn_nm;
      this.menu = this.selectedItem.sub_mn;
    }
  }
	dismiss() {
	  let data = { 'foo': 'bar' };
	  this.viewCtrl.dismiss(data);
	}
}