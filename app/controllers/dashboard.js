angular.module('employee').controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage", "$resource","$location",
        function($scope, $http, $rootScope, $sessionStorage, $resource, $location) {
            $scope.selected = 0;
            $scope.results = {};
            $scope.selectedResult = 0;
            $scope.attributes= [];
            $scope.editing = 0;
            $scope.marked_authors = {};
            if($rootScope.loginid == undefined) {
                if($sessionStorage.loginid != undefined) {
                    $rootScope.loginid = $sessionStorage.loginid;
                    $rootScope.school_teachers = $sessionStorage.school_teachers 

                } else {
                    $location.url('/')              
                }
            } 

            $sessionStorage.loginid = $rootScope.loginid;    
            $sessionStorage.school_teachers = $rootScope.school_teachers;

            var data_emp = $resource(BACKEND + '/api/employee', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });
            data_emp.query({
                empid: $rootScope.loginid

            }).$promise.then(function(data){
                $scope.employee = data[0]['fields'];
                $scope.employee.pk = data[0]['pk']
            });

            var Columns = $resource(BACKEND + '/api/columns');
            Columns.get().$promise.then(function(data) {
                data = data.toJSON();
                $scope.attributes = [];
                $scope.form_details = data;
                $scope.sections = Object.keys(data).sort();
                angular.forEach($scope.sections, function(value, key) {
                    $scope.attributes.push({
                        'key': value,
                        'val': key
                    })
                });
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
                $scope.selected = value;
                $scope.selectedResult = 0;
                console.log($scope.form_details[$scope.sections[$scope.selected]])
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
                    console.log($scope.results)
                    if (data[0] != undefined) {
                         $scope.model_type = data[0].model;
                         $scope.saved_columns = data[0].fields;
                         // TODO: Rethink 
                         angular.forEach(data, function(value, key){
                             data[key]['fields']['pk'] = data[key]['pk'] 
                             data[key]['fields']['model'] = data[key]['model']
                         });
                         $scope.results[$scope.attributes[$scope.selected].key] =
                         data.map(function(a) {
                            console.log('map')
                            console.log(a)
                            a.fields.employee = $rootScope.loginid;
                            return a.fields;
                        });

                         console.log($scope.results)
                        $(document).ready(function() {
                            $('select').material_select();
                          });
                        $scope.$evalAsync()
                        $scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length -1;

                    } else {
                        console.log('Here!')
                        $scope.results[$scope.attributes[$scope.selected].key] = []
                        console.log($scope.results)
                        console.log($scope.attributes[$scope.selected])

                    }
                    console.log($scope.results)
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
                console.log('me')
				sample = $scope.results[$scope.attributes[$scope.selected].key][0];
                console.log(sample)
				skel = skeleton(sample);
                skel.employee = $rootScope.loginid;
				$scope.results[$scope.attributes[$scope.selected].key].push(skel);	
                $scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;
	
			}

            $scope.getSelectedResult = function () {
                return $scope.selectedResult;
            }
            $scope.save = function () {
                console.log($scope.results[$scope.attributes[$scope.selected].key])
                var d =  $scope.results[$scope.attributes[$scope.selected].key];
                tmp = [];
                angular.forEach( d, function(value, key){
                    if(value){
                        value.employee = $rootScope.loginid;
                        tmp.push(value);
                    }
                });
                $scope.results[$scope.attributes[$scope.selected].key] = tmp;
                rq = {
                    'kls' : $scope.attributes[$scope.selected].key,
                    'data' :  $scope.results[$scope.attributes[$scope.selected].key]
                }
                $http.post(BACKEND+'/api/post', JSON.stringify(rq))
                .then(function (res) {
                    if(res.data.error) {
                        Materialize.toast('Oops! Error', 4000) 
                        return;
                    }
                    Materialize.toast('Data Saved Successfully!', 4000) 
                    raw = res.data.data;

                    angular.forEach(raw, function(value, key){
                             raw[key]['fields']['pk'] = raw[key]['pk'] 
                             raw[key]['fields']['model'] = raw[key]['model']
                         });
                     $scope.results[$scope.attributes[$scope.selected].key] =
                     raw.map(function(a) {
                        return a.fields;
                    });

                     $scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;


                })
            }
            
        
        }
    ]);
