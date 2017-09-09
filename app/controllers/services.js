var app = angular.module('employee');
app.service('getDept', function(){
    var school = {};
    function getSchool(){
        return this.school;
    }
    function setSchool(school){
        this.school = school;
    }
});

// directive('file', function () {
//     return {
//         scope: {
//             file: '='
//         },
//         link: function (scope, el, attrs) {
//             el.bind('change', function (event) {
//                 var file = event.target.files[0];
//                 scope.file = file ? file : undefined;
//                 scope.$apply();
//             });
//         }
//     };
// })