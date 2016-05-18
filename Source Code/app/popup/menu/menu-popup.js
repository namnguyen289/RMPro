import {Page, ViewController, NavParams} from 'ionic-angular';
import {Camera} from 'ionic-native';

@Page({
	templateUrl: 'Build/popup/menu/menu-popup.html'
})
export class MenuPopupPage {
  static get parameters() {
    return [[ViewController], [NavParams]];
  }

  constructor(viewCtrl,navParams) {
    this.viewCtrl = viewCtrl;
    this.selectedItem = '';//navParams.get('item');
    this.selectedType = '';//navParams.get('type');
    this.image = null;
    this.menuitem = {mn_nm:'Breakfast',bg_img:'/img/category/1.jpg',mn_dsc:'Enthusiastically architect.'};
    var prf = "";

    switch(this.selectedType){
      case 'EDT': prf = "Edit Menu" + ': ' + this.selectedItem.mn_nm; break;
      case 'CUR': prf = "Add Menu"; break;
      case 'SUB': prf = "Add Sub Menu"; break;
      default: prf = "";
    }

    this.title = prf;
  }  
  close() {
    this.viewCtrl.dismiss();
  }
  tabtopics(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 200,
        sourceType        : Camera.PictureSourceType.SAVEDPHOTOALBUM
    }).then((imageData) => {
      // imageData is a base64 encoded string
      
        // console.log(imageData);
        this.image = "data:image/jpeg;base64," + imageData;
        this.menuitem.bg_img = "data:image/jpeg;base64," + imageData;
        // console.log(this.image);
    }, (err) => {
        console.log(err);
    });
  }
}