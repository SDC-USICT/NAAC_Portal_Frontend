angular.module('employee')
	.controller('ForgotCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {

			$scope.submit = function () {
				mail = {
				'email' : $scope.email
			};
				$http.post(BACKEND+'/api/login', JSON.stringify(mail))
				.then(function (res) {
					console.log(res.data);
					if (res.data.success != undefined) {
					    console.log("Reidrecting");
						$location.path('/login');

					}
				});
			}

		}]);