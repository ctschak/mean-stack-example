mainApp.controller('homeCtrl', function ($scope, $rootScope, $log, $state, $stateParams, posts, auth) {
//mainApp.controller('homeCtrl', ['$scope', 'posts','$log',function($scope, posts, $log){
    'use strict';
    $log.info('+ homeCtrl()');

    $scope.test="ANGULAR TEST homeCtrl";
    $scope.isLoggedIn = auth.isLoggedIn;
    /*$scope.posts=[
      {title: "post 1", link: "", upvotes:2},
      {title: "post 2", link: "", upvotes:3},
      {title: "post 3", link: "", upvotes:1},
      {title: "post 4", link: "", upvotes:5},
      {title: "post 5", link: "", upvotes:4},
    ];*/
  //  posts.getAll()
    $scope.posts = posts.posts;
    console.log("inside homeCtrl posts"+  $scope.posts );
    $scope.addPost = function(){
      //prevents null entry
      if(!$scope.title && $scope.title===""){return;}
      //update posts object

    /*  $scope.posts.push(
        {title: $scope.title,
         link: $scope.link,
         upvotes: 0,
         comments: [
             {author: 'Joe', body: 'Cool post!', upvotes: 0},
             {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
           ]
        });*/

        posts.create({
          title: $scope.title,
          link: /^(http?):\/\//i.test($scope.link) ? $scope.link : 'http://'+$scope.link,
        });

      $scope.title="";
      $scope.link="";
    }
    $scope.incrementVotes = function(post){
      //post.upvotes += 1;
      posts.upvote(post);
    }
    $scope.setPost = function(post){
      $rootScope.post = post;
    }

});
