angular.module('employee')
	.controller('DashboardCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$resource",
		function ($scope, $http, $rootScope, $sessionStorage, $resource) {
			$scope.selected = 0;
				 var Sections = $resource(BACKEND + '/api/sections');
			 Sections.query(function(secs) {
			 	$scope.attributes = [];
				  angular.forEach(secs, function(value, key){
				  	$scope.attributes.push({
				  		'key' : value,
				  		'val' : key
				  	})
				  });
				});

    $scope.get_status = function () {
        return $scope.save_status;
    }
    $scope.isSelected = function (value) {
        return value.val == $scope.selected;
    }
    $scope.setSelected = function (value) {
    	console.log(value)
        $scope.selected = value;
        console.log($scope.va)
    }

		}]);
