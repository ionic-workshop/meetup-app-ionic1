(function(){
  'use strict';
  angular.module('app')
    .factory('MeetupApi', MeetupApi);

  function MeetupApi($http, $q){
    var baseUrl = 'https://api.meetup.com';
    var apiKey = '73e3a2a3b7e46479683148666619';
    return {
      getCities: getCities,
      getGroups: getGroups,
      getEvents: getEvents
    };

    function getCities(){
      return $http.jsonp(_buildUrl('/2/cities')).then(function(res){
        return res.data.results;
      });
    }
    function getGroups(){
      return $http.jsonp(_buildUrl('/find/groups')).then(function(res){
        return res.data.data;
      });
    }
    function getEvents(country, city){
      return $http.jsonp(_buildUrl('/2/open_events')+'&country='+country+'&city='+city).then(function(res){
        return res.data.results;
      });
    }
    function _buildUrl(url){
      return baseUrl+url+'?sign=true&key='+apiKey+'&callback=JSON_CALLBACK';
    }
  }
})();
