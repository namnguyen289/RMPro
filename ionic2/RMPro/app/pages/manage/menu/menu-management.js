import {Page, Modal, NavController, NavParams, Alert} from 'ionic-angular';
import {MenuPopupPage} from '../../../popup/menu/menu-popup';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/manage/menu/menu-management.html'
})
export class MenuManagementPage {
  static get parameters() {
    return [[NavController],[NavParams],[Http]];
  }

  constructor(nav,navParams,http) {
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
     if(item.sub_mn !== undefined && item.sub_mn.length != 0){
     this.nav.push(MenuManagementPage, {
       item: item
     });
   }
  }
  editMenu(event, item) {
    let menuPopup = Modal.create(MenuPopupPage,{item:item,type:'EDT'});
    this.nav.present(menuPopup);
  }
  addMenu(event,item) {
    let menuPopup = Modal.create(MenuPopupPage, {item:item,type:'CUR'});
    this.nav.present(menuPopup);
  }
  addSubMenu(event, item) {
    let menuPopup = Modal.create(MenuPopupPage,{item:item,type:'SUB'});
    this.nav.present(menuPopup);
  }
  removeMenu(event, item) {
    let confirm = Alert.create({
      title:'Deleting Confirm',
      subTitle:'Would you like to remove meunu: ' + item.mn_nm + '?',
      buttons:[
        {
          text:'Yes',
          handler:()=>{
            confirm.dismiss().then(()=>{
              alert('aaaaa');
            })
          }
        }
      ,'No']
    });
    this.nav.present(confirm);
  }
  // moveItem(item, fromIndex, toIndex) {
  //   // //Move the item in the array
  //   // this.menu.splice(fromIndex, 1);
  //   // this.menu.splice(toIndex, 0, item);
  // };
}
