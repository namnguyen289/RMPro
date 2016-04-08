// Ionic Hoss - Restaurant App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('hoss_app', ['ionic', 'hoss_app.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('intro', {
                url: "/intro",
                templateUrl: "templates/intro.html",
                controller: 'IntroCtrl'
            })

            // MAIN APP
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/app/ion_nav_view.html",
                controller: 'AppCtrl'
            })
            .state('app.category', {
                url: "/category",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/category.html"
                    }
                }
            })
            .state('app.restaurant_menu', {
                url: "/restaurant/menu",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/restaurant/menu.html"
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/settings.html"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuAppContent': {
                        templateUrl: "templates/app/profile.html"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/intro');
    });
