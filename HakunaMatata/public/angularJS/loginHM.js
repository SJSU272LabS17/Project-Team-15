//loading the 'login' angularJS module
var loginHM = angular.module('loginHM', []);
//defining the login controller
loginHM.controller('loginHM', function($scope, $window ,$http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false


	init();

	function init()
	{

			console.log("inside signout method");
			$http({
				method : "POST",
				url : '/signout',
				data : {
				}
			}).success(function(data) {
				console.log("inside success for signout");
				//set all variables.
				//window.location.assign("/signin");


			}).error(function(error) {
				console.log("inside error");
				console.log(error);
				$scope.unexpected_error = false;
				$scope.invalid_login = true;
				$window.alert("unexpected_error");
			});

	}




	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		console.log("inside submit");
		console.log("email ::" + $scope.email);
		console.log("password:: " + $scope.password)

		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			console.log(data.statusCode);
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$window.alert("invalid_login");

				$scope.message = "Invalid Login.";
				clear();

			}
			else if(data.statusCode != 401 && data.statusCode == 200) {
				//Login Successful
				$scope.invalid_login = true;
				$scope.unexpected_error = true;
				//Redirecting to HomePage
				console.log("Redirecting to HomePage");
				
				window.location.assign("/myHome/#events");
				//window.location.assign("/userProfile");
			}
				//Making a get call to the '/redirectToHomepage' API
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
	};

	$scope.signup = function() {
		console.log("in sign up controller");
		$http({
			method : "GET",
			url : '/signupHM'
			}).success(function(data) {
				//checking the response data for statusCode
				if (data.statusCode == 401) {

				}
				else
					//Making a get call to the '/redirectToHomepage' API
					window.location.assign("/signupHM");
			}).error(function(error) {
				
			})
	};

	function clear() {
		//clran variables and fields.
	}
})
