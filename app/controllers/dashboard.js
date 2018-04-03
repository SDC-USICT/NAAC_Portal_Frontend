angular.module('employee').controller('DashboardCtrl', ["$scope", "$http", "$rootScope", "$sessionStorage", "$localStorage", "$resource", "$location", "formService", "md5",
    function($scope, $http, $rootScope, $sessionStorage, $localStorage, $resource, $location, formService, md5) {
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
        }
        //This is used to send data to backend

        $scope.data = {}

        //This is save method
        $scope.saveForm = function() {
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
                'data': [$scope.data],
                'csrf': $rootScope.csrf
            }
            console.log(req);
            formService.post(req).then(function(response){
                console.log(response);
              $scope.setSelected($scope.selected);
              if(response == 0){
                  alert("Error : Token Do Not Match");
                  $scope.logout();
              }else{
                  Materialize.toast('Data Saved Successfully!', 4000)
                  $rootScope.csrf = response;
              }
            });


            $scope.data = {

            };
            console.log($scope.coauthors);
            $(document).ready(function() {
                $('select').material_select();
            })
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();
            $scope.selectedResult = null;
        }

        //Saveform ends here


        $scope.hello = function() {
            if ($scope.data.coauthor == undefined) $scope.data.coauthor = [];
            $scope.data.coauthor.push({
                'name': '',
                'email': '',
                'approved': '0'
            })
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
                console.log("result empl data");
                console.log(res)
                data = res.data;
                $scope.subjectlist = {}
                console.log(data.data)
                angular.forEach(data, function(value, key) {

                    $scope.subjectlist[(value.fields.name + ' ' + value.fields.code).toString()] = null;

                });
                $(document).ready(function() {

                    $('input.autocomplete').autocomplete({
                        data: $scope.subjectlist,
                        limit: 20,
                        onAutocomplete: function(val) {

                        },
                        minLength: 1,
                    });


                })

                console.log("Subject list");
                console.log($scope.subjectlist)
            })


        $scope.empImg = BACKEND + '/static/images/' + $rootScope.loginid + '.jpg?' + new Date().getTime();

        // Fetching teacher data from BACKEND.

        $http.post(BACKEND + '/api/employee', {
            empid: $rootScope.loginid
        }).then(function(data) {
          console.log("Employee data");
          console.log(data)
            $scope.employee = data.data;
            $scope.employee.pk = $rootScope.loginid;
        });

        // Getting columns from BACKEND.
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
                    tmp['help'] = ["Enter the title of Award", "Organisation : The name of the organisation you received award from."];
                    tmp['icon'] = "album";
                }
                else if (value == 'Book') {
                    tmp['priority'] = 4;
                    tmp['help'] = ["book 1", "book 2"];
                    tmp['icon'] = "book";
                }
                else if (value == 'BookChapters') {
                    tmp['priority'] = 3;
                    tmp['icon'] = "import_contacts";
                }
                else if (value == 'Conference') {
                    tmp['priority'] = 2;
                    tmp['icon'] = "ondemand_video";
                }
                else if (value == 'Extra') {
                    tmp['priority'] = 12;
                    tmp['icon'] = "menu";
                }
                else if (value == 'GuestLecture') {
                    tmp['priority'] = 7;
                    tmp['icon'] = "work";
                }
                else if (value == 'JournalPapers') {
                    tmp['priority'] = 1;
                    tmp['icon'] = "library_books";
                }
                else if (value == 'Membership') {
                    tmp['priority'] = 8;
                    tmp['icon'] = "card_membership";
                }
                else if (value == 'Patents') {
                    tmp['priority'] = 9;
                    tmp['icon'] = "receipt";
                }
                else if (value == 'Professional') {
                    tmp['priority'] = 0;
                    tmp['icon'] =  "account_box";
                    tmp['help'] = ["Year of Acquiring of Highest Qualification : Enter the year you received your highest qualification. Example : 2000", "Ph.D Pursuing : Number of student pursuing Ph.D ","Ph.D Submitted : Number of student submitted Ph.D ","Ph.D Awarded : Number of student Awarded Ph.D "];
                }
                else if (value == 'Projects') {
                    tmp['priority'] = 6;
                    tmp['icon'] ="pie_chart";
                }
                else if (value == 'SubjectsTaken') {
                    tmp['priority'] = 11;
                    tmp['icon'] = "work";
                }
                else if (value == 'Workshop') {
                    tmp['priority'] = 5;
                    tmp['icon'] = "work";
                }

                $scope.attributes.push(tmp)
            });



            $scope.setSelected(9);
            console.log($scope.attributes[$scope.selected].key);
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
        // $scope.unsetEditing = function() {
        //     $(document).ready(function() {
        //         $("input").attr("readonly", true);
        //     })
        //     $scope.$evalAsync();
        //
        //     $scope.editing = 0;
        //     req = {
        //         'data': $scope.employee
        //     }
        //     console.log(req);
        //     $http.post(BACKEND + '/api/emppost', req)
        //         .then(function(data) {
        //           console.log(data);
        //             data = data.data;
        //             $scope.employee = data;
        //             $scope.employee.pk = $rootScope.loginid
        //         })
        // }

