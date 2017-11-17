angular.module('Cabbooking').controller('DriverprofileController',function($scope,$http,$location){

  var display=function()
  {
    $scope.demail=sessionStorage.getItem('driver_id');
    console.log($scope.demail);
    $scope.currentbookingtype="current";
    $http.get('/api/booking1/'+$scope.demail).then(function(response)
  {

      $scope.client=response.data;

console.log(response.data);
          //  $scope.client=response.data;
            //   var a=[];
            //   var b=[];
            // for(i=0;i<response.data.length;i++)
            // {
            //   console.log(response.data[i].Drivername);
            //   if(response.data[i].Drivername=="Not Allocated Yet")
            //   {
            //
            //          a.push(response.data[i]);
            //         // $scope.client1=a;
            //         // console.log($scope.client1.Drivername);
            //   }
            //   else {
            //
            //       b.push(response.data[i]);
            //   }
            // }
            // $scope.client1=a;
            //
            // console.log($scope.client1);
  })
// $scope.Advancebookingtype="Advance";
//
//   $http.get('/api/booking/'+$scope.demail+'/'+$scope.Advancebookingtype).then(function(response)
// {
//
//
//
// console.log(response.data);
//           $scope.client1=response.data;
//
// })
  }

display();

// $scope.delete=function(data)
// {
//
//
//
//       $scope.record=data;
//       $http.delete('/api/booking/'+$scope.record._id).then(function(response){
//
//         alert("deleted ");
//         display();
//       })
//
//   }





})
