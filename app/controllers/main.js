angular.module('employee')
	.controller('MainCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$resource",
		function ($scope, $http, $rootScope, $sessionStorage, $resource) {
			 var Schools = $resource(BACKEND + '/api/schools');
			 Schools.query(function(schools) {
				  $scope.schools = schools;
				});
			
		}]);
