angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			
		

			$scope.submit = function () {
				req = {
				'empid' : $scope.empid,
				'password' : $scope.password
			}
			console.log(req);
				$http.post(BACKEND+'/api/login', JSON.stringify(req))
				.then(function (res) {
					console.log(res.data);
					if (res.data.success != undefined) {
						$rootScope.loginid = $scope.empid;
						$location.path('/dashboard');

					}
					else
						alert('Login incorrect');
				});
			}
		
		}]);
