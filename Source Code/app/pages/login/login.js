import {IonicApp, Page, NavController} from 'ionic-angular';
import {TablePage} from '../table/list-table/list-table';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UserData]];
  }

  constructor(nav, userData) {
    this.nav = nav;
    this.userData = userData;

    this.login = {};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login();
      this.nav.setRoot(TablePage);
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
