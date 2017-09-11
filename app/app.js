angular.module('employee', ['ngRoute', 'ngStorage', 'ngResource'])
.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
	$routeProvider.
   when('/', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/index.html',
    controller: 'IndexCtrl',
    controllerAs: 'index'
   }).
    when('/index', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
   }).
    when('/selection', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/selection.html',
    controller: 'SelCtrl',
    controllerAs: 'sel'
   }).
   when('/login', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'con'
   }).
   when('/dashboard', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/dashboard.html',
    controller: 'DashboardCtrl',
    controllerAs: 'dash'
   }).
    when('/forgot', {
    templateUrl: 'NAAC_Portal_Frontend/app/views/forgot.html',
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
