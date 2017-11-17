angular.module('Cabbooking').controller('LoginController',function($scope,$http,$location,AuthenticationService,$rootScope){

$scope.login=function(){

  AuthenticationService.Login($scope.user, function (response) {
    console.log(response.data.success);
              if (response.data.success == true) {

                console.log("welcome to the page");
                  if(response.data.udata.Usertype=="Customer")
                  {
                    sessionStorage.setItem('cust_id',response.data.udata.Email);
                    sessionStorage.setItem('cust_name',response.data.udata.Name);
                      sessionStorage.setItem('nav',true);
                  //  $rootScope.a=true;
                      $location.path('/booking');

                      $rootScope.booking=false;
                      $rootScope.invoice=false;
                      $rootScope.login=true;
                       $rootScope.profile=false;
                       $rootScope.tariff=true;
                       $rootScope.custtariff=false;
                      $rootScope.logout=false;
                    //  $rootScope.login=true;
                    $rootScope.addcab=true;
                    $rootScope.driverhome=true;

                      $rootScope.signup=true;

                      console.log("page refress");
                      $rootScope.adminhome=true;
                      $rootScope.changepassword=false;
                      $rootScope.driverprofile=true;
                      $rootScope.usernav=false;
                      $rootScope.custname1=response.data.udata.Name;





                  }

                  else if(response.data.udata.Usertype=="driver")
                  {
                    sessionStorage.setItem('driver_id',response.data.udata.Email);
                      sessionStorage.setItem('driver_name',response.data.udata.Name);

                        $rootScope.invoice=true;
                    $rootScope.driverhome=false;
                    $rootScope.logout=false;
                    $rootScope.addcab=true;
                    $rootScope.booking=true;
                    $rootScope.login=true;
                     $rootScope.profile=true;
                     $rootScope.tariff=true;
                    $rootScope.logout=false;
                    $rootScope.signup=true;
                    $rootScope.custtariff=true;
                $rootScope.adminhome=true;
                $rootScope.changepassword=false;
                $rootScope.driverprofile=false;
                $rootScope.usernav=false;
                $rootScope.custname1=response.data.udata.Name;

                $location.path('/driverhome');



                  }
                  else if(response.data.udata.Usertype=="Admin")
                  {
                      sessionStorage.setItem('admin_id',response.data.udata.Email);
                        sessionStorage.setItem('admin_name',response.data.udata.Name);




                    console.log("welocme admin");
                    $rootScope.invoice=true;
                    $rootScope.driverhome=true;
                    $rootScope.logout=false;
                    $rootScope.addcab=false;
                    $rootScope.booking=true;
                    $rootScope.login=true;
                     $rootScope.profile=true;
                     $rootScope.custtariff=true;
                     $rootScope.tariff=false;
                    $rootScope.signup=true;
                    $rootScope.adminhome=false;
                    $rootScope.changepassword=false;
                    $rootScope.driverprofile=true;
                    $rootScope.usernav=false;
                    $rootScope.custname1=response.data.udata.Name;
                    $location.path('/adminhome');
                  }
                  else {
                    alert("invalid user");
                  }
              //  console.log(response.data.udata.Usertype);

              }
              else {
                alert("Invalid Email ID or Password");
              }
          });
        }


        $scope.register=function()
        {
          console.log("welom");
          $location.path('/signup');
        }
      });

//$http.post('/api/login',$scope.user).then(function (response) {

//   console.log("this is "+response.data.isLoggedIn);
//   if(response.data.isLoggedIn)
//   {
//     sessionStorage.setItem('checklogin', response.data.isLoggedIn);
//
//     $location.path('/booking');
//   }
//   else {
//     sessionStorage.setItem('checklogin', 'false');
//     $location.path('/login');
//   }
//   $scope.udata=response.data.udata;
//
//   console.log($scope.udata);
// });

//}

//});
