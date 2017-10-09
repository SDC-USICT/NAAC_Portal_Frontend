angular.module('employee')
	.controller('ApproveCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location",
		function ($scope, $http, $rootScope, $sessionStorage, $location) {
			console.log('hello')
			console.log($location.search().id);
			$scope.id = $location.search().id;
			$scope.email = $location.search().email;
			$scope.title = $location.search().title;
			$scope.type = $location.search().type;
			$scope.invitee = $location.search().invitee;
			$scope.status = null;
			$scope.go = function (arg) {
				req = {
					'type' : $scope.type,
					'email' : $scope.email,
					'status' : arg,
					'pk' : $scope.id
				}
				$http.post(BACKEND + '/api/verify_coauthor', JSON.stringify(req))
				.then(function (res) {
					console.log(res)
					if (res) {
						$scope.status = "Thank you! Your response has been recorded!";
					}
				})
			}


		}]);