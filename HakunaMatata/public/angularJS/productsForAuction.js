products.controller('productsForAuction', function($scope, $filter, $http) {

	
		$scope.unexpected_error = true;

		console.log("inside productsForAuction controller");
	
		//console.log("userId:: " + $scope.userId)
	
		
		$http({
			method : "POST",
			url : '/getAllProductsForAuction',//change the method to get 10 items at a time.
			data : {
				
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			
			$scope.allProductsForAuction = data.results;
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
		
		
		
		$scope.addBidOnProduct = function(ItemId,BidAmount,MaxBidAmount,Price) {
			
			console.log("Selected ItemId : "+ItemId);
			if(Price<BidAmount) {
				if(MaxBidAmount<BidAmount) {
					alert("Bid placed!!");
					$http({
						method: "POST",
						url: '/addBidOnProduct',//change the method to get 10 items at a time.
						data: {
							"ItemId": ItemId,
							"BidAmount": BidAmount
						}
					}).success(function (data) {
						console.log("inside success");
						console.log("data is ::");
						console.log(data);

						window.location.assign("/products");
						//set all variables.

					}).error(function (error) {
						console.log("inside error");
						console.log(error);
						$scope.unexpected_error = false;
						$scope.invalid_login = true;
						$window.alert("unexpected_error");
					});
				}
				else{
					alert("Your bid amount should be more than max bid amount.");
				}
			}
			else{
				alert("Your bid amount should be more than product cost.")

			}
			
		}
/*
		$scope.checkBidAmount = function(MaxBidAmount,BidAmount){
			if(MaxBidAmount>=BidAmount) {
				bidButtonDisable= true;
			}
			else{
				return false;
			}
		}*/
		
});