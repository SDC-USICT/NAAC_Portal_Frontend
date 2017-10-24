(function() {
    'use strict';


    //  Module
    angular
        .module('employee')
        .controller('ProfessionalCtrl', Controller);

    //  Controller Controller
    Controller.$inject =   ['$scope','formService'];
    function Controller($scope,formService) {
        $scope.professional={
        //  employee:$scope.$parent.employee.pk
        }
        $scope.save = function(){
          var req = {
            'kls' : $scope.attributes[$scope.selected].key,
            'data' :  [$scope.professional]
          }
          formService.post(req);
          $scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;
        }
    }

})();
