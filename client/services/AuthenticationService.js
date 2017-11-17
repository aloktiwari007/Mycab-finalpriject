'use strict';
angular.module('Cabbooking').factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(user, callback) {
        $http.post('/api/login', user)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo: {
                                id: response.data.udata._id,
                                email: response.data.udata.Email,
                                fname: response.data.udata.FirstName,
                                lname: response.data.udata.LastName,
                                mobile: response.data.udata.MobileNumber,
                                usertype: response.data.udata.UserType
                                    //userType: response.userDetail.userType
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    callback(response);
                } else {
                  console.log(response);
                    callback(response);
                }
            });
    }

    function Logout() {
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');

    }
}
