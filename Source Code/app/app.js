import {App, IonicApp,Events, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {UserData} from './providers/user-data';
import {ConferenceData} from './providers/conference-data';
import {MenuPage} from './pages/list-menu/list-menu';
import {IntroPage} from './pages/intro/intro';
import {MenuManagementPage} from './pages/manage/menu/menu-management';
import {ListEmployeePage} from './pages/employees/list-employee/list-employee';
import {TablePage} from './pages/table/list-table/list-table';
import {OrderListPage} from './pages/order/order';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';

@App({
  templateUrl: 'build/app.html',
  providers: [UserData,ConferenceData],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  static get parameters() {
    return [[IonicApp],  [Events], [Platform], [MenuController], [UserData],[ConferenceData]];
  }

  constructor(app, events, platform, menu,userData,confData) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.events = events;
    this.menu = menu;
    this.loggedIn = false;
    this.userData = userData;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      {title: 'Intro', component: IntroPage},
      { title: 'Menu', component: MenuPage },
      { title: 'Menu Setting', component: MenuManagementPage },
      { title: 'Table', component: TablePage },
      { title: 'Employees', component: ListEmployeePage },
      { title: 'Order', component: OrderListPage}
    ];

    this.loggedInPages = [
      { title: 'Logout', component: TablePage, icon: 'log-out' }
    ];

    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'Signup', component: SignupPage, icon: 'person-add' }
    ]

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.loggedIn = (hasLoggedIn == 'true');
    });

    this.listenToLoginEvents();

    // make the root (or first) page
    this.rootPage = TablePage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:signup', () => {
      this.loggedIn = true;
    });

    this.events.subscribe('user:logout', () => {
      this.loggedIn = false;
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');

    if (page.index) {
      nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
}
