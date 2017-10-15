(function() {
    'use strict';


    //  Module
    angular
        .module('employee')
        .factory('validationService', factory);


    //  factory factory
    factory.$inject =  [];
    function factory() {
        var service = {
            validator: validator
        };
        return service;

        ////////

        function validator(element) {
            /* This is a validation factory */
            //Implement your form validation here.
            console.log("im from factory validtaion");
            for (var i = 0; i < element.length; i++) {
              if (element[i].name == 'title') {
                $(element[i]).attr("pattern", "[a-zA-Z]");
                $(element[i]).attr("minlength","3");
                $(element[i]).attr("maxlength","60");
              }

            }
        }
    }

})();
