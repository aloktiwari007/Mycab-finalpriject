angular.module('Cabbooking').controller('DriverController',function($scope,$http){

        $scope.disable=true;
          $scope.driverdetails=function()
          {

            $scope.user.type="driver";
            $scope.user.password="password@123";
            console.log($scope.user.type);
        console.log($scope.user.vtype);



                       $http.post('/api/driver',$scope.user).then(function(response){

                         if(response.data.success==true)
                         {



                           $http.post('/api/signup',$scope.user).then(function(response){


                               if(response.data.success==true)
                               {
                                 alert('Data saved');
                                 location.reload();
                                 getdriverdata();

                               }
                         else{
                           alert("Something went wrong please try again");
                         }
                         });

                           }
                           else{
                             alert("email id already exist or vehiclenumber already register");
                           }

                       })




          };



          var getdriverdata=function()
          {
            console.log("asdfasd");
            $http.get('/api/driver').then(function(response)
          {
              console.log(response);
            $scope.driverdata=response.data;

            console.log("this is a dataasdf " +$scope.driverdata.Name);
          })
        };

            getdriverdata();


            $scope.hide=1;

              $scope.inputhide=true;
              $scope.selectshow=true;
              $scope.err=true;
              $scope.err1=true;
          $scope.editrecord=function()
          {
          console.log("welcome");
              $scope.button=false;
                $scope.hide=0;
                $scope.inputhide=false;
                $scope.selectshow=false;
          };

          $scope.updaterecord=function(data)
          {


            $scope.d=data;
            var reg=/^\d{10}$/;
            var mob=reg.test($scope.d.MobileNo);

            console.log($scope.d.Vehicletype);
            console.log($scope.d.Address);
        //     || $scope.d.Vehicletype!=="Micro" || $scope.d.Vehicletype!=="Sedan" || $scope.d.Vehicletype!=="SUV"
            if($scope.d.Vehicletype=='Mini' || $scope.d.Vehicletype=='Micro'||  $scope.d.Vehicletype=='Sedan' ||  $scope.d.Vehicletype=='SUV')
            {

              if($scope.d.Name!=undefined && $scope.d.Address!=""  && $scope.d.MobileNo!=undefined && $scope.d.Email!=undefined && $scope.d.Vehicletype!=undefined && $scope.d.Vehiclenumber!=undefined)
              {
                if(mob)
                {

                $http.put('/api/driver/'+data._id,$scope.d).then(function(response){

                  alert("dataupdated");
                  getdriverdata();
                })
                var a="open"
                if(a=="open")
                {
                  $scope.button2=true;
                }

                $scope.hide=1;
              }
              else{
                alert("Mobile Number Not Correct" );

              }
            }


                else{
                    $scope.err=false;
                      alert("fill the text box" );
                }
//
            }

            else {
              $scope.err=false;
              alert("invalid cab type");
            }

          };


          $scope.deletedriver=function(data){

              $scope.record=data;
              $http.delete('/api/driver/'+$scope.record._id).then(function(response){

                  $http.delete('/api/singup/'+$scope.record.Email).then(function(response){

                alert("deleted ");
              })

                getdriverdata();
              })
          };

          var getcabtype=function()
          {
            $http.get('/api/tariff').then(function(response)
          {
              console.log(response);
            $scope.cabtype=response.data;

            console.log("this is a dataasdf " +$scope.cabtype[0].Cabtype);
          })
        };
        getcabtype();


})
