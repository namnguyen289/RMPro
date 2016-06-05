import {Page, NavParams, ViewController} from 'ionic-angular';

@Page({
	templateUrl: 'Build/popup/table-filter/table-filter.html'
})
export class TableFilterPopupPage {
  static get parameters() {
    return [[ViewController],[NavParams]];
  }

   constructor(viewCtrl,navParams) {
    this.viewCtrl = viewCtrl;
    this.navParams = navParams;    
    this.tbl_sts = this.navParams.get('tbl_sts');
    this.title = "Order List";
    this.excludeOptions = this.navParams.data;
    this.setView();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  apply(){
    this.viewCtrl.dismiss(this.excludeOptions);
  }
  setView(){
    this.tbl_sts = this.navParams.get('tbl_sts');
    this.tbl_lvl = this.navParams.get('tbl_lvl');
  }
}