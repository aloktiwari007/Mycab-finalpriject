angular.module('Cabbooking').controller('CustTariffController',function($scope,$http){



var getdata=function()
{
  $http.get('/api/tariff').then(function(response)
{

    console.log("helloooo");
    console.log(response);

    $scope.tariffdata=response.data;

})
};
getdata();

})
