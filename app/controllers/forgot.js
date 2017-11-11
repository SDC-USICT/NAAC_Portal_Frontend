angular.module('employee')
	.controller('ForgotCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			$scope.id = sessionStorage.loginid;
			$scope.submit = function () {
				$scope.mail = {
				"email" : $scope.email,
				"loginid" : $scope.id
			};
			console.log($scope.mail);
				$http.post(BACKEND +'/api/forgot', JSON.stringify($scope.mail))
				.then(function (res) {
					console.log(res);
					if(res.data.error != undefined){
						Materialize.toast('Please Enter Correct Email ID', 4000);
					}else if (res.data.success != undefined) {
						$location.path('/login');
					    Materialize.toast('Check Your Email : ' + $scope.email + ' For Password', 6000);
					}
				});
			}

		}]);