angular.module('Cabbooking').controller('HomeController',function($scope,$location){


  $scope.check=function($scope)
  {

var cust1=sessionStorage.getItem('cust_id');
var driver1=sessionStorage.getItem('driver_id');
var admin1=sessionStorage.getItem('admin_id');
if(cust1)
{
  $location.path('/booking');
}
else if(driver1){
  $location.path('/driverhome');
}
else if(admin1)
{
  $location.path('/adminhome');
}
else{
  $location.path('/login');
}


    console.log("welcome to the controller");
  };
  //name();

});
