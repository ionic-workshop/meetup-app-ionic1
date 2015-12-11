(function(){
  'use strict';
  angular.module('app')
    .controller('ListGroupsCtrl', ListGroupsCtrl);

  function ListGroupsCtrl($scope, MeetupApi){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      updateGroups();
    });

    fn.refreshGroups = function(){
      updateGroups();
    };

    function updateGroups(){
      MeetupApi.getGroups().then(function(groups){
        console.log('groups', groups);
        data.groups = groups;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
})();
