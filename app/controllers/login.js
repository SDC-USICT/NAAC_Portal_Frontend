angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			
			console.log($rootScope.loginid);

			$scope.submit = function () {
				req = {
				'empid' : $rootScope.loginid,
				'password' : $scope.password
			}
			console.log(req);
				$http.post(BACKEND+'/api/login', JSON.stringify(req))
				.then(function (res) {
					console.log(res.data);
					if (res.data.success != undefined) {
						$location.path('/dashboard');
					}
					else
						alert('Login incorrect');
				});
			}

			$scope.forgot = function(){
				console.log("Reidrecting");
					$location.path('/forgot');
			};
		
		}]);