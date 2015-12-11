(function(){
  'use strict';
  angular.module('app')
    .controller('EventsCtrl', EventsCtrl);

  function EventsCtrl($stateParams, $scope, MeetupApi){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      updateEvents();
    });

    fn.refreshEvents = function(){
      updateEvents();
    };

    function updateEvents(){
      MeetupApi.getEvents($stateParams.country, $stateParams.city).then(function(events){
        console.log('events', events);
        data.events = events;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
})();
