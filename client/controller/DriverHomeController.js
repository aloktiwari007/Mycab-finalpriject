angular.module('Cabbooking').controller('DriverHomeController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){


$scope.d_lat;
$scope.d_lng;
$scope.demail=sessionStorage.getItem('driver_id')
console.log("driver id"+$scope.demail);
  var map, infoWindow;
    $scope.initMap =  function () {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 28.61, lng: 77.23},
            zoom: 6
          });
          infoWindow = new google.maps.InfoWindow;

          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,

              };
              $scope.d_lat=pos.lat;
              $scope.d_lng=pos.lng;

              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);

              var socket1 = io.connect('http://localhost:8080');
                socket1.emit('my other event', { lat :$scope.d_lat,lng:$scope.d_lng,Email:$scope.demail });
                socket1.emit('disconnect', { hhh :"dsd" });
              socket1.on('my other event', function (a) {
                console.log("data coming"+a.Email);});


            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);

}










    $scope.u=$scope.u;
    var a=$scope.u
    $scope.send=function()
    {
    //console.log($scope.u);
    // var socket1 = io.connect('http://localhost:8080');
    //   socket1.emit('my other event', { lat :$scope.d_lat,lng:$scope.d_lng,Email:$scope.demail });
    // socket1.on('my other event', function (a) {
    //   console.log("data coming"+a);

  //  });
}



    var savedata=function()
    {
      $scope.s.lat=$scope.d_lat;
      $scope.s.lng=$scope.d.lat;
      $http.get('/api/location/'+$scope.demail).then(function(response)
      {
        if(response)
        {

        }
        else {
          $http.post('/api/location',$scope.s,function(response){

                 console.log("enter");

           });
        }



      });

    };


var a1;


    var socket2 = io.connect('http://localhost:8080');


    socket2.on('client', function (a) {

$scope.name=a.cname;

console.log("mobile number"+a.cmobile);
//------------------------------------------------------
      $scope.cmobile1=a.cmobile;
      $scope.pickuplocation1=a.pickuplocation;
      $scope.destination1=a.destination;
      $scope.vnumber=a.vnumber;
  //---------------------------------------------------------
console.log("vnumber is" +$scope.vnumber);

      if($scope.name!=undefined)
      {

       $scope.b();



      }

    });

      $scope.b=function()
      {
console.log("cust mobile no"+$scope.cmobile1);
$('#myModal').on('show.bs.modal', function ()
{
    $(this).find('#custname').text($scope.name);
    $(this).find('#custmobile').text($scope.cmobile1);
    $(this).find('#custpickuplocation').text($scope.pickuplocation1);
    $(this).find('#custdestination').text($scope.destination1);
    // show data on driver page


});

$('#name').html($scope.name);
$('#mobile').html($scope.cmobile1);
$('#pickup').html($scope.pickuplocation1);
$('#destination').html($scope.destination1);
// $(this).find('#name').text($scope.name);
// $(this).find('#mobile').text($scope.cmobile1);
// $(this).find('#pickup').text($scope.pickuplocation1);
// $(this).find('#destination').text($scope.destination1);
sessionStorage.setItem('dlnumber',$scope.vnumber);
        $('#myModal').modal('show');
        data();
      }




      var data=function()
      {
    $scope.vnumber1=sessionStorage.getItem('driver_id');
    $scope.driverbookingstatus="booked";
    console.log("data in vnumber1"+$scope.vnumber1);

          console.log("enter in data");
          $http.get('/api/booking/'+$scope.vnumber1+'/'+$scope.driverbookingstatus).then(function(response)
          {


            $scope.d=response.data;


          });






      }
      data();

      $scope.update=function()
      {
      //  console.log($scope.data);
      var r = confirm("Do You really want to End your ride ?");

      if(r==true)
      {
        $scope.data=$scope.d._id;
        //$scope.id=$scope.data._id;
        var updatebookingstatus={
          DriverBookingstatus:"unbooked"
        };
        $http.put('/api/booking/'+$scope.data,JSON.stringify(updatebookingstatus)).then(function(response){
          console.log(response);
          data();
        })
      }
    }


}])
