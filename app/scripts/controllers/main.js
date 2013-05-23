'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function($scope, $http, $timeout) {
    $scope.refreshInterval = 60;
    $scope.feeds = [{
      url: 'http://dailyjs.com/atom.xml'
    }];

    $scope.fetchFeed = function(feed) {
      feed.items = [];

      var apiUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'";
      apiUrl += encodeURIComponent(feed.url);
      apiUrl += "'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";

      $http.jsonp(apiUrl).
        success(function(data) {
          if (data.query.results) {
            feed.items = data.query.results.entry;
          }
        }).
        error(function(data) {
          console.error('Error fetching feed:', data);
        });

      $timeout(function() { $scope.fetchFeed(feed); }, $scope.refreshInterval * 1000);
    };

    $scope.addFeed = function(feed) {
      $scope.feeds.push(feed);
      $scope.fetchFeed(feed);
      $scope.newFeed = {};
    };

    $scope.deleteFeed = function(feed) {
      $scope.feeds.splice($scope.feeds.indexOf(feed), 1);
    };

    $scope.fetchFeed($scope.feeds[0]);
  });
