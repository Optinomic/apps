/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    __opapp_include(scripts/init.js)
    __opapp_include(scripts/definitions.js)

    $scope.getAppFunctionsAPI = function() {
        var d = {};

        __opapp_include(scripts/app_actinfo_ein.js)
        __opapp_include(scripts/app_bscl.js)
        __opapp_include(scripts/app_case.js)
        __opapp_include(scripts/app_tmt.js)
    	__opapp_include(scripts/app_isk.js)
    	__opapp_include(scripts/app_sci.js)

        return d;
    };


    __opapp_include(scripts/pdf_data.js)
    __opapp_include(scripts/pdf_docs.js)

});
