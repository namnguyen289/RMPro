import {IonicApp, Page, NavController} from 'ionic-angular';
import {TablePage} from '../table/list-table/list-table';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';
import {FirebaseService} from '../../providers/firebaseService';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  static get parameters() {
    return [[NavController], [UserData],[FirebaseService]];
  }

  constructor(nav, userData,FBService) {
    this.nav = nav;
    this.userData = userData;
    this.FBService = FBService;

    this.login = {};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      // this.userData.login(this.login.username,this.login.password);
      this.FBService.login(this.login.username,this.login.password).subscribe((data)=>{
           console.log("the data", data);
           this.nav.setRoot(TablePage);
         });
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
