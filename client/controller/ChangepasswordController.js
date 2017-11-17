angular.module('Cabbooking').controller('ChangepasswordController',function ($scope,$http,$location,$sessionStorage,AuthenticationService) {

$scope.changepassword=function()
{
var a=$scope.user.npassword;

var b=$scope.user.cppassword;
var cust=sessionStorage.getItem("cust_id");
var driver=sessionStorage.getItem("driver_id");
var admin=sessionStorage.getItem("admin_id");
if(cust!=null)
{
  console.log(cust);
$scope.user.email=cust;
}
else if(driver!=null)
{
  console.log(driver);
  $scope.user.email=driver;
}
else if(admin!=null)
{
  console.log(admin);
  $scope.user.email=admin;
}






if(a!=b)
{
  alert("password and confirm password not match")
}
else {
//$scope.user.password

if(cust!=""||driver!=""||admin!="")
{


AuthenticationService.Login($scope.user, function (response) {
    console.log(response);
            if (response.data.invalid !=true) {

                
                $scope.email=$scope.user.email;

                $http.put('/api/signup/'+$scope.email,$scope.user).then(function(response){

                  console.log(response);
                  if(response.statusText=="OK")
                  {
                    alert("Password updated successfully");
                  }
                  else {
                    alert("Password not updated kindly try angain");
                  }



                })

            }
            else{
              alert("Invalid password");
            }
          })
}
}

}



})
