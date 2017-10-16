angular.module('employee')
    .controller('SelCtrl', ["$scope", "$http" , "$rootScope", "$location", "$resource","$window",
        function ($scope, $http, $rootScope, $location, $resource,$window) {
            $scope.BACKEND = BACKEND;
            if(sessionStorage.getItem('school') == undefined){
                $location.path('/index');
            }else if(sessionStorage.getItem('status') != undefined) {
                $location.path('/dashboard');
            }else {
                 var data_emp = $resource(BACKEND + '/api/school', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
                });
             data_emp.query({
                school: sessionStorage.getItem('school')
            }).$promise.then(function(data){
                $scope.empData = data;
                 $(document).ready(function(){
                    $('.progress').css('display','none');
                    $('.select').css('display','block');
                    toast(i);
                    i++;
                 });

                $rootScope.school_teachers = data;
                $scope.empImg = "''";
            });
            }   

            $scope.setEmployee = function (val) {
                sessionStorage.setItem('loginid', val.pk);
                $rootScope.loginid = val.pk;
                console.log(val.pk);
                $location.url('/login');
                Materialize.Toast.removeAll();
            }
            $scope.validateEmp = function(data){
                if(data.pk.length == 5){
                    return true;
                }
            }
          
        }]);
