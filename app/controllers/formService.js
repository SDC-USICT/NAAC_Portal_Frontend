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
                console.log(res);
                console.log(res.data.data.csrf);
              if(res.data.error) {
                //Materialize.toast('Oops! Error', 4000,'red darken-4 text-lighten-2');
                return 0;
              }else{
                  return (res.data.csrf.csrf);
              }
        });
    }
  }

})();
