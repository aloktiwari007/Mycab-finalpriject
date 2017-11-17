angular.module('Cabbooking').controller('RegisterController',function($scope,$http,$location){

$scope.register=function(){
  var pass=$scope.data.password;
  var cfnpass=$scope.data.cnfPassword
  if(pass==cfnpass)
  {
    $scope.data.type="Customer";
  $http.post('/api/signup',$scope.data).then(function(response){
    console.log(response);

    if(response.data.success==true)
    {
    alert('registered');
    $location.path('/driverhome');
    }
    else {
      alert("email id already exist");
    }

  });
}
else {
  alert("password and confirm password not match");
}
}


});
