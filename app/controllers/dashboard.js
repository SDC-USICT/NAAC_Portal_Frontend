angular.module('employee').controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage", "$resource","$location",
        function($scope, $http, $rootScope, $sessionStorage, $resource, $location) {
            $scope.selected = 0;
            $scope.results = {};
            $scope.selectedResult = 0;
            $scope.attributes= [];
            $scope.editing = 0;

            if($rootScope.loginid == undefined) {
                console.log($rootScope.loginid);

                if($sessionStorage.loginid != undefined) {
                    $rootScope.loginid = $sessionStorage.loginid;
                } else {
                    $location.url('/')              
                }
            } 

            $sessionStorage.loginid = $rootScope.loginid;    

            var data_emp = $resource(BACKEND + '/api/employee', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });
            data_emp.query({
                empid: $rootScope.loginid

            }).$promise.then(function(data){
                console.log(data);
                $scope.employee = data[0]['fields'];
                $scope.employee.pk = data[0]['pk']
            });

            var Columns = $resource(BACKEND + '/api/columns');
            Columns.get().$promise.then(function(data) {
                data = data.toJSON();
                console.log(data);
                $scope.attributes = [];
                $scope.form_details = data;
                $scope.sections = Object.keys(data).sort();
                console.log($scope.sections);
                angular.forEach($scope.sections, function(value, key) {
                    $scope.attributes.push({
                        'key': value,
                        'val': key
                    })
                });
                console.log($scope.attributes);
                $scope.setSelected(0);
                
            });
            $scope.setEditing = function () {
               $(document).ready(function () {
                    $("input").attr("readonly", false);
                    $('#date_join').addClass('datepicker');
                })
                $scope.$evalAsync();
                $scope.editing = 1;
            }
            $scope.unsetEditing = function () {
                $(document).ready(function () {
                    $("input").attr("readonly", true);
                })
                $scope.$evalAsync();

                $scope.editing = 0;
                req = {
                    'data' : $scope.employee
                }
                console.log(req)
                $http.post(BACKEND+'/api/emppost', req)
                .then(function (data) {
                    data = data.data;
                    $scope.employee = data[0]['fields'];
                    $scope.employee.pk = data[0]['pk']
                })
            }
            $scope.isSelected = function(value) {
                return value.val == $scope.selected;
            }
            $scope.setSelected = function(value) {
                console.log(value)
                $scope.selected = value;
                // Experiment
                var data_get = $resource(BACKEND + '/api/get/', null, {
                    'query': {
                        method: 'POST',
                        isArray: true
                    }
                });

                data_get.query({
                    empid: $rootScope.loginid,
                    kls: $scope.attributes[value].key
                }).$promise.then(function(data) {
                    console.log(data);
                    if (data[0] != undefined) {
                         $scope.model_type = data[0].model;
                         $scope.saved_columns = data[0].fields;
                         // TODO: Rethink 
                         angular.forEach(data, function(value, key){
                             console.log(key)
                             data[key]['fields']['pk'] = data[key]['pk'] 
                             data[key]['fields']['model'] = data[key]['model']
                         });
                         $scope.results[$scope.attributes[$scope.selected].key] =
                         data.map(function(a) {
                            a.fields.employee = $rootScope.loginid;
                            return a.fields;
                        });
                        console.log($scope.results);
                        console.log($scope.attributes[$scope.selected].key);
                        $(document).ready(function() {
                            $('select').material_select();
                          });
                        $scope.$evalAsync()

                    } else {
                        $scope.results[$scope.attributes[$scope.selected].key] = []
                    }
                });

            }
            $scope.splitAtCaps = function(s) {
                return s.split(/(?=[A-Z])/).join(' ')
            }
            $scope.setSelectedResult = function(val=null){
						
               if(val != null) {
                $scope.selectedResult = val;
               }

            };
			function skeleton(source, isArray) {
			  var o = Array.isArray(source) ? [] : {};
			  for (var key in source) {
			    if (source.hasOwnProperty(key)) {
			      var t = typeof source[key];
			      o[key] = t == 'object' ? skeleton(source[key]) : { string: '', number: null, boolean: false }[t];
			    }
			  }
			  return o;
			}
            function orderKeys(obj, expected) {
              var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
                  if (k1 < k2) return -1;
                  else if (k1 > k2) return +1;
                  else return 0;
              });

              var i, after = {};
              for (i = 0; i < keys.length; i++) {
                after[keys[i]] = obj[keys[i]];
                delete obj[keys[i]];
              }

              for (i = 0; i < keys.length; i++) {
                obj[keys[i]] = after[keys[i]];
              }
              return obj;
            }
			$scope.addNewObject = function () {
				sample = $scope.results[$scope.attributes[$scope.selected].key][0];
				skel = skeleton(sample);
				skel.title = "Please enter a title!" + Math.random();
                skel.employee = $rootScope.loginid;
				$scope.results[$scope.attributes[$scope.selected].key].push(skel);

                length = $scope.results[$scope.attributes[$scope.selected].key].length - 1
				$(document).ready(function () {
					$('select').material_select();
				})

				console.log($scope.results);
                $scope.selectedResult = length;
				console.log($scope.selectedResult);
                $('select').material_select();

				$scope.$evalAsync();
				$('select').material_select();

			}

            $scope.getSelectedResult = function () {
                return $scope.selectedResult;
            }
            $scope.save = function () {
                rq = {
                    'kls' : $scope.attributes[$scope.selected].key,
                    'data' :  $scope.results[$scope.attributes[$scope.selected].key]
                }
                console.log(rq);
                $http.post(BACKEND+'/api/post', JSON.stringify(rq))
                .then(function (res) {
                    Materialize.toast('Data Saved Successfully!', 4000) 
                    console.log(res.data.data);
                    raw = res.data.data;

                    angular.forEach(raw, function(value, key){
                             console.log(key)
                             raw[key]['fields']['pk'] = raw[key]['pk'] 
                             raw[key]['fields']['model'] = raw[key]['model']
                         });
                     $scope.results[$scope.attributes[$scope.selected].key] =
                     raw.map(function(a) {
                        return a.fields;
                    });


                })
            }
        
        }
    ]);
