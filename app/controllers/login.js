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
			console.log("password");
			console.log($scope.password);
			console.log(md5.createHash($scope.password || ''));
  				req = {
				'empid' : $rootScope.loginid,
				'password' : md5.createHash($scope.password || '')
			};


			console.log(req);
				$http.post(BACKEND+'/api/login', JSON.stringify(req))
				.then(function (res) {

					console.log(res);
					if (res.data.error) {
						alert(res.data.error);
						$location.path('/login');
					}
					else if (res.status == 201 || res.status == 200) {
						console.log("Result of login");
						console.log(res);
						$http.defaults.headers.common.Authorization = 'JWT ' + res.data.token;
						sessionStorage.setItem('token', res.data.token);
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
			};

			$scope.forgot = function(){
				console.log("Reidrecting");
					$location.url('/forgot');
			};

			$scope.loginValid = false;
			$scope.gRecaptchaResponse = '';
			$scope.$watch('gRecaptchaResponse', function (){
				console.log($scope.gRecaptchaResponse);

				if ($scope.gRecaptchaResponse.length > 0) {
					$http.post(BACKEND + '/api/captcha', {'captcha': $scope.gRecaptchaResponse})
					.then(function(res) {
						console.log(res);
						if (res.status ==200) {
							$scope.loginValid = true;
						}
					})
				}

			});
		}]);
