(function(){
  'use strict';
  angular.module('app')
    .factory('MeetupApi', MeetupApi)
    .factory('Http', Http);

  function MeetupApi(Http){
    var baseUrl = 'https://api.meetup.com';
    var apiKey = '73e3a2a3b7e46479683148666619';
    var cache = {};
    return {
      getCities: getCities,
      getGroups: getGroups,
      getGroup: getGroup,
      getEvents: getEvents
    };

    function getCities(){
      return Http.get(_buildUrl('/2/cities')).then(function(res){
        return res.data.results;
      });
    }
    function getGroups(){
      return Http.get(_buildUrl('/find/groups')).then(function(res){
        return res.data.data;
      });
    }
    function getGroup(id){
      return getGroups().then(function(groups){
        return _.find(groups, {id: parseInt(id)});
      });
    }
    function getEvents(country, city){
      return Http.get(_buildUrl('/2/open_events')+'&country='+country+'&city='+city).then(function(res){
        return res.data.results;
      });
    }
    function getEvent(id){
      return Http.get(_buildUrl('/2/events')+'&event_id='+id).then(function(res){
        console.log('res', res);
        return res.data.results;
      });
    }
    function _buildUrl(url){
      return baseUrl+url+'?sign=true&key='+apiKey+'&callback=JSON_CALLBACK';
    }
  }
  
  function Http($http, $q){
    var cache = {};
    var promiseCache = {};
    return {
      get: get
    };
    
    function get(url){
      if(cache[url]){
        return $q.when(angular.copy(cache[url]));
      } else if(promiseCache[url]){
        return promiseCache[url];
      } else {
        promiseCache[url] = $http.jsonp(url).then(function(res){
          cache[url] = res;
          delete promiseCache[url];
          return angular.copy(cache[url]);
        });
        return promiseCache[url];
      }
    }
  }
})();
