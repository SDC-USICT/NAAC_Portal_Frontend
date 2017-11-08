(function() {
    'use strict';


    //  Module
    angular
        .module('employee')
        .factory('formService', factory);


    //  factory factory
    factory.$inject =  ['$http'];
    function factory($http) {
        var service = {
            post:post
        };
        return service;

        ////////

        function post(element) {
            /* This is a validation factory */
            console.log("From Form service");
            return $http.post(BACKEND+'/api/post', JSON.stringify(element))
            .then(function (res) {
              if(res.data.error) {
                Materialize.toast('Oops! Error', 4000,'red')
                return;
              }
              //console.log(res.data.data);
              Materialize.toast('Data Saved Successfully!', 4000,'rounded')
              return res.data.data;



        });
    }
  }

})();
