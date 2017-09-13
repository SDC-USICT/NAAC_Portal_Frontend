angular.module('employee')
	.controller('IndexCtrl', ["$scope", "$http" , "$rootScope", "$location","$window",
		function ($scope, $http, $rootScope, $location, $window) {
	    if($window.Storage){
                if(localStorage.getItem('declaration') == "checked"){
                    $location.path('/index');
                }
            }
            $scope.index = function(){
                if($window.Storage){
                if(localStorage.getItem('declaration') == undefined){
                    localStorage.setItem('declaration', 'checked');
                }else{
                    $location.path('/index');
                }
            }
                $location.path('/index');
            };
            $scope.redirect = function(){
            	$('.index').keydown(function(e){
             	if(e.keyCode == 13){
                $('.btn').trigger('click');
              	}
         });
         }
        }]);
