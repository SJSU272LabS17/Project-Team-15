/**
 * Created by Suchishree on 5/14/2017.
 */
console.log("signup file loaded");

var signupHM = angular.module('signupHM',[]);

signupHM.controller('signupHM', function($scope, $filter, $http) {

    //$scope.emailExists = "";
    $scope.isEmailExist = false;
    console.log("outside submit button");
    $scope.submit = function() {

        console.log("in submit funtion");
        $scope.emailExists = "";

        console.log("email :: " + $scope.email);
        $http({
            method : "POST",
            url : '/checksignup',
            data : {
                "email" : $scope.email
            }
        }).success(function(emailExist,data) {

            console.log("data :: " + data);
            //checking the response data for statusCode
            if (data.statusCode == 401) {
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else if(emailExist == "true") {
                console.log("EmailExist(true) :: " + emailExist);
                $scope.emailExists = "true";
            }
            else if(emailExist == "false") {
                console.log("EmailExist(false) :: " + emailExist);
                $scope.emailExists = "";
                console.log("Before doSignUp Calling");
                doSignUp();
                console.log("After doSignUp Calling");
            }
        }).error(function(error) {
            $scope.unexpected_error = false;
            $scope.invalid_login = true;
        });
    };

    $scope.backToSignin= function(){
        window.location.assign("/signinHM");
    };

    function doSignUp() {

        console.log("in doSignUp");
        console.log("before calling http :: email :: " + $scope.email);

        $http({
            method : "POST",
            url : '/afterSignup',
            data : {
                "firstname" : $scope.firstname,
                "email" : $scope.email,
                "password" : $scope.password,
                "location" : $scope.location,
                "contact" : $scope.contact,
                "dateOfBirth": $filter('date')($scope.dateOfBirth, 'yyyy-MM-dd')

            }
        }).success(function(isSignUp,data) {
            console.log("in success of doSignUp");
            //checking the response data for statusCode
            if (data.statusCode == 401) {
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else if(isSignUp == "true") {
                console.log("isSignUp=true");
                //window.location.assign('/');
                window.location.assign("/signinHM");
                $scope.isEmailExist = false;
                $scope.emailExists = null;
                $scope.$apply();
            }
            else if(isSignUp == "false") {
                console.log("isSignUp=false");
                $scope.isEmailExist = true;
                $scope.emailExists = "Email You entered Exist.";
                $scope.$apply();
            }
        }).error(function(error) {

            console.log("in error doSignUp :: ");
            console.log(error);
        });
    };
});