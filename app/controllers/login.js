angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage",
		function ($scope, $http, $rootScope, $sessionStorage) {
			
			req = {
				'empid' : $scope.id,
				'password' : $scope.pwd
			}

			$scope.submit = function () {
				$http.post(BACKEND+'/login', req)
				.then(function (res) {
					console.log(res.data);
				})
			}
		
		}]);
