angular.module('Cabbooking').controller('TariffController',function($scope,$http){


  var hours=function(){

                $scope.hour=[];
              for (var i = 0; i < 24; i++) {
                  var d;
                  d=i.toString()
                  console.log(d.length);
                if(d.length<2)
                {

                $scope.hour.push("0"+d);
                }
                else {
                $scope.hour.push(d);
                }




              }

  };
  hours();
  var mints=function(){

                $scope.mint=[];
              for (var i = 0; i < 60; i++) {
                  var d;
                  d=i.toString()
                  console.log(d.length);
                if(d.length<2)
                {

                $scope.mint.push("0"+d);
                }
                else {
                $scope.mint.push(d);
                }




              }


  };
  mints();



  $scope.tariffdetails=function()
  {
var start=$scope.Data.hour1+":"+$scope.Data.mints1+" "+$scope.Data.ampm;
var end=$scope.Data.hour2+":"+$scope.Data.mints2+" "+$scope.Data.ampm1;
$scope.Data.start=start;
$scope.Data.end=end;
console.log($scope.Data);
//-----------------------------------------------------


var t=start.split(":");
var t1=t[1].split(" ");
console.log(t , t1);
var t3=t[0];
var t4=t1[0];

var d1=new Date();
d1.setHours(t3,t4);
console.log(d1);

var et=end.split(":");
var et1=et[1].split(" ");
console.log(et , et1);
var et3=et[0];
var et4=et1[0];

var d2=new Date();
d2.setHours(et3,et4);

   var fdate=new Date(d1.getFullYear(),d1.getMonth(),d1.getDate(),d1.getHours(),d1.getMinutes());
   var edate=new Date(d2.getFullYear(),d2.getMonth(),d2.getDate(),d2.getHours(),d2.getMinutes());
   console.log(fdate +" "+ edate);

if(fdate>=edate)
{
  alert("End Peak Time Should not less then Start Peak Time")
}
//---------------------------------------------------
else{


    $http.post('/api/tariff',$scope.Data).then(function(response){

      console.log(response.success);
      $scope.hide=false;
      if(response.data.success==true)
      {




        alert('data enter');
      //  location.reload();
        getdata();
      }
      else {
        alert('Cab Type allready Exists');
      }

    })
  }

  };

var getdata=function()
{
  $http.get('/api/tariff').then(function(response)
{

    console.log("helloooo");
    console.log(response);

    $scope.tariffdata=response.data;
  //
  // for(var i=0;i<response.data.length;i++)
  // {
  //   $scope.tariffdata.push(response.data[i]);
  // }

//console.log("data" +$scope.tariffdata[0].Peakrate);
})
};
getdata();




$scope.deletetariff=function(data){

    $scope.record=data;
    $http.delete('/api/tariff/'+$scope.record._id).then(function(response){

      alert("deleted ");
      getdata();
    })
};

$scope.checktime=function(d)
{


  console.log(d);
//var a=c.Startpeakhour;
// $scope.c={
//
//
//   startpeakhour=d.Startpeakhour;
//   $scope.c.endpeakhour=d.Endpeakhour;
//   $scope.c.normalrate=d.Normalrate;
//   $scope.c.peakrate=d.Peakrate;
//
//
// };
$scope.c=d;
console.log($scope.d);

var startpeakhour=d.Startpeakhour;
var endpeakhour=d.Endpeakhour;
$scope.c.normalrate=parseInt(d.Normalrate);
$scope.c.peakrate=parseInt(d.Peakrate);




  var regex=/^[0-9]{2}[:][0-9]{2}\s[A-z]{2}$/




  if(startpeakhour.match(regex) && endpeakhour.match(regex)){

// --------------------------------------------------------------------------------



var t=startpeakhour.split(":");
var t1=t[1].split(" ");
console.log(t , t1);
var t3=t[0];
var t4=t1[0];

var d1=new Date();
d1.setHours(t3,t4);
console.log(d1);


var et=endpeakhour.split(":");
var et1=et[1].split(" ");
console.log(et , et1);
var et3=et[0];
var et4=et1[0];

var d2=new Date();
d2.setHours(et3,et4);

   var fdate=new Date(d1.getFullYear(),d1.getMonth(),d1.getDate(),d1.getHours(),d1.getMinutes());
   var edate=new Date(d2.getFullYear(),d2.getMonth(),d2.getDate(),d2.getHours(),d2.getMinutes());
   console.log(fdate +" "+ edate);

if(fdate>edate)
{
  alert("End Peak Time Should not less then Start Peak Time")
  getdata();
}

    else{


          $http.put('/api/tariff/'+d._id,$scope.c).then(function(response){
            console.log(response);


            if(response.data.invalid==true)
            {
            alert("Cab type allready Exists");
            getdata();

            }
            else{

              alert("Data updated");
              getdata();
            }

          })

    }





// -----------------------------------------------------------------























  }
  else  {
    alert("Please Enter the Valid Time (Like 07:00 AM)");
    getdata();
  }
}



});
