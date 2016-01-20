var app = angular.module('app', []);

app.directive('pieWithLegend', function() {
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

app.controller('ChartCtrl', function($scope) {

    $scope.chartData = [
        ["Aerospace", 90.0],
        ["Medical", 453.6],
        ["Agriculture ", 25.6],
        ["Automotive", 17.0],
        ["Consumers", 12.4],
        ["Subsidies", 1.4]
    ];

});

// Wait until Web Components are loaded and registered
// before bootstrapping your app
document.addEventListener('WebComponentsReady', function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
        console.log('angular.element(document).ready', document);
    });
});
