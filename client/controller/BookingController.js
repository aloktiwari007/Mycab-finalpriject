angular.module('Cabbooking').controller('BookingController',function ($scope,$http,$location,$sessionStorage) {

$sessionStorage.latlng;
$scope.lat;
$scope.dlogin=true;


      // ------- socket----------------------------

      var socket1 = io.connect('http://localhost:8080');
      console.log("hello");
      socket1.on('my other event', function (data) {
        console.log("log"+data.lat);
        console.log("log"+data.lng);
        //$scope.lat=data.lat
      //  $scope.demail=sessionStorage.getItem('cust_id');;

      $scope.demail=data.Email;
        console.log(data.Email);
        if(data.Email!=undefined)
        {
          console.log("enable");

          $scope.enable=false;
        }
        else{
          console.log("enable456789765");
        $scope.enable=true;
        }
      });

      socket1.on('noclient', function(data){

          console.log("hello");
      })

      //---------------------------------------------------------------------
      var getcabtype=function()
      {
        $http.get('/api/tariff').then(function(response)
      {
          console.log(response);
        $scope.cabtype1=response.data;

        console.log("this is a dataasdf " +$scope.cabtype[0].Cabtype);
      })
    };
    getcabtype();

      var getdriverdata=function()
      {
        if($scope.demail!=undefined)
        {
          console.log("if "+$scope.demail);
          $scope.enable=false;
        }
        else{
          console.log("elelsllreo");
          $scope.enable=true;
        }
        console.log("asdfasd");
        $http.get('/api/driver').then(function(response)
      {
          console.log(response);
        $scope.Vehicletype=response.data;

        console.log("this is a dataasdf " +$scope.Vehicletype);
        console.log("this is a scope lat " +$scope.lat);












      })

      //var socket1 = io.connect('http://localhost:8080');
      console.log("hello");
      socket1.on('my other event', function (data) {
        // console.log("value of lat"+data.lat);
        // console.log("value of lng"+data.lng);

        // $sessionStorage.latlng={
        //   lat:$scope.lat
        //   //lng:data.lng
        // };
        $scope.lat=data.lat
              console.log("value of scope12 "+$scope.lat);
      //  $scope.demail=sessionStorage.getItem('cust_id');;
      $scope.demail=data.Email;
        console.log(data.Email);
        if(data.Email!=undefined)
        {
          console.log("enable");

          $scope.enable=false;
        }
        else{
          console.log("enable456789765");
        $scope.enable=true;
        }

      });

      console.log("value of sessionStorage"+$scope.lat);

    };

        getdriverdata();
//--------------------------------------------Add data in booking table
        $scope.addbooking=function()
        {



            $scope.email=sessionStorage.getItem('cust_id');


                    $scope.dept=$scope.rec.selWhen;
                    console.log($scope.dept);
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;
                    console.log("time is "+dateTime);

          $scope.rec.time1=time;
          $scope.rec.date1=date;
          console.log("the total time is --------------------------"+$scope.rec.time1+"  "+$scope.rec.date1);

          $scope.cabtype=$scope.rec.bookVehicleType
          $scope.bookSource=$scope.rec.bookSource;
          $scope.bookDestination=$scope.rec.bookDestination;
          $scope.type=$scope.rec.bookVehicleType;
          console.log($scope.cabtype);
          $http.get('/api/singup/'+$scope.email).then(function(response)

        {


           console.log("cust respoinse" +response);
          $scope.rec.custname=response.data.Name;
          $scope.custname=$scope.rec.custname;
          $scope.rec.custmobileno=response.data.MobileNo;
          $scope.custmobileno=$scope.rec.custmobileno;
          //$scope.rec.custname=response.data.Name;
          $scope.rec.demail=$scope.demail;
          $scope.rec.cemail=$scope.email;
         console.log("this is a custname " +$scope.rec.custname);
         console.log("this is a custmobileno " +$scope.rec.custmobileno);
         //console.log("this is a custname " +$scope.rec.custname);
      });


      //---------------------------------------------------------------------------------------------------
      if($scope.dept=="LATER")
      {



        $http.get('/api/tariff/'+$scope.type).then(function(response)
        {
        //  console.log("tariff response "+$scope.rec.vehicletype);



          var time=  $("#time").val();
          var t=time.split(":");
          var t1=t[0];
          var t2=t[1];

          var d=new Date();
          d.setHours(t1,t2);

          var t=response.data.Startpeakhour;
          console.log(t);
          var t1=t.split(" ")
          var t2=t1[0].split(":");
          var t3=t2[0];
          var t4=t2[1];
          var d1=new Date();
           d1.setHours(t3,t4);

           var v=response.data.Endpeakhour;
           console.log(v);
           var v1=v.split(" ")
           var v2=v1[0].split(":");
           var v3=v2[0];
           var v4=v2[1];
           var dv1=new Date();
            dv1.setHours(v3,v4);

          if(d>=d1 && d<=dv1 )
          {
          $scope.rate=response.data.Peakrate;
          }
          else{
            $scope.rate=response.data.Normalrate;
          }






          //  $scope.rate=response.data.Normalrate;
            var dist=parseFloat($scope.distance.replace(/,/g,''));

$scope.rec.fare1=dist*$scope.rate;
        var ptime=d.getHours()+":"+d.getMinutes();

        var date1= $("#demo").val();

        var d1=date1.split("-");
        var d2=d1[0];
        var d3=d1[1];
        var d4=d1[2];
        d.setFullYear(d4,d3,d2);
        var pdate=d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();

        var diffDays = d.getDate() - today.getDate();

              var pdattime=pdate+" "+ptime;

        var laterdata={
        bookSource :$scope.rec.bookSource,
        bookDestination : $scope.rec.bookDestination,
        fare : $scope.rec.fare1,
        cabtype : $scope.rec.bookVehicleType ,
        dirname : "Not Allocated Yet",
        vehiclenumber : "Not Allocated Yet" ,
        mobile : "Not Allocated Yet" ,
          custname : $scope.rec.custname,
        custmobileno :$scope.rec.custmobileno,
        bookingstatus :"Adv. booking",
        distance : $scope.distance,
        bookingtype : "Advance" ,
        bookingdate : date,
        pickupdatedate : pdattime,
        driverbookingstatus : "Not Allocated Yet",
        demail : "Not Allocated Yet",
        cemail :$scope.email


        };



      console.log("enter in later");
      if(diffDays<=3 && diffDays>0)
      {
        $http.post('/api/booking',laterdata).then(function(response){

          alert("Cab Booked");



        })

      }
      else if(diffDays==0){

        alert("You can not book your cab for today ");
      }
      else if(diffDays<0)
      {
        alert("You can not book your cab for the past dates ");
      }
      else{

        alert("You pickup date should be less than 3 days");
      }



         })
      }







      //---------------------------------------------------------------------------------------------------------------------








// $('#myModal').modal({ show: false})

//if($scope.demail!=null)
// {


        // driver info
else{
        $http.get('/api/driver/'+$scope.demail).then(function(response)
      {
        console.log("the value of dlogin"+$scope.dlogin);
        if(response.data==undefined && $scope.dept!="LATER" || $scope.dlogin==false ){

            alert('No cab avaliable');


        }
        // else if()
        // {
        //    //$scope.dlogin=true;
        //     alert('No cab avaliable123');
        // }
        else{


          console.log("driver response "+response);
        $scope.rec.dirname=response.data.Name;
        $scope.rec.vehiclenumber=response.data.Vehiclenumber;
        $scope.rec.vehicletype=response.data.Vehicletype;
        $scope.vnumber=$scope.rec.vehiclenumber;
        $scope.rec.mobile=response.data.MobileNo;
        $scope.dname=true;
        sessionStorage.setItem('vnumber',$scope.vnumber);

$scope.rec.bookingstatus="booked";
$scope.rec.bookingtype="current";
// pic date and time code from here
$scope.rec.bookingdate=dateTime;
$scope.rec.pickupdatedate=dateTime;

$scope.rec.driverbookingstatus="booked";
$scope.driverbookingstatus=$scope.rec.driverbookingstatus;
$scope.type=$scope.rec.vehicletype;
console.log("type is"+$scope.type);

if($scope.type==$scope.rec.bookVehicleType)
{







    $http.get('/api/tariff/'+$scope.type).then(function(response)
    {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() ;
      var f=today.getHours();
      var f1=today.getMinutes();
      var newdate=new Date(today.getFullYear(),(today.getMonth()+1),today.getDate(),today.getHours(),today.getMinutes());
      console.log(newdate);
      var dateTime = date+' '+time;
      //var startp=response.data.Startpeakhour;

      today.setHours(f,f1);

      var t=response.data.Startpeakhour;
      console.log(t);
      var t1=t.split(" ")
      var t2=t1[0].split(":");
      var t3=t2[0];
      var t4=t2[1];
      var d1=new Date();
       d1.setHours(t3,t4);

       var v=response.data.Endpeakhour;
       console.log(v);
       var v1=v.split(" ")
       var v2=v1[0].split(":");
       var v3=v2[0];
       var v4=v2[1];
       var dv1=new Date();
        dv1.setHours(v3,v4);

      console.log("the data is"+t2[0]);
      console.log("the data is"+t2[1]);
      console.log("the data is"+f);

      console.log("the data is"+f1);
      console.log("the data is"+v3);
      console.log("the data is"+v4);
      if(today>=d1 && today<=dv1 )
      {
      $scope.rate=response.data.Peakrate;
      }
      else{
        $scope.rate=response.data.Normalrate;
      }



    //  console.log("tariff response "+$scope.rec.vehicletype);
      //  $scope.rate=response.data.Normalrate;
       var f=parseFloat($scope.distance)

$scope.rec.fare=f*$scope.rate;

        console.log("data from tariff1111111 database"+$scope.rate);
        console.log("data from booking"+$scope.rec.bookVehicleType);

        console.log("total di stance---- is"+$scope.distance);
        $scope.rec.distance=$scope.distance;
        $scope.rec.cabtype=$scope.type;


        $scope.cab=true;
        console.log("value of scop.demail"+$scope.demail);
   //console.log("this is a rate " +$scope.rate);
    $http.get('/api/booking/'+$scope.demail+'/'+$scope.driverbookingstatus).then(function(response)
    {

console.log("value of docessss00000000"+response.data);
if(response.data!=null)
{
  alert("this taxi is already booked" );
}
else{
  console.log("value of cab "+$scope.cab +" and "+$scope.dname);
//-------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------




   if($scope.cab==true && $scope.dname==true)
   {

     $http.post('/api/booking',$scope.rec).then(function(response){

        //alert('data enter');
        if(response.data.success)
        {

          var socket1 = io.connect('http://localhost:8080');
            socket1.emit('client', { cname :$scope.custname,cmobile:$scope.custmobileno,pickuplocation:$scope.bookSource,destination:$scope.bookDestination,vnumber:$scope.vnumber});

        $("#myModal").modal('show');

        }

//window.location.reload(true)
     })

   }
   else {
     alert('Selected Cab type not avaliable ');
   }

 }
 });

     //alert("total fare is"+($scope.distance*$scope.rate));
 });
}
else {
        alert("Selected Cab type not avaliable ");
      }



//  $http.post('/api/booking',)
  //};
//});
}
});
}

}
//-----------------------------------------------------End----------



  var directionsDisplay;
var directionsService = new google.maps.DirectionsService();






  $scope.initMap = function () {
//28.61 77.23


              var map = new google.maps.Map(document.getElementById('map'), {
                  center: { lat:28.61 , lng: 77.23 },
                  zoom: 18
              }  );












              console.log("value of lat"+$scope.lat);

               new google.maps.places.SearchBox(document.getElementById('txtFrom'));

              new google.maps.places.SearchBox(document.getElementById('txtTo'));
              directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
              directionsDisplay.setMap(map);

              var myLatLng;
              var socket1 = io.connect('http://localhost:8080');
              console.log("hello");
              var cab_icon="../icon/cab3.jpg";
              var marker;
              socket1.on('my other event', function (data) {
            //    myLatLng={lat:data.lat, lng:data.lng}
           $scope.dlogin=true;

console.log("socket called");

//----------------------------------------------------------------------------------------
var address = document.getElementById("txtFrom").value;



geocoder = new google.maps.Geocoder();
   if (geocoder) {
       geocoder.geocode({
           'address':address
       }, function (results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               //callback(results[0]);
              var dlat=results[0].geometry.location.lat();
              var dlang=results[0].geometry.location.lng();
              console.log(dlat);
              console.log(dlang);
              var lat=data.lat;
              var lng=data.lng;



              function distance1(lat1, lon1, lat2, lon2, unit) {
                      var radlat1 = Math.PI * lat1/180
                      var radlat2 = Math.PI * lat2/180
                      var radlon1 = Math.PI * lon1/180
                      var radlon2 = Math.PI * lon2/180
                      var theta = lon1-lon2
                      var radtheta = Math.PI * theta/180
                      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                      dist = Math.acos(dist)
                      dist = dist * 180/Math.PI
                      dist = dist * 60 * 1.1515
                      if (unit=="K") { dist = dist * 1.609344 }
                      if (unit=="N") { dist = dist * 0.8684 }
                      return dist
              }


              var distance2 = distance1(lat, lng, dlat,dlang, 'K');

              var dit=Math.round(distance2*1000)/1000;
              console.log(dit);

           }

       });
     }






//-------------------------------------------------------------------------------------------------------

            console.log("value in data"+data.lat);
              $scope.lat=data.lat;
              $scope.lng=data.lng;
              myLatLng = new google.maps.LatLng($scope.lat, $scope.lng);
                console.log("log"+data.lat);
                console.log("log"+data.lng);


                marker = new google.maps.Marker({

        position: myLatLng,
        map:map,
        title: 'cab here',
        icon:cab_icon
      });
      map.setZoom(16);
      map.setCenter(marker.getPosition());

    //   socket1.on('noclient', function (data) {
    //   //    myLatLng={lat:data.lat, lng:data.lng}
    //
    //   console.log("socket disconnect called");
    // });

            //  socket1.emit('news', { my :"hello" });
              });
              console.log("myLatLng"+myLatLng);

// socket disconnect----------------------------------------------------------



socket1.on('noclient', function (data) {
//    myLatLng={lat:data.lat, lng:data.lng}

marker.setMap(null);
$scope.dlogin=false;
console.log("socket disconnect called");

//----------------------------------------------------------------------------------------
//var address = document.getElementById("txtFrom").value;



// geocoder = new google.maps.Geocoder();
// if (geocoder) {
// geocoder.geocode({
// 'address':address
// }, function (results, status) {
// if (status == google.maps.GeocoderStatus.OK) {
//  //callback(results[0]);
// var dlat=results[0].geometry.location.lat();
// var dlang=results[0].geometry.location.lng();
// console.log(dlat);
// console.log(dlang);
// var lat=data.lat;
// var lng=data.lng;
//
//
//
// function distance1(lat1, lon1, lat2, lon2, unit) {
//         var radlat1 = Math.PI * lat1/180
//         var radlat2 = Math.PI * lat2/180
//         var radlon1 = Math.PI * lon1/180
//         var radlon2 = Math.PI * lon2/180
//         var theta = lon1-lon2
//         var radtheta = Math.PI * theta/180
//         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//         dist = Math.acos(dist)
//         dist = dist * 180/Math.PI
//         dist = dist * 60 * 1.1515
//         if (unit=="K") { dist = dist * 1.609344 }
//         if (unit=="N") { dist = dist * 0.8684 }
//         return dist
// }
//
//
// var distance2 = distance1(lat, lng, dlat,dlang, 'K');
//
// var dit=Math.round(distance2*1000)/1000;
// console.log(dit);
//
// }
//
// });
// }






//-------------------------------------------------------------------------------------------------------
//
// console.log("value in data"+data.lat);
//  var lat=28.62;
// var lng=77.23;
// myLatLng = new google.maps.LatLng(lat, lng);
// //  console.log("log"+data.lat);
// //  console.log("log"+data.lng);
//
//
//   var marker = new google.maps.Marker({
//
// position: myLatLng,
// map:map,
// title: 'cab here',
//
// });
// map.setZoom(16);
// //map.setMapOnAll(null);
//
// map.setCenter(marker.setMap(null));
//


//  socket1.emit('news', { my :"hello" });
});




//end of socket disconnect


//marker.setMap(map);
 //map.setCenter(marker.getPosition());

          }
          //////////////////// end init map ////////////////////////  click routeClick
          //start click event
          google.maps.event.addDomListener(document.getElementById('txtTo'), 'blur',
              function () {
                var address=document.getElementById('txtFrom').value;
                  //*********DIRECTIONS AND ROUTE**********************//




                  $scope.rec.bookSource = document.getElementById('txtFrom').value;
                  $scope.rec.bookDestination = document.getElementById('txtTo').value;
                  if($scope.rec.bookSource!="")
                  {







                  var request = {
                      origin: $scope.rec.bookSource,
                      destination: $scope.rec.bookDestination,
                      travelMode: google.maps.TravelMode.DRIVING
                  };
                  directionsService.route(request, function (response, status) {
                      if (status == google.maps.DirectionsStatus.OK) {
                          directionsDisplay.setDirections(response);
                      }
                      else
                          throw 'unable to route';
                  });
                  //*********DISTANCE AND DURATION**********************//
                  var service = new google.maps.DistanceMatrixService();
                  service.getDistanceMatrix({
                      origins: [$scope.rec.bookSource],
                      destinations: [$scope.rec.bookDestination],
                      travelMode: google.maps.TravelMode.DRIVING,
                      unitSystem: google.maps.UnitSystem.METRIC,
                      avoidHighways: false,
                      avoidTolls: false
                  }, function (response, status) {
                      if (status == google.maps.DistanceMatrixStatus.OK &&
                          response.rows[0].elements[0].status != 'ZERO_RESULTS') {
                          var distance = response.rows[0].elements[0].distance.text;
                          var dist = distance.replace('km', '');
                          $scope.distance=dist;

                          $scope.rec.bookDistance = parseFloat(dist);
                          duration = response.rows[0].elements[0].duration.text;

                          var dvDistance = document.getElementById('dvDistance');
                          dvDistance.innerHTML = '';
                          dvDistance.innerHTML += 'Distance: ' + distance + '<br />';
                          dvDistance.innerHTML += 'Duration:' + duration;

                      } else {
                          alert('Unable to find the distance via road.');
                      }
                  //    $scope.addbooking();
                  });


//                   google.maps.event.addListener(marker, 'drag', function(event){
//                     console.log(event.latLng.lat());
//   //   document.getElementById("latbox").value = event.latLng.lat();
//     // document.getElementById("lngbox").value = event.latLng.lng();
// });
}
else{
  alert("book source in blank");
}

              }); //end click event





$scope.checkd  =function()
{
var address = document.getElementById('txtFrom').value;
  var bookDestination = document.getElementById('txtTo').value;
                  var dept=$scope.rec.selWhen;
                  console.log("this data is "+dept);
                  if(dept=="NOW"){

                      geocoder = new google.maps.Geocoder();
                         if (geocoder) {
                             geocoder.geocode({
                                 'address':address
                             }, function (results, status) {
                                 if (status == google.maps.GeocoderStatus.OK) {
                                     //callback(results[0]);
                                    var dlat=results[0].geometry.location.lat();
                                    var dlang=results[0].geometry.location.lng();
                                    console.log(dlat);
                                    console.log(dlang);
                                    var lat=$scope.lat;
                                    var lng=$scope.lng;



                                    function distance1(lat1, lon1, lat2, lon2, unit) {
                                            var radlat1 = Math.PI * lat1/180
                                            var radlat2 = Math.PI * lat2/180
                                            var radlon1 = Math.PI * lon1/180
                                            var radlon2 = Math.PI * lon2/180
                                            var theta = lon1-lon2
                                            var radtheta = Math.PI * theta/180
                                            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                                            dist = Math.acos(dist)
                                            dist = dist * 180/Math.PI
                                            dist = dist * 60 * 1.1515
                                            if (unit=="K") { dist = dist * 1.609344 }
                                            if (unit=="N") { dist = dist * 0.8684 }
                                            return dist
                                    }


                                    var distance2 = distance1(lat, lng, dlat,dlang, 'K');
                                    //  console.log(distance2);
                                    var dit=parseFloat(Math.round(distance2*1000)/1000);
                                    console.log(dit);
                                    if(isNaN(dit) || dit>1.0)
                                    {
                                        alert("no cab avaliable in location");
                                      //  location.reload();

                                    }


                                 }

                             });
                           }
                           else {
                            //    alert('fffff');
                           }


}


}

});
