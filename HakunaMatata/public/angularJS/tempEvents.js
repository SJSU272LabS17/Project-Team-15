var tempEvents = angular.module('tempEvents',[]);

tempEvents.controller('tempEvents', function($scope, $filter, $http) {

    $scope.unexpected_error = true;

    console.log("inside products controller");


    $http({
        method : "POST",
        url : '/getTempEvents',//change the method to get 10 items at a time.
        data : {}
    }).success(function(data) {
        console.log("inside success");
        console.log("data is ::");
        console.log(data);

        $scope.events = data.results;
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

    $scope.approveEvent = function(ItemId) {

        console.log("Selected ItemId : "+ItemId);
        $http({
            method : "POST",
            url : '/approveEvent',//change the method to get 10 items at a time.
            data : {
                "ItemId" : ItemId
            }
        }).success(function(data) {
            console.log("inside success");
            console.log("data is ::");
            console.log(data);

            window.location.assign("/adminHome");
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