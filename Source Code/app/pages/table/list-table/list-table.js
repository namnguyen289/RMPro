import { Page, NavController, NavParams, Modal } from 'ionic-angular';
import { Http } from 'angular2/http';
import {TableFilterPopupPage} from '../../../popup/table-filter/table-filter';
import { FirebaseService } from '../../../providers/firebaseService';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: 'build/pages/table/list-table/list-table.html'
})
export class TablePage {
    static get parameters() {
        return [
            [NavController],
            [NavParams],
            [Http],
            [FirebaseService]
        ];
    }
    constructor(nav, navParams, http,FBService) {
        this.nav = nav;
        this.http = http;
        this.title = 'Table';
        this.FBService = FBService;
        this.data = null;
        this.excludeOptions = {
          tbl_sts:['BOOKED','AVALIBLE','USING']
          ,tbl_lvl:['VIP','GENERAL']
        }
        this.excludeOptionsApplied = JSON.parse(JSON.stringify(this.excludeOptions));
        this.table = [];
        this.query = "";
        this.http.get('/data/tables?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
                this.data = data.data;
                this.table = Object.assign([], this.data);
            },
            err => {
                console.log("Oops!");
            });
    }
    ngOnDestroy() {
     }
 
     ngOnInit() {       
     }

    itemTapped(event, item) {
    }

    presentFilter(){
      let modal = Modal.create(TableFilterPopupPage, this.excludeOptions);
      this.nav.present(modal);

      modal.onDismiss(data => {
        if (data) {
          this.excludeOptionsApplied = data;
          this.updateView();
        }
      });
    }

    queryChange(searchbar){
      var q = searchbar.value;
      this.query = q;
      this.updateView();
    }
    updateView(){
      let q = this.query;
      this.table = JSON.parse(JSON.stringify(this.data));
      if (q.trim() == '') {
        return;
      }
     for (var i = this.table.length - 1; i >= 0; i--) {
         let zone =this.table[i];
         zone.tables = zone.tables.filter((val)=>{
          let isMatch = false;
          if(isEmpty(val.tbl_nm))return true;
          let tbl_nm = bodauTiengViet(val.tbl_nm).toLowerCase();
          let query = bodauTiengViet(this.query).toLowerCase();
          if(tbl_nm != undefined && tbl_nm.indexOf(query) > -1) return true;
          let frstWrds = tbl_nm.split(' ');
          let frstWrd = '';
          frstWrds.forEach(function(element) {
              frstWrd = frstWrd + '' + element.charAt(0);
          }, this);
          if(frstWrd.indexOf(this.query) > -1) return true;
          
          return isMatch;
         });
         this.table[i] = zone;
      }
    }
}