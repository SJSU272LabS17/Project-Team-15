userProfile.controller('auctionWonController',function($scope, $filter,$http){
	
	$scope.unexpected_error = true;

	console.log("inside cart controller");
	
	initialize();
	
	function initialize(){
		$scope.TotalCostOfItems=0;
		$scope.visibleTransactionDiv = false;
		$scope.donotloadtemplate=true;
		$scope.CreditCardNumber = 0;
		//console.log("userId:: " + $scope.userId)
	
		
		$http({
			method : "POST",
			url : '/getAllWonAuctions',
			data : {
				
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			$scope.TotalCostOfItems=0;
			$scope.allProductsWon= data;
			
			
			for(product in $scope.allProductsWon)
			{
				$scope.TotalCostOfItems = $scope.TotalCostOfItems+$scope.allProductsWon[product].BidAmount;

				//temp code
				//$scope.ItemId = $scope.allProductsWon[product].ItemId;
			}

			if($scope.TotalCostOfItems>0)
			{
				$scope.donotloadtemplate= false;
			}
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
		
		//For getting the creditCard Number and address.
		$http({
			method : "POST",
			url : '/getUserAccountDetails',
			data : {
				"userId": $scope.userId //pass userId via session.
			}
		}).success(function(data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);
			
			
			/*$scope.UserId = data.UserId;
			$scope.FirstName = data.FirstName;
			$scope.LastName = data.LastName;
			$scope.EmailId = data.EmailId;*/


			if(data.Address!="undefined")
			{
				$scope.Address = data.Address;
			}

			if(data.CreditCardNumber!="undefined")
			{
				$scope.CreditCardNumber = data.CreditCardNumber;
			}

			
			
			//set all variables.
				 
		}).error(function(error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
		});
	}
	
		
	$scope.checkout= function(){
		if($scope.TotalCostOfItems>0) {
			$scope.visibleTransactionDiv = true;
		}
	}
	
	$scope.payForWonItems = function(CreditCardNumber){
		console.log("Inside Pay for won Items.")
		if(CreditCardNumber.length==16) {

			$http({
				method: "POST",
				url: '/updatePaymentDetailsForAuction',
				data: {
					//Address: $scope.Address,
					CreditCardNumber: CreditCardNumber,
					ItemId: $scope.allProductsWon[0].ItemId
				}
			}).success(function (data) {
				console.log("inside success");
				console.log("Order is placed.");
				console.log(data);
				//initialize();
				window.location.assign("#/auctionWon");
				//set all variables.

			}).error(function (error) {
				console.log("inside error");
				console.log(error);
				$scope.unexpected_error = false;
				$scope.invalid_login = true;
				$window.alert("unexpected_error");
				initialize();
			});
		}
		else{
			alert("You must enter valid 16 digit Credit Card number.");
		}
	}
});