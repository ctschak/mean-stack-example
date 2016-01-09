mainApp.controller('postCtrl', function ($scope, $rootScope, $log, $state, $stateParams, posts,post,auth) {

    'use strict';
    $log.info('+ postCtrl()');
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.post = post;

    console.log("inside postCtrl "+ JSON.stringify($scope.post));
    $scope.addComment = function () {
          if ($scope.body === '') {
              return;
          }
          posts.addComment(post._id, {
              body: $scope.body,
              author: 'user'
          }).success(function (comment) {
              $scope.post.comments.push(comment);
          });
          $scope.body = '';
      };
    $scope.incrementVotes = function(comment){
      //post.upvotes += 1;
      posts.upvoteComment(post, comment);
    }

});
