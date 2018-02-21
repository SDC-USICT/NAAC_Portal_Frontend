angular.module('employee')
	.controller('ForgotCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			$scope.id = sessionStorage.loginid;
			$scope.submit = function () {
				$scope.mail = {
				"email" : $scope.email,
				"loginid" : $scope.id
			};
			$scope.loginValid = false;
			$scope.gRecaptchaResponse = '';
			$scope.$watch('gRecaptchaResponse', function (){

				if ($scope.gRecaptchaResponse.length > 0) {
					$http.post(BACKEND + '/api/captcha', {'captcha': $scope.gRecaptchaResponse})
					.then(function(res) {
						if (res.status ==200) {
							$scope.loginValid = true;
						}
					})
				}

			});


				$http.post(BACKEND +'/api/forgot', JSON.stringify($scope.mail))
				.then(function (res) {
					console.log(res);
					if(res.data.error != undefined){
						Materialize.toast('Please Enter Correct Email ID', 4000,'red darken-4');
					}else if (res.data.success != undefined) {
						$location.path('/login');
					    Materialize.toast('Check Your Email : ' + $scope.email + ' For Password', 6000);
					}
				});
			}

		}]);
