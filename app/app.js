angular.module('employee', ['ngRoute', 'ngStorage', 'ngResource','ngAnimate'])
.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
	$routeProvider.
   when('/', {
    templateUrl: './app/views/index.html',
    controller: 'IndexCtrl',
    controllerAs: 'index'
   }).
    when('/index', {
    templateUrl: './app/views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
   }).
    when('/selection', {
    templateUrl: './app/views/selection.html',
    controller: 'SelCtrl',
    controllerAs: 'sel'
   }).
   when('/login', {
    templateUrl: './app/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'con'
   }).
   when('/dashboard', {
    templateUrl: './app/views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dash'
   }).
    when('/forgot', {
    templateUrl: './app/views/forgot.html',
    controller: 'ForgotCtrl',
    controllerAs: 'forg'
   }).
    when('/logout',{
        templateUrl: './app/views/logout.html'
    }).
    when('/fill_details',{
      templateUrl: './app/views/partials/fill_details.html'
    });
   $locationProvider.html5Mode(false).hashPrefix('');

}])
