(function(){
  'use strict';
  angular.module('app')
    .controller('GroupCtrl', GroupCtrl);

  function GroupCtrl($stateParams, $scope, MeetupApi){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    console.log('groupId', $stateParams.groupId);
    MeetupApi.getGroup($stateParams.groupId).then(function(group){
      console.log('group', group);
      data.group = group;
    });
  }
})();
