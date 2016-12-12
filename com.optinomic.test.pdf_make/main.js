/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;
            $scope.d.haveData = true;

            $scope.pdf_make_init();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // PDF-Make - Init
    // -----------------------------------

    $scope.pdf_make_init = function() {
        $scope.d.docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    };

    $scope.pdf_open = function() {
        console.log('(!) pdf_open');
        pdfMake.createPdf($scope.d.docDefinition).open();
    };

    $scope.pdf_download = function() {
        console.log('(!) pdf_download');
        var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
        pdfMake.createPdf(docDefinition).download();
    };


});
