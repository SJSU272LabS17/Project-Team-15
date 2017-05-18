var myBagPack = angular.module('myBagPack',[]);

myBagPack.controller('myBagPack', function($scope, $filter, $http) {

    $scope.unexpected_error = true;

    console.log("inside products controller");

    //console.log("userId:: " + $scope.userId)

    /*$http({
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
    }); */
    $http({
        method : "POST",
        url : '/getBagPackEvents',//change the method to get 10 items at a time.
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


});