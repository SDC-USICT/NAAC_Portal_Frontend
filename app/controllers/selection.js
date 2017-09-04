angular.module('employee')
	.controller('SelCtrl', ["$scope", "$http" , "$rootScope", "$location", "$resource",
		function ($scope, $http, $rootScope, $location, $resource) {
            console.log($rootScope.school);
            if($rootScope.school == undefined){
            	$location.path('/')
            }
            else {
            	 var data_emp = $resource(BACKEND + '/api/school', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });

             data_emp.query({
                school: $rootScope.school

            }).$promise.then(function(data){
                console.log(data);
              	$scope.empData = data;
            });
            }	

            $scope.setEmployee = function (val) {
            	$rootScope.loginid = val.pk;
            	console.log(val.pk);
            	$location.url('/login');
            }
          
		}]);
