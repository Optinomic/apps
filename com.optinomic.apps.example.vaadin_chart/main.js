var app = angular.module('app', []);

angular.module('app', [])
    .directive('pieWithLegend', function() {
        return {
            scope: {
                data: '='
            },

            link: function($scope, $element, $attrs) {
                var chartNode = $element.children()[0];
                chartNode.reloadConfiguration();
                $scope.$watch('data', function(newData, oldData) {
                    // Update the series data
                    chartNode.chart.series[0].setData(newData);
                }, true);
            },

            template: function() {
                // The directive template HTML is placed inside script tag in the
                // document body for convenience. As usual with Angular Directive
                // templates, you can also use plain template string instead of
                // this function, or place your directive template in a separate
                // file and load it with the templateUrl option.
                return document.getElementById('tmpl-pie-with-legend').innerHTML;
            }
        };
    });


angular.module('app', [])
    .directive('areaSpline', function() {
        return {
            scope: {
                supply: '=',
                demand: '='
            },

            link: function($scope, $element, $attrs) {
                var chartNode = $element.children()[0];
                chartNode.reloadConfiguration();
                // Watch and update the series data
                $scope.$watch('supply', function(newData, oldData) {
                    chartNode.chart.series[0].setData(newData);
                }, true);
                $scope.$watch('demand', function(newData, oldData) {
                    chartNode.chart.series[1].setData(newData);
                }, true);
            },

            template: function() {
                return document.getElementById('tmpl-area-spline').innerHTML;
            }
        };
    })

angular.module('app', [])
    .controller('ChartCtrl', function($scope) {

        console.log('ChartCtrl - ChartCtrl - ChartCtrl - ChartCtrl');

        $scope.chartData = [
            ["Aerospace", 90.0],
            ["Medical", 453.6],
            ["Agriculture ", 25.6],
            ["Automotive", 17.0],
            ["Consumers", 12.4],
            ["Subsidies", 1.4]
        ];

        $scope.supplyData = [35, 28, 45, 60, 80, 74];
        $scope.demandData = [29, 11, 50, 63, 65, 61];


    });

// Wait until Web Components are loaded and registered
// before bootstrapping your app
document.addEventListener('WebComponentsReady', function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
        console.log('angular.element(document).ready', document);
    });
});
