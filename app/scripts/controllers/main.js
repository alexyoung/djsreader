'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function($scope, $http, $timeout, $filter) {
    function storyInCollection(story) {
      for (var i = 0; i < $scope.stories.length; i++) {
        if ($scope.stories[i].id === story.id) {
          return true;
        }
      }
      return false;
    }

    function addStories(stories) {
      var changed = false;
      angular.forEach(stories, function(story) {
        if (!storyInCollection(story)) {
          $scope.stories.push(story);
          changed = true;
        }
      });

      if (changed) {
        $scope.stories = $filter('orderBy')($scope.stories, 'date');
      }
    }

    $scope.refreshInterval = 60;
    $scope.feeds = [{
      url: 'http://dailyjs.com/atom.xml'
    }];
    $scope.stories = [];

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
          addStories(feed.items);
        }).
        error(function(data) {
          console.error('Error fetching feed:', data);
        });

      $timeout(function() { $scope.fetchFeed(feed); }, $scope.refreshInterval * 1000);
    };

    $scope.addFeed = function(feed) {
      if (feed.$valid) {
        // Copy this feed instance and reset the URL in the form
        var newFeed = angular.copy(feed);
        $scope.feeds.push(newFeed);
        $scope.fetchFeed(newFeed);
        $scope.newFeed.url = '';
      }
    };

    $scope.deleteFeed = function(feed) {
      $scope.feeds.splice($scope.feeds.indexOf(feed), 1);
    };

    $scope.fetchFeed($scope.feeds[0]);
  });
