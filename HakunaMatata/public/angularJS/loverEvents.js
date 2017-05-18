var loverEvents = angular.module('loverEvents',[]);

loverEvents.controller('loverEvents', function($scope, $filter, $http) {

    $scope.unexpected_error = true;

    console.log("inside products controller");

    $http({
        method : "POST",
        url : '/getLoverEvents',//change the method to get 10 items at a time.
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


    $scope.AddToCart = function(EventId) {

        console.log("Selected ItemId : "+EventId);
        $http({
            method : "POST",
            url : '/eventAddToCart',//change the method to get 10 items at a time.
            data : {
                "EventId" : EventId
            }
        }).success(function(data) {
            console.log("inside success");
            console.log("data is ::");
            console.log(data);
            if(data.userId=="notFound"){
                window.location.assign("/signinHM");
            }
            else{
                window.location.assign("/loverEvents");
            }


            //set all variables.

        }).error(function(error) {
            window.location.assign("/myHome");
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
            window.location.assign("/myHome");


        }).error(function(error) {
            console.log("inside error");
            console.log(error);
            $scope.unexpected_error = false;
            $scope.invalid_login = true;
            $window.alert("unexpected_error");
        });
    }
});