angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$window", "$location",
		function ($scope, $http, $rootScope, $window, $location) {

		if(sessionStorage.loginid == undefined){
			$location.path('/selection');
		}
		if(sessionStorage.status != undefined && sessionStorage.loginid != undefined){
		    $location.path('/dashboard');
      		}
		$rootScope.loginid = sessionStorage.loginid;
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
		
			$scope.loginValid = false;
			$scope.gRecaptchaResponse = '';
			$scope.$watch('gRecaptchaResponse', function (){
				console.log($scope.gRecaptchaResponse);

				if ($scope.gRecaptchaResponse.length > 0) {
					$http.post(BACKEND + '/api/captcha', {'captcha': $scope.gRecaptchaResponse})
					.then(function(res) {
						console.log(res);
						if (res.status ==200) {
							$scope.loginValid = true;
						}
					})
				}
				
			});
		}]);