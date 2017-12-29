angular.module('Cabbooking').controller('LogoutController',function($scope,$http,$location,AuthenticationService,$rootScope){

var logout=function(){
AuthenticationService.Logout({

//  console.log("logout12");
})
  console.log("logout");
  var socket1 = io.connect('http://localhost:8080');
  //  socket1.emit('my other event', { lat :"huj" });
  socket1.disconnect();
    socket1.emit('disconnect', { hhh :"dsd" });
console.log(socket1.emit('disconnect', { hhh :"dsd" }));

  sessionStorage.clear();
  $rootScope.login=false;
  $rootScope.signup=false;
    $rootScope.booking=true;
    $rootScope.profile=true;
    $rootScope.tariff=true;
    $rootScope.addcab=true;
    $rootScope.driverhome=true;
    $rootScope.invoice=true;
    $rootScope.custtariff=true;

    $rootScope.logout=true;
    $rootScope.adminhome=true;
    $rootScope.changepassword=true;
    $rootScope.driverprofile=true;
    $rootScope.usernav=true;

    $location.path('/home');
}
logout();

})
