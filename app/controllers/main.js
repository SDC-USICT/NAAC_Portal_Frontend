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
			$scope.ss = {
				'selected' : $scope.schools[0]
			};
			$scope.setSelectedSchool = function () {
				console.log($scope.ss);
				$rootScope.school = $scope.ss.selected;
								$location.path('/selection');


			}
            $scope.school = "";
            console.log("controller");
			$scope.showSchool = function(){
                console.log("directing");
			}
            $scope.updateDept = function(department){
                $scope.school = department;
                				$rootScope.school = department;

                console.log("Updated value " + $scope.school + " " + department);
            }
		}]);