angular.module('employee')
	.controller('IndexCtrl', ["$scope", "$http" , "$rootScope", "$sessionStorage", "$location","$window",
		function ($scope, $http, $rootScope,$sessionStorage, $location, $window) {
            console.log($location.absUrl())
            $scope.baseUrl = $location.url();
	        if(sessionStorage.declaration){
                if(sessionStorage.declaration == "checked"){
                    $location.path('/selection');
                }
            }
                
            $scope.index = function(){
                
                if(sessionStorage.declaration == undefined){
                    sessionStorage.declaration = "checked";
                }else{
                    $location.path('/selection');
                }
            
                $location.path('/selection');
            };
            $scope.redirect = function(){
            	$('.index').keydown(function(e){
             	  if(e.keyCode == 13){
                        $('.btn').trigger('click');
              	     }
                });
            }
        }]);
