angular.module('employee')
	.controller('SelCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage",
		function ($scope, $http, $rootScope, $sessionStorage, getDept) {
            console.log("sel" + getDept.school);
            $scope.sch = getDept.school;
			var empData = $resource(BACKEND + 'api/employeeData' + sch);
		}]);
