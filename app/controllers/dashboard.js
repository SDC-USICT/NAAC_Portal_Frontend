angular.module('employee')
	.controller('DashboardCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$resource",
		function ($scope, $http, $rootScope, $sessionStorage, $resource) {
			$scope.selected = 0;
		
 	
			var Columns = $resource(BACKEND + '/api/columns');
			 Columns.get().$promise.then(function(data) {
       data = data.toJSON();
       $scope.attributes = [];
       $scope.form_details = data;
       $scope.sections = Object.keys(data);
       angular.forEach(Object.keys(data), function(value, key){
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
				$scope.splitAtCaps = function(s) {
						return s.split(/(?=[A-Z])/).join(' ')
				}
		}]);
