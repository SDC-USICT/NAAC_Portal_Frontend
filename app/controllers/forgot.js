angular.module('employee')
	.controller('ForgotCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {

			$scope.submit = function () {
				mail = {
				'email' : $scope.email,
				'empid' : $rootScope.loginid
			};
				$http.post(BACKEND+'/api/forgot', JSON.stringify(mail))
				.then(function (res) {
					console.log(res.data);
					if (res.data.success != undefined) {
					    console.log("Reidrecting");
						$location.path('/login');
						$scope.error = "false";
					}else{
						alert('Error during sending email');
					}
				});
			}

		}]);