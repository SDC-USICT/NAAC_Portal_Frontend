angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$window", "$location",
		function ($scope, $http, $rootScope, $window, $location) {

		if(sessionStorage.getItem('school') == undefined || sessionStorage.getItem('loginid') == undefined){
			$location.path('/index');
		}
		if(sessionStorage.getItem('status') != undefined && sessionStorage.getItem('school') != undefined && sessionStorage.getItem('loginid') != undefined){
		    $location.path('/dashboard');
        }
		$rootScope.loginid = sessionStorage.getItem('loginid');
		console.log("log " + $rootScope.loginid);
			$scope.submit = function () {
  				req = {
				'empid' : $rootScope.loginid,
				'password' : $scope.password
			};
			console.log(req);
				$http.post(BACKEND+'/api/login', JSON.stringify(req))
				.then(function (res) {
				   
					if (res.data.success != undefined) {

						$location.url('/dashboard');
						console.log("login data");
						console.log(res.data);

					}
					else {
                        alert('Login incorrect');
                        $location.path('/login');
                    }
				});
			};

			$scope.forgot = function(){
				console.log("Reidrecting");
					$location.url('/forgot');
			};
		
		}]);