angular.module('Cabbooking').controller('ProfileController',function($scope,$http,$location){

  var display=function()
  {
    $scope.cemail=sessionStorage.getItem('cust_id');
    console.log($scope.cemail);
    $scope.currentbookingtype="current";
    $http.get('/api/booking/'+$scope.cemail).then(function(response)
  {



console.log(response.data);
          //  $scope.client=response.data;
              var a=[];
              var b=[];
              var c=[]
              var d=[];
            for(i=0;i<response.data.length;i++)
            {
              console.log(response.data[i].DriverBookingstatus);
              if(response.data[i].DriverBookingstatus=="Not Allocated Yet")
              {

                     a.push(response.data[i]);


              }
              else if(response.data[i].DriverBookingstatus=="booked")
              {
                c.push(response.data[i]);
              }
              else if(response.data[i].DriverBookingstatus=="canceled")
              {
                d.push(response.data[i]);
              }

              else {

                  b.push(response.data[i]);
              }
            }
            $scope.client1=a;
            $scope.client=b;
            $scope.client2=c;
            $scope.client3=d;
            console.log($scope.client1);
  })

  }

display();

$scope.canceled=function(data)
{

var r = confirm("Do You really want to cancel your ride ?");

if(r==true)
{

      $scope.record=data;
      var updatebookingstatus={
        DriverBookingstatus:"canceled"
      };


      var v={

        dirname : "Ride canceled by user",
        vehiclenumber : "Ride canceled by user" ,
        mobile : "Ride canceled by user",

        driverbookingstatus : "canceled",
        demail :"Ride canceled by user"



      }
      $http.put('/api/booking1/'+data._id,v).then(function(response){

        if(response)
        {
        alert("data updated");

        display();
        }
        else{
          alert("data not updated");
        }


  })
  }
}





})
