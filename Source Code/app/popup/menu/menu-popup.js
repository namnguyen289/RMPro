import {Page, ViewController, NavParams, Alert} from 'ionic-angular';
import {UserData} from "../../providers/user-data";
import {Http} from 'angular2/http';
import {Dialogs} from 'ionic-native';
import 'rxjs/add/operator/map';

@Page({
	templateUrl: 'Build/popup/menu/menu-popup.html'
})
export class MenuPopupPage {
  static get parameters() {
    return [[ViewController], [Http], [UserData],[NavParams]];
  }

  constructor(viewCtrl,http,userData,navParams) {
    this.viewCtrl = viewCtrl;
    this.http = http;
    this.userData = userData;
    this.selectedItem = navParams.get('item');
    this.selectedType = navParams.get('type');
    var prf = "";

    switch(this.selectedType){
      case 'EDT': prf = "Edit Menu" + ': ' + this.selectedItem.mn_nm; break;
      case 'CUR': prf = "Add Menu"; break;
      case 'SUB': prf = "Add Sub Menu"; break;
      default: prf = "";
    }
    console.log(this.selectedItem);
    console.log(this.selectedType);

    this.title = prf;
    alert(prf, this.selectedType, 'HAHA');
  }

  removeOrder(event,item){
    this.userData.removeItem(item);
  }

  close() {
    this.viewCtrl.dismiss();
  }
  sendOrders(){
    alert('//todo');
  }
}