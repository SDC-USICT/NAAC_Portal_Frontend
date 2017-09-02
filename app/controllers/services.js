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