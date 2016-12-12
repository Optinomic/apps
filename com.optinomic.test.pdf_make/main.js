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
                    image: 'http://www.optinomic.com/wp-content/uploads/2014/09/optinomic_logo_medium.png'
                },

                // using a { text: '...' } object lets you set styling properties
                { text: 'This paragraph will have a bigger font', fontSize: 15 },

                // if you set the value of text to an array instead of a string, you'll be able
                // to style any part individually
                {
                    text: [
                        'This paragraph is defined as an array of elements to make it possible to ',
                        { text: 'restyle part of it and make it bigger ', fontSize: 15 },
                        'than the rest.'
                    ]
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
