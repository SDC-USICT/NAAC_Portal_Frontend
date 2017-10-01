angular.module('employee', ['ngRoute', 'ngStorage', 'ngResource'])
.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
	$routeProvider.
   when('/', {
    templateUrl: 'NAAC/app/views/index.html',
    controller: 'IndexCtrl',
    controllerAs: 'index'
   }).
    when('/index', {
    templateUrl: 'NAAC/app/views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
   }).
    when('/selection', {
    templateUrl: 'NAAC/app/views/selection.html',
    controller: 'SelCtrl',
    controllerAs: 'sel'
   }).
   when('/login', {
    templateUrl: 'NAAC/app/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'con'
   }).
   when('/dashboard', {
    templateUrl: 'NAAC/app/views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dash'
   }).
    when('/forgot', {
    templateUrl: 'NAAC/app/views/forgot.html',
    controller: 'ForgotCtrl',
    controllerAs: 'forg'
   }).
    when('/logout',{
        templateUrl: 'app/views/logout.html'
    }).
    when('/fill_details',{
      templateUrl: 'app/views/partials/fill_details.html'
    });
   $locationProvider.html5Mode(false).hashPrefix('');

}])
