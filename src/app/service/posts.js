mainApp.factory('posts', ['$http', 'auth', function ($http,auth) {
	'use strict';

		var o = {
		  posts: []
	  };

		o.getAll = function() {
				console.log("inside posts getAll");
	    	return $http.get('/posts').success(function(data){
				angular.copy(data, o.posts);
				console.log("inside posts getAll o.posts "+o.posts);
	    });
  	};
		o.create = function(post) {
			console.log("inside posts create");
		  return $http.post('/posts', post,{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
		    o.posts.push(data);
		  });
		};
		o.upvote = function(post) {
			console.log("inside posts upvote");
		  return $http.put('/posts/' + post._id + '/upvote',null,{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
		      post.upvotes += 1;
		    });
		};
		o.get = function(id) {
		  return $http.get('/posts/' + id).then(function(res){
		    return res.data;
		  });
		};

		o.addComment = function(id, comment) {
		  return $http.post('/posts/' + id + '/comments', comment,{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			});
		};

		o.upvoteComment = function(post, comment) {
		  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote',null,{
				headers: {Authorization: 'Bearer '+auth.getToken()}
			}).success(function(data){
		      comment.upvotes += 1;
		    });
		};
	 return o;

}]);
