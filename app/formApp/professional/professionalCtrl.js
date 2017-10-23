(function() {
    'use strict';


    //  Module
    angular
        .module('employee')
        .controller('ProfessionalCtrl', Controller);

    //  Controller Controller
    Controller.$inject =   ['$scope'];
    function Controller($scope) {

        $scope.employee="this is professionalCtrl";
        console.log("from professionalCtrl");
        //  activate logic
        activate();

        ////////

        function activate() {
          
            /* - */
        }
    }

})();
