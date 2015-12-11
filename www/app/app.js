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

    .state('app.listCities', {
      url: '/listCities',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/listCities.html',
          controller: 'ListCitiesCtrl'
        }
      }
    })
    .state('app.listGroups', {
      url: '/listGroups',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/listGroups.html',
          controller: 'ListGroupsCtrl'
        }
      }
    })
    .state('app.listEvents', {
      url: '/listEvents/:country/:city',
      views: {
        'menuContent': {
          templateUrl: 'app/meetup/listEvents.html',
          controller: 'ListEventsCtrl'
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
