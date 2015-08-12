/**
 * @name Optinomic - AppCtrl
 * --------------------------------------
 * Main ctl of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $routeParams) {
    this.app = {
        'title': 'Craving-App',
        'subtitle': 'Some Text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    console.log('Welcome, ', this.app.title);
    console.log('$routeParams, ', $routeParams);

});
