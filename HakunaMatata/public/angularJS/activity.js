userProfile.controller('activityController', function($scope,$http) {
	// create a message to display in our view
	$scope.invalid_login = true;
	$scope.unexpected_error = true;

		console.log("inside user activity controller");

	init();

	function init() {
		$scope.disableBuyActivity= true;
		$scope.disableSellActivity= true;
		$scope.disableBidActivity= true;
		$scope.disableAuctionWonActivity= true;



		$http({
			method: "POST",
			url: '/getAllUserDirectBuyingActivities',
			data: {}
		}).success(function (data) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data);


			$scope.allItemsInActivity = data

			if($scope.allItemsInActivity.statusCode!=401)
			{
				$scope.disableBuyActivity= false;
			}

			//set all variables.

		}).error(function (error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");

			$scope.disableBuyActivity= true;
		});


		$http({
			method: "POST",
			url: '/getAllSoldProducts',
			data: {}
		}).success(function (data1) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data1);


			$scope.allSoldProducts = data1;
			if($scope.allSoldProducts.statusCode!=401)
			{
				$scope.disableSellActivity= false;
			}


			//set all variables.

		}).error(function (error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");

			$scope.disableSellActivity= true;
		});


		$http({
			method: "POST",
			url: '/getAllUserBiddingActivity',
			data: {}
		}).success(function (data1) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data1);


			$scope.AllUserBiddingActivity = data1;
			if($scope.AllUserBiddingActivity.statusCode!=401)
			{
				$scope.disableBidActivity= false;
			}

			//set all variables.

		}).error(function (error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");
			$scope.disableBidActivity= true;
		});


		$http({
			method: "POST",
			url: '/getAllAuctionProductHistory',
			data: {}
		}).success(function (data2) {
			console.log("inside success");
			console.log("data is ::");
			console.log(data2);


			$scope.AllUserAuctionsWonActivity = data2;
			if($scope.AllUserAuctionsWonActivity.statusCode!=401)
			{
				$scope.disableAuctionWonActivity= false;
			}

		}).error(function (error) {
			console.log("inside error");
			console.log(error);
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$window.alert("unexpected_error");

			$scope.disableAuctionWonActivity= true;
		});
	}
});