$scope.unsetEditing = function() {
            $(document).ready(function() {
                $("input").attr("readonly", true);
            });
            $scope.$evalAsync();

            $scope.editing = 0;
            req = {
                'data': $scope.employee,
                'csrf': $rootScope.csrf,
            }
            console.log(req);
            $http.post(BACKEND + '/api/emppost', req)
                .then(function(data) {
                  console.log(data);
                    if(data.data.error || data.status == 401){
                        alert("Tokens Do not Match !!!");
                        $scope.logout();
                    }else{
                        $rootScope.csrf = data.data.csrf_token;
                        data = data.data;
                    $scope.employee = data;
                    $scope.employee.pk = $rootScope.loginid;
                    }
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
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();
            //It will fetch all existing data of teacher for respective columns

            $http.post(BACKEND + '/api/get/', {
                empid: $rootScope.loginid,
                kls: $scope.attributes[value].key
            })
              .then(function(d){
                data = d.data;
                $scope.mySelectedData = data;;
                $scope.dontfill();
                if (data[0] != undefined) {
                      $scope.results[$scope.attributes[$scope.selected].key] = data.map(function(a) {
                        a.employee = $rootScope.loginid;
                        return a;
                    });

                    //If any coauthors is present in teacher  data then push it into coauthors array.
                    $scope.coauthors[$scope.attributes[$scope.selected].key] = data.map(function(a) {

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

                    $scope.$evalAsync()
                } else {
                    $scope.results[$scope.attributes[$scope.selected].key] = []
                }
              },
              function(data) {
                if (data.status == 401) {
                  alert('Unauthorized to view this page!');
                  $location.path('/login')
                }
              })
            // Experiment




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
                    angular.forEach(($scope.data.coauthor).split(';'), function(v, k) {
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
                        Materialize.toast('Oops! Error', 4000,'red darken-4')
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
                        Materialize.toast('Oops! Error', 4000,'red darken-4')
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
                    $scope.setSelected($scope.selected);

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
            console.log("logout");
            request = {
                'empid':$rootScope.loginid,
            }
            console.log(request);
            $http.defaults.headers.common.Authorization = '';
            $http.post(BACKEND + '/api/logout',request)
                .then(function (data) {
                    console.log("dddfffd");
                    console.log(data);
                    localStorage.clear();
                    $location.path('/login');
                });
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
                    if(response.data.success=='true'){
                      Materialize.toast('Image Uploaded', 4000,'green');
                      $scope.empImg = BACKEND + '/static/images/' + $rootScope.loginid + '.jpg?' + new Date().getTime();

                      $(document).ready(function() {
                          $('#modal1').modal('close');
                      })
                      $scope.$evalAsync();


                     }
                    else {
                      Materialize.toast('Please upload a valid .jpg image file less than 1MB in Size.', 4000,'red darken-4');

                    }


                })
        }


        $scope.changePassword = function(){
          $location.path('/changepassword');
        }
        $scope.chanPass = function(){

            $scope.client_secret = 6;
			var dhreq = {'empid' : $rootScope.loginid };
			$http.post(BACKEND + '/api/dhkey/', JSON.stringify(dhreq))
			.then(function(res) {
                $scope.sk = res.data.dh_key;
                client_key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
                $scope.ck = client_key;
            $scope.currentPass = md5.createHash(($scope.curpass) || '');
            $scope.currentPass = md5.createHash(($scope.currentPass + $scope.ck) || '');
        if($scope.newpass && $scope.confpass) {
            $scope.passwords = {
                "curpass": $scope.currentPass,
                "newpass": md5.createHash(($scope.newpass) || ''),
                "confpass": md5.createHash(($scope.confpass) || ''),
                "loginid": sessionStorage.loginid,
                "ck": $scope.ck
            };
            console.log($scope.passwords);
            $http.post(BACKEND + '/api/changePassword', JSON.stringify($scope.passwords))
                .then(function (res) {
                    console.log(res);
                    if (res.data.error != undefined) {
                        Materialize.toast('Please Enter Correct Password', 4000, 'red darken-4');
                    } else if (res.data.mod != undefined) {
                        Materialize.toast('New Passwords do not matched', 4000, 'red darken-4');
                    } else if (res.data.success != undefined) {
                        Materialize.toast('Password Changed Successfully', 4000);
                        $location.path('/dashboard');
                    }
                });
        }
        });
        }

        //Add coauthor
        $scope.add_coauthor = function() {

            console.log($scope.coauthors);
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

        $scope.resetForm = function(){
          $scope.data = {};
            $(document).ready(function() {
                $('select').material_select();
            })
            Materialize.toast('Form Reset Successfully!', 3000)
            $scope.naacForm.$setPristine();
            $scope.naacForm.$setUntouched();
            $scope.selectedResult = null;
        }

        $scope.dontfill = function(){
          var data_emp = $resource(BACKEND + '/api/dontfill', null, {
              'query': {
                  method: 'POST',
                  isArray: false
              }
          });
          // Fetching teacher data from BACKEND.
          data_emp.query({
              empid: $rootScope.loginid,
          }).$promise.then(function(data) {
            console.log(JSON.stringify(data));
            $scope.dontfilldata=data.toJSON();
            $scope.dontfillColumn=$scope.attributes[$scope.selected].key;
            console.log($scope.dontfillColumn);
            $scope.dontfillColumn=$scope.dontfillColumn.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
            console.log($scope.dontfillColumn);

          });



        }

        $scope.setfill = function(){
          console.log($scope.dontfilldata)
          data=$scope.dontfilldata;
          data.pk=$rootScope.loginid;
          console.log(data);
          data=JSON.stringify(data);


          $http({
                method: 'POST',
                url: BACKEND + '/api/set_dontfill',
                data: data,
                transformRequest: angular.identity
            })
            .then(function(response) {
                console.log(response.data)
                Materialize.toast('All changes saved for this column.', 4000)
              });

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
