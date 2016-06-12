import { IonicApp, Page, NavController } from 'ionic-angular';
import { TablePage } from '../table/list-table/list-table';
import { SignupPage } from '../signup/signup';
import { UserData } from '../../providers/user-data';
import { FirebaseService } from '../../providers/firebaseService';
import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl } from 'angular2/common';


@Page({
    templateUrl: 'build/pages/login/login.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginPage {
    static get parameters() {
        return [
            [NavController],
            [UserData],
            [FirebaseService],
            [FormBuilder]
        ];
    }

    constructor(nav, userData, FBService, formBuilder) {
        this.nav = nav;
        this.userData = userData;
        this.FBService = FBService;
        this.formBuilder = formBuilder;
        this.login = {};
        this.submitted = false;
        this.authForm = formBuilder.group({
            'email': ['', Validators.compose([Validators.required, this.checkEmailValidator])],
            'password': ['', Validators.compose([Validators.required
              // , Validators.minLength(8)
              ])]
        });

        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
    }

    onSubmit(value) { 
      this.submitted = true;

        if (this.authForm.valid) {
            // this.userData.login(this.login.username,this.login.password);
            this.FBService.login(this.email.value, this.password.value).subscribe((data) => {
                console.log("the data", data);
                this.nav.setRoot(TablePage);
            });
        }
  }

    checkEmailValidator(control){
      var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(control.value)) {
          return { checkEmailValidator: true };
      }
    }
    onSignup() {
        this.nav.push(SignupPage);
    }
}
