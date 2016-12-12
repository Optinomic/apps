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


        $scope.d.docDefinition = {
            content: [
                // if you don't need styles, you can use a simple string to define a paragraph
                $scope.d.dataMain.config.data.customer.contact.name,

                {
                    image: 'data:image/png;base64,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'
                }

            ]
        };

    };

    $scope.pdf_create = function() {
        const pdfDocGenerator = pdfMake.createPdf($scope.d.docDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#iframeContainer');
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            targetElement.appendChild(iframe);
        });
    };

    $scope.pdf_open = function() {
        console.log('(!) pdf_open');
        pdfMake.createPdf($scope.d.docDefinition).open();
    };

    $scope.pdf_download = function() {
        console.log('(!) pdf_download');
        pdfMake.createPdf($scope.d.docDefinition).download();
    };



});
