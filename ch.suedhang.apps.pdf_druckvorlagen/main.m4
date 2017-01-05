/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    include(scripts/init.js)
    include(scripts/definitions.js)

    $scope.getAppFunctionsAPI = function() {
        var d = {};
    
        include(scripts/app_actinfo_ein.js)
        include(scripts/app_bscl.js)
        include(scripts/app_case.js)
        include(scripts/app_tmt.js)
    	include(scripts/app_isk.js)
    	include(scripts/app_sci.js)
    
        return d;
    };
    
    
    include(scripts/pdf_data.js)
    include(scripts/pdf_docs.js)
    
});
