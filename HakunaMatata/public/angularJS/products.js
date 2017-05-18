var products = angular.module('products',[]);

products.controller('products', function($scope, $filter, $http) {

		$scope.unexpected_error = true;

		console.log("inside products controller");
	
		//console.log("userId:: " + $scope.userId)

		$http({
			method : "POST",
			url : '/getAllProducts',//change the method to get 10 items at a time.
			data : {}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);

			$scope.allProducts = data.results;
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
		
		$scope.AddToCart = function(ItemId) {
			
			console.log("Selected ItemId : "+ItemId);
			$http({
				method : "POST",
				url : '/userAddToCart',//change the method to get 10 items at a time.
				data : {
					"ItemId" : ItemId,
					"Qty" : 1
				}
			}).success(function(data) {
				console.log("inside success");
				console.log("data is ::");
				console.log(data);
				
				window.location.assign("/products");
				//set all variables.
					 
			}).error(function(error) {
				console.log("inside error");
				console.log(error);
				$scope.unexpected_error = false;
				$scope.invalid_login = true;
				$window.alert("unexpected_error");
			});	
		}

		$scope.signout = function() {

			console.log("inside signout method");
			$http({
				method : "POST",
				url : '/signout',
				data : {
				}
			}).success(function(data) {
				console.log("inside success for signout");
				//set all variables.
				window.location.assign("/signin");


			}).error(function(error) {
				console.log("inside error");
				console.log(error);
				$scope.unexpected_error = false;
				$scope.invalid_login = true;
				$window.alert("unexpected_error");
			});
		}
});