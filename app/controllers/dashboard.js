angular.module('employee').controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage", "$localStorage", "$resource", "$location", "formService",
    function($scope, $http, $rootScope, $sessionStorage, $localStorage, $resource, $location, formService) {
        $scope.selected = 0;
        $scope.results = {};
        $scope.coauthors = {};
        $scope.attributes = [];
        $scope.selectedResult = null;
        $scope.editing = 0;
        $scope.marked_authors = {};
        $scope.employeeMeta = {};
        if ($rootScope.loginid == undefined) {
            if ($sessionStorage.loginid != undefined) {
                $rootScope.loginid = $sessionStorage.loginid;
                $rootScope.school_teachers = $sessionStorage.school_teachers

            } else {
                $location.url('/')
            }


            if(localStorage.getItem("noAwards") == "true"){
                    $scope.noaward = 1;
                    $scope.awardChecked = 1;                  
      }

       // for yes/no section
            $scope.noAwrd = function(){
                  if(localStorage.getItem('noAwards') == undefined){
                    localStorage.setItem('noAwards', "true");
                    $scope.awardChecked = 1;
                  }else if($scope.awardChecked){
                      localStorage.removeItem('noAwards');
                      $scope.noaward = 1;
                  }
           }


      if(localStorage.getItem("noJp") == "true"){
                    $scope.nojp = 1;
                    $scope.jpChecked = 1;                  
      }

      // for yes/no section
            $scope.noJoP = function(){
                  if(localStorage.getItem('noJp') == undefined){
                    localStorage.setItem('noJp', "true");
                    $scope.jpChecked = 1;
                  }else if($scope.jpChecked){
                      localStorage.removeItem('noJp');
                      $scope.nojp = 1;
                  }
           }


      if(localStorage.getItem('noConf') == "true"){
                    $scope.noconf = 1;
                    $scope.confChecked = 1;                  
      }
      // for yes/no section
            $scope.noCnf = function(){
                  if(localStorage.getItem('noConf') == undefined){
                    localStorage.setItem('noConf', "true");
                    $scope.confChecked = 1;
                  }else if($scope.confChecked){
                      localStorage.removeItem('noConf');
                      $scope.noconf = 1;
                  }
           }


      if(localStorage.getItem('noBChap') == "true"){
                    $scope.nobchap = 1;
                    $scope.bchapChecked = 1;                  
      }

// for yes/no section
            $scope.noBChp = function(){
                  if(localStorage.getItem('noBChap') == undefined){
                    localStorage.setItem('noBChap', "true");
                    $scope.bchapChecked = 1;
                  }else if($scope.bchapChecked){
                      localStorage.removeItem('noBChap');
                      $scope.nobchap = 1;
                  }
           }

      if(localStorage.getItem('noBook') == "true"){
                    $scope.nobook = 1;
                    $scope.bookChecked = 1;                  
      }

// for yes/no section
            $scope.noBok = function(){
                  if(localStorage.getItem('noBook') == undefined){
                    localStorage.setItem('noBook', "true");
                    $scope.bookChecked = 1;
                  }else if($scope.bookChecked){
                      localStorage.removeItem('noBook');
                      $scope.nobook = 1;
                  }
           }


      if(localStorage.getItem('noWork') == "true"){
                    $scope.nowork = 1;
                    $scope.workChecked = 1;                  
      }

// for yes/no section
            $scope.noWrk = function(){
                  if(localStorage.getItem('noWork') == undefined){
                    localStorage.setItem('noWork', "true");
                    $scope.workChecked = 1;
                  }else if($scope.workChecked){
                      localStorage.removeItem('noWork');
                      $scope.nowork = 1;
                  }
           }

      if(localStorage.getItem('noProj') == "true"){
                    $scope.noproj = 1;
                    $scope.projChecked = 1;                  
      }

// for yes/no section
            $scope.noPrj = function(){
                  if(localStorage.getItem('noProj') == undefined){
                    localStorage.setItem('noProj', "true");
                    $scope.projChecked = 1;
                  }else if($scope.projChecked){
                      localStorage.removeItem('noProj');
                      $scope.noproj= 1;
                  }
           }

      if(localStorage.getItem('noMem') == "true"){
                    $scope.nomem = 1;
                    $scope.memChecked = 1;                  
      }
// for yes/no section
            $scope.noMemb = function(){
                  if(localStorage.getItem('noMem') == undefined){
                    localStorage.setItem('noMem', "true");
                    $scope.memChecked = 1;
                  }else if($scope.memChecked){
                      localStorage.removeItem('noMem');
                      $scope.nomem = 1;
                  }
           }


      if(localStorage.getItem('noPat') == "true"){
                    $scope.nopat = 1;
                    $scope.patChecked = 1;                  
      }

// for yes/no section
            $scope.noPt = function(){
                  if(localStorage.getItem('noPat') == undefined){
                    localStorage.setItem('noPat', "true");
                    $scope.patChecked = 1;
                  }else if($scope.patChecked){
                      localStorage.removeItem('noPat');
                      $scope.nopat = 1;
                  }
           }


      if(localStorage.getItem('noExt') == "true"){
                    $scope.noext = 1;
                    $scope.extChecked = 1;                  
      }


           // for yes/no section
            $scope.noEX = function(){
                  if(localStorage.getItem('noExt') == undefined){
                    localStorage.setItem('noExt', "true");
                    $scope.extChecked = 1;
                  }else if($scope.extChecked){
                      localStorage.removeItem('noExt');
                      $scope.noext = 1;
                  }
           }


      if(localStorage.getItem('noGLec') == "true"){
                    $scope.noglec = 1;
                    $scope.glecChecked = 1;                  
      }

// for yes/no section
            $scope.noGL = function(){
                  if(localStorage.getItem('noGLec') == undefined){
                    localStorage.setItem('noGLec', "true");
                    $scope.glecChecked = 1;
                  }else if($scope.glecChecked){
                      localStorage.removeItem('noGLec');
                      $scope.noglec = 1;
                  }
           }




            $http.get('./app/controllers/subjects.json').
            then(function onSuccess(response) {
              console.log(response.data);
              $scope.SubjectsTakenField= response.data;
            }).
            catch(function onError(response) {
              console.log(response);
            });
        }
        //This is used to send data to backend

        $scope.data = {

        }
        //This is save method
        $scope.saveForm = function() {
            console.log('Inside saveform')
            $scope.data.employee = $sessionStorage.loginid;
            console.log($scope.data);
            coauthor_classes = [
                'Book',
                'BookChapters',
                'JournalPapers',
                'Conference',
                'Projects'
            ]


            if (coauthor_classes.indexOf($scope.attributes[$scope.selected].key) >= 0) {
                tt = []
                angular.forEach($scope.data.coauthor, function(vv, kk) {

                    tt.push(vv.name + ":" + vv.email + ":" + vv.approved);
                });
                $scope.data.coauthor = tt.join(';');
            }

            if ($scope.attributes[$scope.selected].key == 'SubjectsTaken'){
                $scope.data.subjects = $scope.data.subjects.join(';');
                $scope.data.mode = $scope.data.mode.join(';')
            }

            if ($scope.attributes[$scope.selected].key == 'SubjectsTaken') {
                var fd = new FormData();
                try {
                    fd.append('image', $scope.data.image[0]);

                    fd.append("name", $rootScope.loginid);
                    fd.append("filename", $scope.data.year + '_' + $scope.data.course + '_' + $scope.data.title);
                    $http({
                            method: 'POST',
                            url: BACKEND + '/api/subjectupload',
                            headers: {
                                'Content-Type': undefined
                            },
                            data: fd,
                            transformRequest: angular.identity
                        })
                        .then(function(response) {
                            console.log(response.data)
                            Materialize.toast('Time Table Image Uploaded Successfully!', 4000)


                        })

                } catch (err) {
                    alert('Please upload Time Table Image!');
                }

                $scope.data.image = $scope.data.year + '_' + $scope.data.course + '_' + $scope.data.title;

            }


            var req = {
                'kls': $scope.attributes[$scope.selected].key,
                'data': [$scope.data]
            }

            console.log(req);
            formService.post(req);


            $scope.data = {

            };
            console.log($scope.coauthors);
            $(document).ready(function() {
                $('select').material_select();
            })
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();
            $scope.selectedResult = null;
            //$scope.selectedResult =  $scope.results[$scope.attributes[$scope.selected].key].length-1;
        }
        //Saveform ends here


        $scope.hello = function() {
            if ($scope.data.coauthor == undefined) $scope.data.coauthor = [];
            $scope.data.coauthor.push({
                'name': '',
                'email': '',
                'approved': '0'
            })
            console.log($scope.data)
        }

        $scope.removecoauthor = function(val) {
            $scope.data.coauthor.pop(val)
        }

        $scope.addsubs = function() {
            if ($scope.data.subjects == undefined) $scope.data.subjects = [];
            $scope.data.subjects.push('');
            if ($scope.data.mode == undefined) $scope.data.mode = [];
            $scope.data.mode.push('');
            console.log($scope.data)
        }

        $scope.removesubs = function(val) {
            $scope.data.subjects.pop(val);
            $scope.data.mode.pop(val)
        }

        $sessionStorage.loginid = $rootScope.loginid;
        $http.post(BACKEND + '/api/subs')
            .then(function(res) {
                // body...
                console.log(res)
                data = res.data;
                $scope.subjectlist = {}
                console.log(data.data)
                angular.forEach(data, function(value, key) {
                    console.log(value)
                    $scope.subjectlist[(value.fields.name + ' ' + value.fields.code).toString()] = null;

                });
                $(document).ready(function() {

                    $('input.autocomplete').autocomplete({
                        data: $scope.subjectlist,
                        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                        onAutocomplete: function(val) {
                            // Callback function when value is autcompleted.
                        },
                        minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                    });


                })


                console.log($scope.subjectlist)
            })


        $scope.empImg = BACKEND + '/static/images/' + $rootScope.loginid + '.jpg?' + new Date().getTime();

        //Declaring a resource for post method. It accept Arrays in post method.
        var data_emp = $resource(BACKEND + '/api/employee', null, {
            'query': {
                method: 'POST',
                isArray: true
            }
        });
        // Fetching teacher data from BACKEND.
        data_emp.query({
            empid: $rootScope.loginid
        }).$promise.then(function(data) {
            console.log("I am surender kumar");
            console.log(data);
            $scope.employee = data[0]['fields'];
            $scope.employee.pk = data[0]['pk']
        });



        // Getting coulmns from BACKEND.
        var Columns = $resource(BACKEND + '/api/columns');
        Columns.get().$promise.then(function(data) {
            data = data.toJSON();
            $scope.attributes = [];
            $scope.form_details = data;
            console.log("from");
            console.log($scope.form_details);
            $scope.sections = Object.keys(data).sort();
            angular.forEach($scope.sections, function(value, key) {
                var tmp = {
                    'key': value,
                    'val': key
                }
                if (value == 'Awards') {
                    tmp['priority'] = 10;
                    tmp['help'] = ["Award 1", "Award 2"];
                    tmp['icon'] = "";
                } else if (value == 'Book') {
                    tmp['priority'] = 4;
                    tmp['help'] = ["book 1", "book 2"];
                    tmp['icon'] = "book";
                }
                if (value == 'BookChapters') {
                    tmp['priority'] = 3;
                    tmp['icon'] = "import_contacts";
                } else if (value == 'Conference') {
                    tmp['priority'] = 2;
                }
                if (value == 'Extra') {
                    tmp['priority'] = 12;
                } else if (value == 'GuestLecturer') {
                    tmp['priority'] = 7;
                }
                if (value == 'JournalPapers') {
                    tmp['priority'] = 1;
                } else if (value == 'Membership') {
                    tmp['priority'] = 8;
                    tmp['icon'] = "card_membership";
                }
                if (value == 'Patents') {
                    tmp['priority'] = 9;
                } else if (value == 'Professional') {
                    tmp['priority'] = 0;
                    tmp['icon'] = "account_box";
                }
                if (value == 'Projects') {
                    tmp['priority'] = 6;
                } else if (value == 'Subjects Taken') {
                    tmp['priority'] = 11;
                } else if (value == 'Workshop') {
                    tmp['priority'] = 5;
                }

                $scope.attributes.push(tmp)
            });



            $scope.setSelected(9);
            console.log($scope.attributes);
        });
        //  Set all input editable.
        $scope.setEditing = function() {
            $(document).ready(function() {
                $("input").attr("readonly", false);
                $('#date_join').addClass('datepicker');

            });
            $scope.$evalAsync();
            $scope.editing = 1;
        }
        // Set all inputs uneditable.
        $scope.unsetEditing = function() {
            $(document).ready(function() {
                $("input").attr("readonly", true);
            })
            $scope.$evalAsync();

            $scope.editing = 0;
            req = {
                'data': $scope.employee
            }
            $http.post(BACKEND + '/api/emppost', req)
                .then(function(data) {
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
            $scope.data = {};
            console.log($scope.data);
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();
            console.log($scope.naacForm);
            console.log($scope.form_details[$scope.sections[$scope.selected]])


            // Experiment
            var data_get = $resource(BACKEND + '/api/get/', null, {
                'query': {
                    method: 'POST',
                    isArray: true
                }
            });
            //It will fetch all existing data of teacher for respective columns
            data_get.query({
                empid: $rootScope.loginid,
                kls: $scope.attributes[value].key
            }).$promise.then(function(data) {
                console.log(data)
                $scope.mySelectedData = data;;
                console.log($scope.results)
                if (data[0] != undefined) {
                    //$scope.model_type = data[0].model;
                    //$scope.saved_columns = data[0].fields;
                    // TODO: Rethink
                    //If any existing data is present in respective column then push it into results varibale.
                    $scope.results[$scope.attributes[$scope.selected].key] = data.map(function(a) {
                        a.employee = $rootScope.loginid;
                        return a;
                    });

                    //If any coauthors is present in teacher  data then push it into coauthors array.
                    $scope.coauthors[$scope.attributes[$scope.selected].key] = data.map(function(a) {
                        console.log(a)
                        console.log('DEko')
                        if (a.coauthor) {
                            var tmp = [];
                            angular.forEach(a.coauthor.split(';'), function(v, k) {
                                tmp.push({
                                    'name': v.split(':')[0],
                                    'email': v.split(':')[1],
                                    'approved': v.split(':')[2]
                                })
                            });
                            return tmp;
                        }
                    })  ;

                    console.log($scope.results)
                    console.log($scope.coauthors);
                    $scope.$evalAsync()

                } else {
                    console.log('Here!')
                    $scope.results[$scope.attributes[$scope.selected].key] = []
                    console.log($scope.results)
                    console.log($scope.attributes[$scope.selected])

                }
                console.log($scope.results)
            });



            $('input.autocomplete').autocomplete({
                data: $scope.subjectlist,
                limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });



        } //setSelected Ends here




        $scope.splitAtCaps = function(s) {
            if (s) {
                return s.split(/(?=[A-Z])/).join(' ')
            }
            return s;
        }

        $scope.setSelectedResult = function(val) {
            console.log(val);
            if (val != null) {
                console.log($scope.mySelectedData[val]);
                //This will set data model to editable
                $scope.data = $scope.mySelectedData[val];
                if ($scope.data.coauthor) {
                    var tmp = [];
                    angular.forEach($scope.data.coauthor.split(';'), function(v, k) {
                        tmp.push({
                            'name': v.split(':')[0],
                            'email': v.split(':')[1],
                            'approved': v.split(':')[2]
                        })
                    });
                    $scope.data.coauthor = tmp;
                    console.log($scope.data);
                }

                if ($scope.data.subjects) {
                    var tmp = $scope.data.subjects.split(';')
                    $scope.data.subjects = tmp;
                }

                if($scope.data.mode) {
                    var tmp = $scope.data.mode.split(';')
                    $scope.data.mode = tmp;
                }

                $(document).ready(function() {
                    console.log($('select'));
                    $('select').material_select();
                });

            }

        };




        function skeleton(source, isArray) {
            var o = Array.isArray(source) ? [] : {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    var t = typeof source[key];
                    o[key] = t == 'object' ? skeleton(source[key]) : {
                        string: '',
                        number: null,
                        boolean: false
                    }[t];
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




        $scope.addNewObject = function() {
            console.log('me')
            sample = $scope.results[$scope.attributes[$scope.selected].key][0];
            console.log(sample)
            skel = skeleton(sample);
            skel.employee = $rootScope.loginid;
            $scope.results[$scope.attributes[$scope.selected].key].push(skel);
            $scope.selectedResult = $scope.results[$scope.attributes[$scope.selected].key].length - 1;

        }




        $scope.getSelectedResult = function() {
            return $scope.selectedResult;
        }




        $scope.save = function() {
            coauthor_classes = [
                'Book',
                'BookChapters',
                'JournalPapers',
                'Conference'
            ]

            console.log(coauthor_classes.indexOf($scope.attributes[$scope.selected].key));
            var d = $scope.results[$scope.attributes[$scope.selected].key];
            tmp = [];
            angular.forEach(d, function(value, key) {
                if (value) {
                    value.employee = $rootScope.loginid;
                    if (coauthor_classes.indexOf($scope.attributes[$scope.selected].key) >= 0) {


                        var t = {};
                        angular.forEach($scope.coauthors[$scope.attributes[$scope.selected].key], function(v, k) {
                            var tt = [];
                            angular.forEach(v, function(vv, kk) {

                                tt.push(vv.name + ":" + vv.email + ":" + vv.approved);
                            });
                            t[k] = tt.join(';');
                        
                        });
                        
                        value.coauthor = t[key];
                    } else {
                        console.log('NO!')
                    }
                  
                    tmp.push(value);
                }
            });
            console.log(tmp);
            $scope.results[$scope.attributes[$scope.selected].key] = tmp;
            rq = {
                'kls': $scope.attributes[$scope.selected].key,
                'data': $scope.results[$scope.attributes[$scope.selected].key]
            }
            $http.post(BACKEND + '/api/post', JSON.stringify(rq))
                .then(function(res) {
                    if (res.data.error) {
                        Materialize.toast('Oops! Error', 4000)
                        return;
                    }
                    Materialize.toast('Data Saved Successfully!', 4000)
                    raw = res.data.data;

                    console.log(raw)
                    $scope.results[$scope.attributes[$scope.selected].key] =
                        raw.map(function(a) {
                            return a;
                        });

                    $scope.selectedResult = $scope.results[$scope.attributes[$scope.selected].key].length - 1;


                })
        } //Save method endds here



        //Modal for each data input in rightmost side
        $scope.openTheatre = function(index) {
            console.log('Hello')
            $scope.selectedResult = index;
            $scope.selectedResultTheatre = index;
            $scope.$evalAsync()
            $(document).ready(function() {
                $('.modal').modal();
                $('#modal2').modal('open');
            })
            $scope.$evalAsync();

        }
        //Delete some documents

        $scope.delete = function(val) {
            rq = {
                'empid': $rootScope.loginid,
                'kls': $scope.attributes[$scope.selected].key,
                'data': $scope.results[$scope.attributes[$scope.selected].key][val]
            }
            $http.post(BACKEND + '/api/delete', JSON.stringify(rq))
                .then(function(res) {
                    if (res.data.error) {
                        Materialize.toast('Oops! Error', 4000)
                        return;
                    }
                    Materialize.toast('Record Deleted Successfully!', 4000)
                    raw = res.data.data;
                    console.log('DELETE DELETE')
                    console.log(res);
                    $scope.results[$scope.attributes[$scope.selected].key] =
                        raw.map(function(a) {
                            return a;
                        });

                    $scope.coauthors[$scope.attributes[$scope.selected].key] = raw.map(function(a) {
                        if (a.coauthor) {
                            var tmp = [];
                            angular.forEach(a.coauthor.split(';'), function(v, k) {
                                tmp.push({
                                    'name': v.split(':')[0],
                                    'email': v.split(':')[1],
                                    'approved': v.split(':')[2]
                                })
                            });
                            return tmp;
                        }
                    })
                    $scope.selectedResult = $scope.results[$scope.attributes[$scope.selected].key].length - 1;


                })

            $scope.data = {

            };
            console.log($scope.coauthors);
            $(document).ready(function() {
                $('select').material_select();
            })
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();


        }
        //delete ends here




        //logout here
        $scope.logout = function() {
            sessionStorage.clear();
            localStorage.clear();
            console.log("logout");
            $location.path('/logout');
        };


        $scope.fillDetails = function() {
            $location.path('/fill_details');
        }

        $scope.dashboard = function() {
            $location.path('/dashboard');
        }



        $scope.uploadImage = function() {
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
                .then(function(response) {
                    console.log(response.data)
                    window.location.reload();

                })
        }



        //Add coauthor
        $scope.add_coauthor = function() {

            console.log($scope.coauthors)
            console.log($scope.coauthors[$scope.attributes[$scope.selected]]);
            if ($scope.coauthors[$scope.attributes[$scope.selected].key] == undefined) {
                $scope.coauthors[$scope.attributes[$scope.selected].key] = [];
            }
            if ($scope.coauthors[$scope.attributes[$scope.selected].key][$scope.selectedResult] == undefined)
                $scope.coauthors[$scope.attributes[$scope.selected].key][$scope.selectedResult] = [];
            $scope.coauthors[$scope.attributes[$scope.selected].key][$scope.selectedResult].push({
                'name': '',
                'email': '',
                'approved': '0'
            })
        }

        $scope.validator - function() {
            if (kls == 'Author') {

            }
        }


    }
]).directive("filesInput", function() {
    return {
        require: "ngModel",
        link: function postLink(scope, elem, attrs, ngModel) {
            elem.on("change", function(e) {
                console.log('Changed!')
                var files = elem[0].files;
                ngModel.$setViewValue(files);
            })
        }
    }
});
