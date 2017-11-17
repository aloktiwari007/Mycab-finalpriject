var app=angular.module('Cabbooking',['ngRoute','ngCookies','ngStorage']);
app.config(function($routeProvider, $locationProvider){

$routeProvider
  .when('/',{
      templateUrl:'views/home.html',
      controller:'HomeController'


  })
  .when('/booking',{
      templateUrl:'views/booking.html',
      controller:'BookingController'


  })
  .when('/home',{
      templateUrl:'views/home.html',
      controller:'HomeController'


  })
  .when('/signup',{
      templateUrl:'views/register.html',
      controller:'RegisterController'


  })
  .when('/login',{
      templateUrl:'views/login.html',
      controller:'LoginController'


  })
  .when('/profile',{
        templateUrl:'views/profile.html',
        controller:'ProfileController'

  })

  .when('/tariff',{
        templateUrl:'views/tariff.html',
        controller:'TariffController'

  })
  .when('/driver',{
        templateUrl:'views/driver.html',
        controller:'DriverController'

  })

  .when('/driverhome',{
        templateUrl:'views/driverhome.html',
        controller:'DriverHomeController'

  })

  .when('/adminhome',{
        templateUrl:'views/adminhome.html',
        controller:'AdminHomeController'

  })

  .when('/logout',{
        templateUrl:'views/logout.html',
        controller:'LogoutController'

  })

  .when('/changepassword',{
        templateUrl:'views/changepassword.html',
        controller:'ChangepasswordController'

  })

  .when('/driverprofile',{
        templateUrl:'views/driverprofile.html',
        controller:'DriverprofileController'

  })

  .when('/custtariff',{
        templateUrl:'views/custtariff.html',
        controller:'CustTariffController'

  })


  .when('/invoice',{
        templateUrl:'views/invoice.html',
        controller:'InvoiceController'

  });




})
app.run(function($rootScope,$cookies,$http,$sessionStorage,$location){
  console.log("welcome back");
//----------------------------------------------------------------------------


  var cust=sessionStorage.getItem('cust_id');
  var driver=sessionStorage.getItem('driver_id');
  var admin=sessionStorage.getItem('admin_id');
  var custname=sessionStorage.getItem('cust_name');
  var drivername=sessionStorage.getItem('driver_name');
  var adminname=sessionStorage.getItem('admin_name');
  console.log("value of sessionStorage nav"+driver);
  console.log("value of sessionStorage nav"+cust);
    //$rootScope.b=false;
    if(cust!=null)
    {
      // $rootScope.b=cust;
      console.log("welocme admin");
      console.log("page reffress");
      $rootScope.booking=false;
      $rootScope.login=true;
       $rootScope.profile=false;
       $rootScope.tariff=true;
       $rootScope.custtariff=false;
      $rootScope.logout=false;
    //  $rootScope.login=true;
    $rootScope.addcab=true;
    $rootScope.driverhome=true;
      $rootScope.signup=true;
      $rootScope.invoice=false;

      console.log("page refress");
      $rootScope.adminhome=true;
      $rootScope.changepassword=false;
      $rootScope.driverprofile=true;
      $rootScope.usernav=false;
      $rootScope.custname1=custname;


    }
    else if(driver!=null)
    {
      console.log("welocme driver");
      $rootScope.driverhome=false;
      $rootScope.driverprofile=false;
      $rootScope.logout=false;
      $rootScope.addcab=true;
      $rootScope.booking=true;
      $rootScope.login=true;
       $rootScope.profile=true;
       $rootScope.tariff=true;
       $rootScope.custtariff=true;
      $rootScope.logout=false;
      $rootScope.signup=true;
      $rootScope.adminhome=true;
      $rootScope.changepassword=false;
      $rootScope.usernav=false;
      $rootScope.invoice=true;
      $rootScope.custname1=drivername;
    }
    else if(admin!=null)
    {
      console.log("welocme admin");
      $rootScope.driverhome=true;
      $rootScope.logout=false;
      $rootScope.addcab=false;
      $rootScope.booking=true;
      $rootScope.login=true;
       $rootScope.profile=true;
       $rootScope.tariff=false;
       $rootScope.custtariff=true;
      $rootScope.signup=true;
      $rootScope.adminhome=false;
      $rootScope.changepassword=false;
      $rootScope.driverprofile=true;
      $rootScope.usernav=false;
      $rootScope.invoice=true;
      $rootScope.custname1=adminname;
    }

    else {
      console.log("welocme");
      $rootScope.login=false;
      $rootScope.signup=false;
        $rootScope.booking=true;
        $rootScope.profile=true;
        $rootScope.tariff=true;
        $rootScope.custtariff=true;
        $rootScope.addcab=true;
        $rootScope.driverhome=true;
        $rootScope.invoice=true;
        $rootScope.logout=true;
        $rootScope.adminhome=true;
        $rootScope.changepassword=true;
        $rootScope.driverprofile=true;
        $rootScope.usernav=true;
    }




// -----------------------------------------------------------------------------------------


if($sessionStorage.tokenDetails){
  $http.defaults.headers.common.Authorization=$sessionStorage.tokenDetails.token;

    if($rootScope.a!=undefined)
    {
      $rootScope.b=$rootScope.a;
    }
}
$rootScope.$on('$locationChangeStart',function(event,next,current){

var publicpages=['/','/login','/signup','/home'];
var authUser=$cookies.getObject('authUser');
if(authUser!=undefined){
  var loggedInuser=authUser.currentUser.userInfo;

}
var restrictedpage=publicpages.indexOf($location.path())===-1;
if(restrictedpage && !$sessionStorage.tokenDetails && $location.path()!=''){
  $location.path('/login');
}


});

});
