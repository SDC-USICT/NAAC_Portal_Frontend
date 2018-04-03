angular.module('employee')
	.controller('LoginCtrl', ["$scope", "$http" , "$rootScope", "$window", "$location", 'md5',
		function ($scope, $http, $rootScope, $window, $location, md5) {

		if(sessionStorage.loginid == undefined){
			$location.path('/selection');
		}
		if(sessionStorage.status != undefined && sessionStorage.loginid != undefined){
		    $location.path('/dashboard');
    }
		$rootScope.loginid = sessionStorage.loginid;

		$scope.submit = function () {
			$scope.client_secret = 6;
			var dhreq = {'empid' : $rootScope.loginid }
			$http.post(BACKEND + '/api/dhkey/', JSON.stringify(dhreq))
			.then(function(res) {
				$scope.sk = res.data.dh_key;
				client_key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
				$scope.ck = client_key;
			$scope.login();
			})
			};
			$scope.login = function() {
			$scope.pass = md5.createHash(($scope.password) || '');
			$scope.pass = md5.createHash(( $scope.sk + $scope.pass + $scope.ck) || '');
				req = {
					'empid' : $rootScope.loginid,
					'password' : $scope.pass,
					'ck' : $scope.ck
				};
				console.log(req);
				$http.post(BACKEND+'/api/login', JSON.stringify(req))
				.then(function (res) {
				    console.log("res Login")
                    console.log(res)
					if (res.data.error) {
						alert(res.data.error);
						$location.path('/login');
					}
					else if (res.status == 201 || res.status == 200) {
				        $rootScope.csrf = res.data.csrf.csrf;
						$http.defaults.headers.common.Authorization = 'JWT ' + res.data.token;
						$location.url('/dashboard');

					}
					else {
						if (res.data.error) {
							alert(res.data.error);
						}
						$location.path('/login');
					}
				}, function(err) {
					alert('Credentials are not correct!');
					$location.path('/login');
				});
			}

			$scope.forgot = function(){
				console.log('called')
					$location.url('/forgot');
			};

			$scope.loginValid = false;
			$scope.gRecaptchaResponse = '';
			$scope.$watch('gRecaptchaResponse', function (){

				if ($scope.gRecaptchaResponse.length > 0) {
					$http.post(BACKEND + '/api/captcha', {'captcha': $scope.gRecaptchaResponse})
					.then(function(res) {
						if (res.status ==200) {
							$scope.loginValid = true;
						}
					})
				}

			});
		}]);
