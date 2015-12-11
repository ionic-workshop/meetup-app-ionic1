(function(){
  'use strict';
  angular.module('app')
    .controller('EventCtrl', EventCtrl);

  function EventCtrl($stateParams, $scope, MeetupApi){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    console.log('eventId', $stateParams.eventId);
    MeetupApi.getGroup($stateParams.eventId).then(function(group){
      console.log('group', group);
      data.group = group;
    });
  }
})();
