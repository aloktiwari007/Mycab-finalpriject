angular.module('Cabbooking').controller('AdminHomeController',function ($scope,$http,$location,$sessionStorage) {

var getAdvbooking=function()
{

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() ;
  var f=today.getHours();
  var f1=today.getMinutes();
  var newdate=new Date(today.getFullYear(),(today.getMonth()+1),today.getDate(),today.getHours(),today.getMinutes());
  console.log(newdate);
  var dateTime = date+' '+time;






$scope.cab=[];

  $http.get('/api/booking/').then(function(response)
{



console.log(response.data);
        //  $scope.client=response.data;
            var a=[];
            var b=[];
          for(i=0;i<response.data.length;i++)
          {
            console.log(response.data[i].Drivername);
            if(response.data[i].Drivername=="Not Allocated Yet")
            {

                  $scope.cab.push(response.data[i].Cabetype)
                  var t=response.data[i].PickupDate;
                  var t1=t.split(" ")
                  var d=t1[0].split("-");
                  var y=d[0];
                  var m=d[1];
                  var date12=d[2];
                  var d1=new Date();
                  d1.setFullYear(y,m,date12);

                  var t2=t1[1].split(":");
                  var t3=t2[0];
                  var t4=t2[1];


                  d1.setHours(t3,t4);

                    var fdate=new Date(d1.getFullYear(),d1.getMonth(),d1.getDate(),d1.getHours(),d1.getMinutes())
                  console.log(fdate);

                  if(newdate<=fdate)
                  {
                     var diff = fdate - newdate;
                     var msec = diff;
                     var hh = Math.floor(msec / 1000 / 60 / 60);
                     msec -= hh * 1000 * 60 * 60;
                     var mm = Math.floor(msec / 1000 / 60);
                     msec -= mm * 1000 * 60;
                     if(hh<=6)
                     {
                       console.log("hour sii");
                      a.push(response.data[i]);

                     }
                     console.log("total hour left"+hh);






                  }


            }
            else {

                b.push(response.data[i]);
            }
          }
          $scope.client1=a;
          $scope.client=b;
          console.log($scope.client1);







})
$scope.pushdata=[];

  $http.get('/api/driver/').then(function(response){

    console.log(response);

console.log("enter indriver");
$scope.push=response.data;
  $scope.driverdata
  $scope.pushdata=response.data;
  //pushdata=response.data;
  console.log("data in "+$scope.pushdata);
  for(i=0;i<$scope.pushdata.length;i++)
  {
    $scope.driverdata=$scope.pushdata[i].Email;

$scope.dg=response.data[i];
    console.log($scope.driverdata);
  //  $scope.driveremail={};
    //$scope.driveremail=response.data.Email;
    console.log($scope.driverdata);
  //  $scope.bookingdata=[];


$http.get('/api/booking3/'+$scope.driverdata+'/'+'booked').then(function(response1){

  console.log(response1);
if(response1.data!=null)
{
  $scope.bitem= response1.data;
  for(var i=0;i<$scope.bitem.length;i++)
  {
    if($scope.bite[i].DriverEmail == $scope.pushdata[i].Email)
    {
      $scope.pushdata.splice($scope.pushdata.indexOf(i),1);
    }
  }


console.log($scope.pushdata);
}
  })
  }
      })



}
getAdvbooking();

$scope.update=function(data,d)
{

  var d=JSON.parse(d.driver);

  console.log(d);
var v={

  dirname : d.Name,
  vehiclenumber : d.Vehiclenumber ,
  mobile : d.MobileNo,

  driverbookingstatus : "booked",
  demail : d.Email



}
console.log(v);
$http.get('/api/booking3/'+d.Email+'/'+'booked').then(function(response1){

  if(response1.data.length==0)
  {

  $http.put('/api/booking1/'+data._id,v).then(function(response){
console.log(response);
    if(response)
    {
    alert("data updated");

      getAdvbooking();
    }
    else{
      alert("data not updated");
    }


})
}
else {
  alert("Cab already booked . kindly chose other cab");
}
})
}


})
