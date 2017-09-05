angular.module('employee')
	.controller('IndexCtrl', ["$scope", "$http" , "$rootScope", "$location",
		function ($scope, $http, $rootScope, $location) {
            console.log("control");
            $scope.index = function(){
                $location.path('/index');
                console.log("school");
            };
        }]);
