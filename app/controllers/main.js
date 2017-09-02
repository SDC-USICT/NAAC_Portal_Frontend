angular.module('employee')
	.controller('MainCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$resource","$location",
		function ($scope, $http, $rootScope, $sessionStorage, $resource, $location, getDept) {
			$scope.schools = [
				{
					"value" : "University School of Information & Communication Technology",
					"key" :"usict"
				},
				{
					"value": "University School of Law and Legal Studies",
					"key" :"uslls"
				},
				{
					"value": "University School of Environment Management",
					"key" :"usem"
				},
				{
					"value": "University School of Architecture and Planning  ",
					"key" :"usap"
				},
				{
					"value": "University School of Humanities and Social Sciences",
					"key": "ushss"
				},
				{
					"value": "University School of Basic and Applied Sciences",
					"key" :"usbas"
				},
				{
					"value": "University School of Mass Communication  ",
					"key" :"usmc"
				},
				{
					"value": "University School of Chemical Technology",
					"key" :"usct"
				},
				{
					"value": "University School of BioTechnology",
					"key" :"usbt"
				},
				{
					"value": "University School of Education",
					"key" :"use"
				},
				{
					"value": "University School of Management Studies",
					"key" :"usms"
				}

			];
            $scope.school = "";
            console.log("controller");
			$scope.showSchool = function(){
				$location.path('/selection');
                console.log("directing");
			}
            $scope.updateDept = function(department){
                $scope.school = department;
                console.log("Updated value " + $scope.school + " " + department);
            }
		}]);