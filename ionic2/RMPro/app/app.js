import 'es6-shim';
import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {MenuPage} from './pages/list-menu/list-menu';
import {IntroPage} from './pages/intro/intro';
import {UserData} from './providers/user-data';

@App({
  templateUrl: 'build/app.html',
  providers: [UserData],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController], [UserData]];
  }

  constructor(app, platform, menu,userData) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.userData = userData;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Menu', component: MenuPage },
      { title: 'Intro', component: IntroPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = IntroPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
