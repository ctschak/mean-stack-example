
var mainApp = angular.module("mainApp",[
	'ui.router'
]);

mainApp.config(function ($stateProvider, $urlRouterProvider ) {
    'use strict';


    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.tpl.html',
            controller: 'homeCtrl',
						resolve : {
								postPromise : ['posts',
								function(posts) {
									return posts.getAll();
								}]

							}
				})
				.state('posts', {
            url: '/posts/:id',
            templateUrl: 'app/posts/posts.tpl.html',
            controller: 'postCtrl',
						resolve : {
							post : ['$stateParams', 'posts',
							function($stateParams, posts) {
								return posts.get($stateParams.id);
							}]

						}
        })
				.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.tpl.html',
            controller: 'AuthCtrl',
						onEnter : ['$state', 'auth', function($state, auth){
							if(auth.isLoggedIn()){
								$state.go('home');
							}
						}]
        })
				.state('register', {
            url: '/register',
            templateUrl: 'app/login/register.tpl.html',
            controller: 'AuthCtrl',
						onEnter : ['$state', 'auth', function($state, auth){
							if(auth.isLoggedIn()){
								$state.go('home');
							}
						}]
        })
	      ;

        //Re-directs
        $urlRouterProvider.otherwise('login');

});
mainApp.run(function ($log, $rootScope, $state, $urlRouter,$location) { // Inject Service to load data
    $log.debug("mainApp.run");
    $state.transitionTo('login');
});
