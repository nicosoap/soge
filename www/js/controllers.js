angular.module('starter.controllers', [])

    .controller('AppController', function($scope, $ionicModal, $timeout) {


    })

    .controller('HomeController', function($scope, $http, $sgData, $rootScope, $sce)
    {
        $rootScope.userId = 6;

        var data = [];
        var colors = ["#F7464A", "#46BFBD", "#FDB45C"];
        $scope.perf = 0;
        $scope.finalAmount = 0;
        $scope.homeChartLegend = "";
        $scope.homeChartCategoriesLegend = "";

        $http.get("https://www.unitsupload.com/api/api.php?page=account&clientid=" + $rootScope.userId).then( function(response){

            var initialAmount = 0;
            for(var i in response.data)
            {
                initialAmount += parseInt(response.data[i].account_initialamount);
                $scope.finalAmount += parseInt(response.data[i].account_finalamount);
                data.push({
                    label: response.data[i].account_type,
                    value: parseInt(response.data[i].account_finalamount),
                    color: colors[i]
                });
            }
            $scope.perf = (($scope.finalAmount - initialAmount) / initialAmount * 100).toFixed(2);

            var ctx = document.getElementById("homeChart").getContext("2d");
            var homeChart = new Chart(ctx).Doughnut(data, {
                animateScale: false,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> €",
                multiTooltipTemplate: "<%= value %> €"

            });

            $scope.homeChartLegend = $sce.trustAsHtml(homeChart.generateLegend());
        }, function(response){
            console.log("Error");
        });

        // Getting the second chart
        $http.get("https://www.unitsupload.com/api/api.php?page=account_track_record_composition_categories&id=" + $rootScope.userId).then( function(response){

            var data2 = [];
            for(var i in response.data)
            {
                data2.push({
                    label: response.data[i].key,
                    value: parseInt(response.data[i].value),
                    color: colors[i]
                });
            }
            var ctx = document.getElementById("homeChartCategories").getContext("2d");
            var homeChartCategories = new Chart(ctx).Doughnut(data2, {
                animateScale: true,
                tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> €",
                multiTooltipTemplate: "<%= value %> €"
            });
            $scope.homeChartCategoriesLegend = $sce.trustAsHtml(homeChartCategories.generateLegend());
        }, function(response){
            console.log("Error chart 2");
        });

    })
    .controller('AccountController', function($scope, $http, $sgData, $rootScope, $sce){
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

        $scope.accountPerformanceChartLegend = "";
        $scope.accountChartLegend = "";

        var ctx = document.getElementById("accountChart").getContext("2d");
        var accountChart = new Chart(ctx).Pie(data, {
            animateScale: true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> €",
            multiTooltipTemplate: "<%= value %> €"
        });
        $scope.accountChartLegend = $sce.trustAsHtml(accountChart.generateLegend());


        var dataChart2 = {
            labels: ["11/02/2016", "12/02/2016", "13/02/2016", "14/02/2016", "15/02/2016", "16/02/2016", "17/02/2016"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        var ctx = document.getElementById("accountPerformanceChart").getContext("2d");
        var accountPerformanceChart = new Chart(ctx).Line(dataChart2, {
            animateScale: true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> €",
            multiTooltipTemplate: "<%= value %> €"
        });
        $scope.accountPerformanceChartLegend = $sce.trustAsHtml(accountPerformanceChart.generateLegend());


    })
    .controller('ProductController', function(){
        $http.get("https://www.unitsupload.com/api/api.php?page=product&isin=" + getUrlVars()["isin"] ).then( function(response) {

            var data = [];
            for (var i in response.data) {
                data2.push({
                    isin: response.data[i].isin,
                    nom: response.data[i].nom,
                    assetclass: response.data[i].assetclass,
                    type: response.data[i].type,
                    pea: response.data[i].pea,
                    cto: response.data[i].cto,
                    zone: response.data[i].zone,
                    devise: response.data[i].devise,
                    management: response.data[i].management,
                    description: response.data[i].description,
                });
            }
        });

        var ctx = document.getElementById("accountChart").getContext("2d");
        var accountChart = new Chart(ctx).Pie(data, {
            animateScale: true,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %> €",
            multiTooltipTemplate: "<%= value %> €"
        });

    })
;