angular.module('employee', ['ngRoute', 'ngStorage', 'ngResource'])
.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
	$routeProvider.
   when('/', {
    templateUrl: 'app/views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
   }).
    when('/selection', {
    templateUrl: 'app/views/selection.html',
    controller: 'SelCtrl',
    controllerAs: 'sel'
   }).
   when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'con'
   }).
   otherwise({
    redirectTo: '/'
   });
   $locationProvider.html5Mode(false).hashPrefix('');

}])
