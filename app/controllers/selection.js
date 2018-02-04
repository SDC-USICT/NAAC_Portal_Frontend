angular.module('employee')
    .controller('SelCtrl', ["$scope", "$http" , "$rootScope", "$location", "$resource","$window",
        function ($scope, $http, $rootScope, $location, $resource,$window) {
            $scope.BACKEND = BACKEND;
            if(sessionStorage.status != undefined) {
                $location.path('/dashboard');
            }else {
            var data_emp = $resource(BACKEND + '/api/school', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });

      
            data_emp.query({
                school: sessionStorage.school
            }).$promise.then(function(data){
                console.log(data)
                $scope.empData = data;
                var prefix = ["Dr","Ms","Mr"];
                var len = $scope.empData.length;
                for(var j = 0;j < len;j++){
                    if($scope.empData[j].fields.name.slice(0,2).match(/(Dr.|Dr|Mr|Ms|Mr.|Ms.|Dr .| Ms .|Mr . )/i)){
                        var slice = $scope.empData[j].fields.name.slice(2);
                        $scope.empData[j].fields.name="Prof. " + slice;
                    }else if(!$scope.empData[j].fields.name.slice(0,6).match(/(Prof.|Prof|Prof .)/i)){
                        $scope.empData[j].fields.name="Prof. " + $scope.empData[j].fields.name;
                    }
                }
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
