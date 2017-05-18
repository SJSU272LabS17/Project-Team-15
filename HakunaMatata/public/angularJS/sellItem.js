
userProfile.controller('sellItemController', function($scope,$http) {
	console.log("Inside sellItemController.");

	$scope.IsBidItem=0;
	
	
	$http({
		method : "POST",
		url : '/getItemType',
		data : {
			
		}
	}).success(function(data) {
		console.log("inside success");
		console.log("data is ::");
		console.log(data);
	
		$scope.TypeList= data;
		//set all variables.
			 
	}).error(function(error) {
		console.log("inside error");
		console.log(error);
		$scope.unexpected_error = false;
		$scope.invalid_login = true;
		$window.alert("unexpected_error");
	});	
	
	
	

	$scope.Addproduct = function(ItemId,BidAmount) {
		
		 var ItemTypeId = $("#typeSelect").val();
		
		$http({
			method : "POST",
			url : '/addProduct',
			data : {
				"ItemName" : $scope.ItemName,
				"ItemDescription" : $scope.ItemDescription,
				"ItemTypeId" : ItemTypeId,
				"Price" : $scope.Price,
				"Qty" : $scope.Qty,
				"IsBidItem" : $scope.IsBidItem			
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
	
	
});