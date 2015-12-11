(function(){
  'use strict';
  angular.module('app')
    .controller('ListCitiesCtrl', ListCitiesCtrl);

  function ListCitiesCtrl($scope, MeetupApi){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      updateCities();
    });

    fn.refreshCities = function(){
      updateCities();
    };

    function updateCities(){
      MeetupApi.getCities().then(function(cities){
        console.log('cities', cities);
        data.cities = cities;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
})();
