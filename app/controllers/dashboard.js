angular.module('employee').controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage","$localStorage", "$resource","$location",
        function($scope, $http, $rootScope, $sessionStorage,$localStorage, $resource, $location) {
            $scope.selected = 0;
            $scope.results = {};
            $scope.selectedResult = 0;
            $scope.attributes= [];
            $scope.editing = 0;
            $scope.marked_authors = {};
            $scope.employeeMeta = {}
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

            $scope.empImg = BACKEND + '/static/images/' + $rootScope.loginid + '.jpg?' + new Date().getTime();

            //Declareing a resourcefor post method. It accept Arrays in post method.
            var data_emp = $resource(BACKEND + '/api/employee', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });
            // Sending login data to backend.
            data_emp.query({
                empid: $rootScope.loginid

            }).$promise.then(function(data){
                $scope.employee = data[0]['fields'];
                $scope.employee.pk = data[0]['pk']
            });


            // Getting coulmns from BACKEND.
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
            //  Set all input editable.
            $scope.setEditing = function () {
               $(document).ready(function () {
                    $("input").attr("readonly", false);
                    $('#date_join').addClass('datepicker');

                })
                $scope.$evalAsync();
                $scope.editing = 1;
            }
            // Set all inputs uneditable.
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

            // Returns if some tab is selected or not. boolean return.
            $scope.isSelected = function(value) {
                return value.val == $scope.selected;
            }
            // Set selected tab.
            $scope.setSelected = function(value) {
                $scope.selected = value;
                $scope.selectedResult = 0;
                console.log($scope.form_details[$scope.sections[$scope.selected]])

                //Set Input type
                $(document).ready(function() {
                  var allInput = $('input');
                  console.log(allInput);
                  for(var i=0;i<allInput.length;i++){
                    if(allInput[i].name == 'month'){
                      allInput[i].className="monthpicker";
                      allInput[i].id = "month";
                    }
                    else if(allInput[i].name == 'year' || allInput[i].name=='year_application' || allInput[i].name== "year_grant"){
                      allInput[i].className="yearpicker";
                      allInput[i].id = "year";
                    }
                    else if(allInput[i].name == 'date' || allInput[i].name=="date_of_award" || allInput[i].name=="date_completed"){
                      allInput[i].className="datepicker";
                      allInput[i].id = "date";
                    }
                    console.log(allInput[i].name);

                  }
                  //Month Picker using pickadate
                  $('.monthpicker').pickadate({
                    selectMonths: true,
                    format: 'mmmm',
                    selectYears: false,
                    buttonImageOnly: false,
                    disable: [true],
                    onOpen: function() {
                      Materialize.toast('Select a Month', 4000)
                      $(".picker__nav--prev, .picker__nav--next").remove();
                    },
                    onSet: function( arg ){
                      console.log(arg.highlight);
                      var selectedMonth = parseInt(arg.highlight[1]);
                      var selectedYear = arg.highlight[0];
                      var selectedDate = arg.highlight[2];
                      this.close();
                      this.set('select', [selectedYear, selectedMonth, selectedDate,{ format: 'yyyy/mm/dd' }]);
                    }
                  });
                  //Year Picker

                  $('.yearpicker').pickadate({
                    selectMonths: true,
                    format: 'yyyy',
                    selectYears: true,
                    selectMonths:false,
                    buttonImageOnly: false,
                    disable: [true],
                    onOpen: function() {
                      Materialize.toast('Select a Year', 4000)
                      $(".picker__nav--prev, .picker__nav--next").remove();
                    },
                    onSet: function( arg ){
                      console.log(arg.highlight);
                      var selectedMonth = parseInt(arg.highlight[1]);
                      var selectedYear = arg.highlight[0];
                      var selectedDate = arg.highlight[2];
                      this.close();
                      this.set('select', [selectedYear, selectedMonth, selectedDate,{ format: 'yyyy/mm/dd' }]);
                    }
                  });

                  $('.datepicker').pickadate({
                    selectMonths:true,
                    selectYears:true
                  });

                  });
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
                if (s){
                    return s.split(/(?=[A-Z])/).join(' ')
                }
                return s;
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

            $scope.openTheatre = function (index) {
                console.log('Hello')
                $scope.selectedResultTheatre = index;
                $scope.$evalAsync()
                $(document).ready(function () {
                     $('.modal').modal();
                     $('#modal2').modal('open');
                })
                $scope.$evalAsync();

            }

            $scope.delete = function (val) {
                rq = {
                    'empid' : $rootScope.loginid,
                    'kls' : $scope.attributes[$scope.selected].key,
                    'data' :  $scope.results[$scope.attributes[$scope.selected].key][val]
                }
                $http.post(BACKEND+'/api/delete', JSON.stringify(rq))
                .then(function (res) {
                    if(res.data.error) {
                        Materialize.toast('Oops! Error', 4000)
                        return;
                    }
                    Materialize.toast('Record Deleted Successfully!', 4000)
                    raw = res.data.data;

                    angular.forEach(raw, function(value, key){
                             raw[key]['fields']['pk'] = raw[key]['pk']
                             raw[key]['fields']['model'] = raw[key]['model']
                         });
                     $scope.results[$scope.attributes[$scope.selected].key] =
                     raw.map(function(a) {
                        return a.fields;
                    });

                    //$scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;


                })
            }

                $scope.logout = function(){
                sessionStorage.clear();
                localStorage.clear();
                console.log("logout");
                $location.path('/logout');
                };


                $scope.fillDetails = function(){
                    $location.path('/fill_details');
                }

                $scope.dashboard = function(){
                    $location.path('/dashboard');
                }



            $scope.uploadImage = function(){
                var fd = new FormData();
                fd.append('image', $scope.employeeMeta.image[0]);
                fd.append("name", $rootScope.loginid);
                console.log($scope.employeeMeta.image[0])

                $http({
                    method: 'POST',
                    url: BACKEND + '/api/upload',
                    headers: {
                      'Content-Type': undefined
                    },
                    data: fd,
                    transformRequest: angular.identity
                })
                .then(function (response) {
                  console.log(response.data)
                  window.location.reload();

                })
            }



        }
    ]).directive("filesInput", function() {
  return {
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        console.log('Changed!')
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
});
