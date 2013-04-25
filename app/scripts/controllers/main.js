'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function($scope, $http) {
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'http%3A%2F%2Fdailyjs.com%2Fatom.xml'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";

    $http.jsonp(url).
      success(function(data, status, headers, config) {
        $scope.feed = {
          title: 'DailyJS',
          items: data.query.results.entry
        };
      }).
      error(function(data, status, headers, config) {
        console.error('Error fetching feed:', data);
      });
  });
