angular.module('starter.controllers', [])

.controller('AppController', function($scope, $ionicModal, $timeout) {


})

.controller('HomeController', function($scope, $http, $sgData)
    {
        var data = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        var clientData = $sgData.getClientInfoById(1);


        var ctx = document.getElementById("homeChart").getContext("2d");
        var myNewChart = new Chart(ctx).Doughnut(data, {
            animateScale: true
        });
});