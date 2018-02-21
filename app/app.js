angular.module('employee', ['ngRoute', 'ngStorage', 'ngResource','ngAnimate','noCAPTCHA','angular-md5'])
.run(function($rootScope, $route, $location, $http){
   //Bind the `$locationChangeSuccess` event on the rootScope, so that we dont need to
   //bind in induvidual controllers.

   $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.actualLocation = $location.path();
    });

   $rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
        if($rootScope.actualLocation === newLocation) {
            var token = $http.defaults.headers.common.Authorization
            if (token.length > 0) {
              alert("You've been logged out!");
            }
            $http.defaults.headers.common.Authorization = '';
            $rootScope.actualLocation = $location.path('/login');
        }
    });


})
.config(['$routeProvider', '$locationProvider', 'noCAPTCHAProvider',
	function ($routeProvider, $locationProvider, noCaptchaProvider) {


    noCaptchaProvider.setSiteKey('6LchXkIUAAAAAM6ENPgDi4vwP2lsnbU9F2E9zmDc');
    noCaptchaProvider.setTheme('dark');
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
     when('/approve',{
        templateUrl: './app/views/approve.html',
        controller: 'ApproveCtrl',
    controllerAs: 'appr'
    }).
    when('/fill_details',{
      templateUrl: './app/views/partials/fill_details.html'
    }).
    when('/changepassword', {
      templateUrl: './app/views/changepassword.html',
      controller: 'DashboardCtrl'
    });
	 $locationProvider.html5Mode(false).hashPrefix('');

}]).directive('fallbackSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            element.bind('error', function () {
                angular.element(this).attr("src", attrs.fallbackSrc);
            });
        }
    }
})
