import {Page, NavController, NavParams} from 'ionic-angular';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/employees/list-employee/list-employee.html'
})
export class ListEmployeePage {
   static get parameters() {
    return [[NavController], [NavParams],[Http]];
  }
  constructor(nav, navParams,http) {
  	this.nav = nav;
    this.http = http;
    this.users = [];
      this.title = 'List User';
    this.http.get('/data/employee?res_id=' + 'FIRST_RES').map(res => res.json()).subscribe(data => {
          this.users = data.data;
        },
        err => {
          console.log("Oops!");
        });
  }
}
