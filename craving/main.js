/**
 * @name Optinomic - AppCtrl
 * --------------------------------------
 * Main ctl of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $routeParams, $location) {
    this.app = {
        'title': 'Craving-App',
        'subtitle': 'Some Text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod labore et dolore ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    console.log('Welcome, ', this.app.title);
    console.log('$routeParams, ', $routeParams);


    console.log('$location, ', $location, $location.search());

});
