(function() {
    'use strict';


    //  Module
    angular
        .module('employee')
        .controller('ProfessionalCtrl', Controller);

    //  Controller Controller
    Controller.$inject =   ['$scope','$http'];
    function Controller($scope,$http) {

        $scope.employee="this is professionalCtrl";
        console.log("from professionalCtrl");
        //  activate logic
        //console.log($param($scope.naacForm));

        $scope.acadExp;
        $scope.indExp;
        $scope.highQual;
        $scope.qualAdd;
        $scope.totStu;
        $scope.phdp;
        $scope.phds;
        $scope.phda;
        $scope.yearProf;



        console.log($scope.data);
        console.log($scope.$parent.form_details[$scope.sections[$scope.selected]]);

        $scope.save = function(){
          $scope.data={
            employee:$scope.$parent.employee.pk,
            title: $scope.acadExp,
            industrial_exp:$scope.indExp,
            qualification_before:$scope.highQual,
            qualification_after:$scope.qualAdd,
            phds:$scope.totStu,
            pursuing:$scope.phdp,
            submitted:$scope.phds,
            awarded:$scope.phda,
            year:$scope.yearProf
          }
          console.log($scope.data);
          //Submitt form

          var rq = {
            'kls' : $scope.attributes[$scope.selected].key,
            'data' :  [$scope.data]
          }
          $http.post(BACKEND+'/api/post', JSON.stringify(rq))
          .then(function (res) {
            if(res.data.error) {
              Materialize.toast('Oops! Error', 4000)
              return;
            }
            Materialize.toast('Data Saved Successfully!', 4000)
            raw = res.data.data;

            $scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;


          });





        }
    }

})();
