import { Page, NavController, NavParams } from 'ionic-angular';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: 'build/pages/table/list-table/list-table.html'
})
export class TablePage {
    static get parameters() {
        return [
            [NavController],
            [NavParams],
            [Http]
        ];
    }
    constructor(nav, navParams, http) {
        this.nav = nav;
        this.http = http;
        this.title = 'Table';
        this.data = null;
        this.table = [];
        this.query = "";
        this.http.get('/data/tables?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
                this.data = data.data;
                // for (var i = this.data.length - 1; i >= 0; i--) {
                //    var zone = this.data[i];
                //    zone.tables = zone.tables.filter(this.filterTables);
                //    this.table[i] = zone;
                // };
                this.table = Object.assign([], this.data);
                // console.log(this.table);
                // console.log(data.data);                
                // console.log(Object.assign([], this.data));
            },
            err => {
                console.log("Oops!");
            });
    }
    itemTapped(event, item) {
        // if (item.sub_mn === undefined || item.sub_mn.length == 0) {
        //     this.nav.push(OrderPage, {
        //         item: item
        //     });
        // }
    }
    // filterTables(val){
    //   var isMatch = false;
    //   if(val.tbl_nm === undefined)isMatch = true;
    //   if(val.tbl_nm != undefined && val.tbl_nm.toLowerCase().indexOf(this.query) > -1)isMatch = true;
    //   return isMatch;
    // }
    queryChange(searchbar){
       var q = searchbar.value;
       this.table = JSON.parse(JSON.stringify(this.data));
      if (q.trim() == '') {
        return;
      }
     for (var i = this.table.length - 1; i >= 0; i--) {
         let zone =this.table[i];
         zone.tables = zone.tables.filter((val)=>{
          let isMatch = false;
          if(val.tbl_nm === undefined)return true;
          if(val.tbl_nm != undefined && val.tbl_nm.toLowerCase().indexOf(this.query.toLowerCase()) > -1) return true;
          let frstWrds = val.tbl_nm.split(' ');
          let frstWrd = '';
          frstWrds.forEach(function(element) {
              frstWrd = frstWrd + '' + element.charAt(0);
          }, this);
          if(frstWrd.toLowerCase().indexOf(this.query.toLowerCase()) > -1) return true;
          
          return isMatch;
         });
         this.table[i] = zone;
      };
    }
}