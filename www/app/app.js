(function(){
  'use strict';
  angular.module('app', ['ionic'])
    .config(configBlock)
    .run(runBlock);

  function configBlock($stateProvider, $urlRouterProvider, $provide){
    // $ionicConfigProvider.views.transition('none');

    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/layout/layout.html',
      controller: 'LayoutCtrl'
    })

    .state('app.cities', {
      url: '/cities',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/cities.html',
          controller: 'CitiesCtrl'
        }
      }
    })
    .state('app.groups', {
      url: '/groups',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/groups.html',
          controller: 'GroupsCtrl'
        }
      }
    })
    .state('app.group', {
      url: '/group/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/group.html',
          controller: 'GroupCtrl'
        }
      }
    })
    .state('app.events', {
      url: '/events/:country/:city',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/events.html',
          controller: 'EventsCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/loading');
  }

  function runBlock($rootScope){
    $rootScope.safeApply = function(fn){
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if(phase === '$apply' || phase === '$digest'){
        if(fn && (typeof(fn) === 'function')){
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }
})();
