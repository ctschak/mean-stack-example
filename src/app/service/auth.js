mainApp.factory('auth', ['$http','$window', function($http, $window) {

  var auth = {};

  auth.saveToken = function(token){
     $window.localStorage['mainApp-token'] = token;
  };

  auth.getToken = function(){
     return $window.localStorage['mainApp-token'];
  }

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      console.log("isLoggedIn -- "+token);
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp >Date.now() / 1000;
    }else{
      return false;
    }
  };

  auth.currentUser = function(){
    console.log("currentUser auth.isLoggedIn-- "+auth.isLoggedIn());
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      console.log("currentUser -- "+token);
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    console.log("Inside Auth LogIn -- "+ JSON.stringify(user));
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(user){
    $window.localStorage.removeItem('mainApp-token');
  };
  return auth;

}]);
