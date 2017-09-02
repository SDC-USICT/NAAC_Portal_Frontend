angular.module('employee')
    .controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage", "$resource",
        function($scope, $http, $rootScope, $sessionStorage, $resource) {
            $scope.selected = 0;
            $scope.results = {};
            $scope.selectedResult = null;
            var Columns = $resource(BACKEND + '/api/columns');
            Columns.get().$promise.then(function(data) {
                data = data.toJSON();
                console.log(data);
                $scope.attributes = [];
                $scope.form_details = data;
                $scope.sections = Object.keys(data);
                console.log($scope.sections[0]);
                angular.forEach(Object.keys(data), function(value, key) {
                    $scope.attributes.push({
                        'key': value,
                        'val': key
                    })
                });
            });

            $scope.get_status = function() {
                return $scope.save_status;
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
                    empid: "30003",
                    kls: $scope.attributes[value].key
                }).$promise.then(function(data) {

                    if (data[0] != undefined) {
                         $scope.model_type = data[0].model;
                        $scope.saved_columns = data[0].fields;
                         $scope.results[$scope.attributes[$scope.selected].key] =
                         data.map(function(a) {
                            return a.fields;
                        });
                        console.log($scope.results);
                        console.log($scope.attributes[$scope.selected].key);
                        $scope.selectedResult = $scope.results[$scope.attributes[$scope.selected].key][0];
                        $(document).ready(function() {
                            $('select').material_select();
                          });
                        $scope.$evalAsync()

                    } else {

                    }
                });

            }
            $scope.splitAtCaps = function(s) {
                return s.split(/(?=[A-Z])/).join(' ')
            }
            $scope.setSelectedResult = function (val) {
							console.log('in selected result');
							console.log(val)
                $scope.selectedResult = val;
								// $(document).ready(function () {
								// 	$('select').material_select();
								// })
								// $scope.$evalAsync();


            }
						function skeleton(source, isArray) {
						  var o = Array.isArray(source) ? [] : {};
						  for (var key in source) {
						    if (source.hasOwnProperty(key)) {
						      var t = typeof source[key];
						      o[key] = t == 'object' ? skeleton(source[key]) : { string: '', number: 0, boolean: false }[t];
						    }
						  }
						  return o;
						}
						$scope.addNewObject = function () {
							var sample = $scope.results[$scope.attributes[$scope.selected].key][0];
							var skel = skeleton(sample);
							skel.title = "Please enter a title!" + Math.random();
							$scope.results[$scope.attributes[$scope.selected].key].push(skel);
							$(document).ready(function () {
								$('select').material_select();
							})

							console.log($scope.results);

							$scope.setSelectedResult(skel);
							$scope.$evalAsync();
							$(document).ready(function () {
								$('select').material_select();
								  $("select").val($scope.results[$scope.attributes[$scope.selected].key][$scope.results[$scope.attributes[$scope.selected].key].length-1]);

							})
						}
        }
    ]);
