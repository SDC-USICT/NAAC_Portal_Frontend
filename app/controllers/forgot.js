angular.module('employee')
	.controller('ForgotCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			if($sessionStorage.loginid == undefined){
					$location.path('/index');
			}
			$scope.id = $sessionStorage.loginid;
			$scope.submit = function () {
				$scope.mail = {
				'email' : $scope.email,
				'empid' : $scope.id
			};
			console.log("Email data");
			console.log($scope.id);
				$http.post(BACKEND+'/api/forgot', JSON.stringify($scope.mail))
				.then(function (res) {
					console.log("Email data");
					console.log(res.data);
					if (res.data.success != undefined) {
					    console.log("Reidrecting");
						//$location.path('/login');
						$scope.error = "false";
					}else{
						alert('Error during sending email');
					}
				});
			}

		}]);