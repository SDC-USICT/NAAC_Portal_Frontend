angular.module('employee')
	.controller('MainCtrl', ["$scope", "$http" , "$rootScope", "$window", "$resource","$location", "$sessionStorage",
		function ($scope, $http, $rootScope, $window, $resource, $location, $sessionStorage, getDept) {

		if(sessionStorage.declaration == undefined){
			console.log('undefined!')
		   sessionStorage.clear();
			$location.path('/');
		}else if(sessionStorage.status != undefined && sessionStorage.school != undefined && sessionStorage.loginid != undefined){
		    $location.path('/dashboard');
        }
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
			 sessionStorage.setItem('school',$scope.ss.selected);
				$rootScope.school = $scope.ss.selected;
				$location.path('/selection');
			};
   $scope.school = "";
   $scope.updateDept = function(department){
    $scope.school = department;
    $rootScope.school = department;
   }
		}]);