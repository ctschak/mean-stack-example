mainApp.controller('AuthCtrl', function ($scope, $rootScope, $log, $state, $stateParams, auth) {

    'use strict';
    $log.info('+ AuthCtrl()');

    $scope.user = {};


    $scope.register = function () {
      auth.register($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });

    };
    $scope.logIn = function(){
      auth.logIn($scope.user).error(function(error){
        $scope.error = error;
      }).then(function(){
        $state.go('home');
      });

    };

});
