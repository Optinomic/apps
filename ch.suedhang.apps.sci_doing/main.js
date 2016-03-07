/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

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

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;
                $scope.setDataView();
            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Run App-Functions:
            $scope.setTimelineChartOptions();
            $scope.setTscoreChart();
            $scope.setStanineView();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Download
    // -----------------------------------
    $scope.d.export = {};
    $scope.d.export.data = {};
    $scope.d.export.have_data = false;
    $scope.d.export.header = 'True';
    $scope.d.export.direct = 'False';
    $scope.d.export.format = 'csv';
    $scope.d.export.file = 1;
    $scope.d.export.delimitter = ';';
    $scope.d.export.sql_field = "select * from information_schema.tables";

    $scope.d.export.sql_field = "SELECT patient.id , patient.last_name , ((cast(response AS json))->>'BSCL[sq504V40]') as gaga , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '-1') as sq504V40 , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '0') + 2 as gaga FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) WHERE module = 'ch.suedhang.apps.bscl.anq'";


    // ToDO: M4 - Import - remove new lines.

    //var sql_import_string = "in_clude(`templates/export.sql')";
    //$scope.d.export.sql_field = sql_import_string.join(' *\n *');

    //$scope.d.export.sql_field = "SELECT 
    //patient.id, patient.last_name, ((cast(response AS json)) - >> 'BSCL[sq504V40]') as gaga, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '-1') as sq504V40, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '0') + 2 as gaga
    //FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id)
    //WHERE module = 'ch.suedhang.apps.bscl.anq'
    //";

    $scope.export = function() {

        var api = dataService.runSQL($scope.d.export.sql_field, $scope.d.export.delimitter, $scope.d.export.header, $scope.d.export.format, $scope.d.export.direct);
        var aSQL = dataService.getData(api);

        aSQL.then(function(data) {
            $scope.d.export.have_data = true;
            $scope.d.export.data = data;
            console.log('export - Done: ', $scope.d.export.data);
        });

    };






    // -----------------------------------
    // <score-threshold>
    // -----------------------------------

    // Ranges initialisieren
    $scope.scale_ranges = {
        "ranges": [{
            "from": 0,
            "to": 8,
            "result": "Keine Depression",
            "result_color": "green"
        }, {
            "from": 9,
            "to": 13,
            "result": "Minimale Depression",
            "result_color": "green"
        }, {
            "from": 14,
            "to": 19,
            "result": "Leichte Depression",
            "result_color": "orange"
        }, {
            "from": 20,
            "to": 28,
            "result": "Mittelschwere Depression",
            "result_color": "orange"
        }, {
            "from": 29,
            "to": 63,
            "result": "Schwere Depression",
            "result_color": "red"
        }]
    };


//        // Variablen initialisieren
//
//        // Falls gender nicht gesetzt ist = Mann / 35LJ
//        if (gender === null) {
//            gender = 'male';
//        }
//        if ((age === null) || (age === '?')) {
//            age = 35;
//        }
//
//        var population = {
//            "F_0_19": {
//                "0": {
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 9,
//                    "UG4": 11,
//                    "UG5": 14,
//                    "UG6": 19,
//                    "UG7": 26,
//                    "UG8": 36,
//                    "UG9": 43,
//                },
//                "1": {
//                    "UG1": 13,
//                    "UG2": 21,
//                    "UG3": 26,
//                    "UG4": 32,
//                    "UG5": 37,
//                    "UG6": 41,
//                    "UG7": 44,
//                    "UG8": 47,
//                    "UG9": 52,
//                },
//                "2": {
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 8,
//                    "UG7": 9,
//                    "UG8": 11,
//                    "UG9": 16,
//                },
//                "3": {
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                    "UG5": 7,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 9,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 15,
//                    "UG9": 16,
//                },
//                "5": {
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 9,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "6": {
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 15,
//                }
//            },
//            "M_0_19": {
//                 "0": {
//                    // 7   8   9   11  14  17  20  29  32
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 9,
//                    "UG4": 11,
//                    "UG5": 14,
//                    "UG6": 17,
//                    "UG7": 20,
//                    "UG8": 29,
//                    "UG9": 32,
//                },
//                "1": {
//                    // 13  19  27  31  34  38  42  49  52
//                    "UG1": 13,
//                    "UG2": 19,
//                    "UG3": 27,
//                    "UG4": 31,
//                    "UG5": 34,
//                    "UG6": 38,
//                   "UG7": 42,
//                    "UG8": 49,
//                    "UG9": 52,
//                },
//                "2": {
//                    // 4   5   6   7   8   9   10  12  13
//                    "UG1": 4,
//                    "UG2": 5,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 13,
//                },
//                "3": {
//                    // 4   4   6   7   8   9   10  12  13
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 13,
//                },
//                "4": {
//                    // 4   4   5   7   8   11  12  14  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 11,
//                    "UG7": 12,
//                    "UG8": 14,
//                    "UG9": 16,
//                },
//                "5": {
//                    // 4   4   4   5   6   7   8   9   10
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 8,
//                    "UG8": 9,
//                    "UG9": 10,
//                },
//                "6": {
//                    // 4   4   4   4   5   9   12  14  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 4,
//                    "UG5": 5,
//                    "UG6": 9,
//                    "UG7": 12,
//                    "UG8": 14,
//                    "UG9": 16,
//                }
//            },
//            "F_20_30": {
//                "0": {
//                    // 7 8 8 10 14 18 23 28 44
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 8,
//                    "UG4": 10,
//                    "UG5": 14,
//                    "UG6": 18,
//                    "UG7": 23,
//                    "UG8": 28,
//                    "UG9": 44,
//                },
//                "1": {
//                    // 13 21 27 32 36 39 43 46 52
//                    "UG1": 13,
//                    "UG2": 21,
//                    "UG3": 27,
//                    "UG4": 32,
//                    "UG5": 36,
//                    "UG6": 39,
//                    "UG7": 43,
//                    "UG8": 46,
//                    "UG9": 52,
//                },
//                "2": {
//                    // 4 4 5 6 7 9 10 12 13
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                   "UG5": 7,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 13,
//                },
//                "3": {
//                    // 4 4 6 7 8 9 11 12 14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4 4 6 8 10 12 13 15 16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 8,
//                    "UG5": 10,
//                    "UG6": 12,
//                    "UG7": 13,
//                    "UG8": 15,
//                    "UG9": 16,
//                },
//                "5": {
//                    // 4 4 4 5 6 7 8 10 15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 8,
//                    "UG8": 10,
//                    "UG9": 15,
//                },
//                "6": {
//                    // 4 4 4 4 7 9 10 13 15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 4,
//                    "UG5": 7,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 13,
//                    "UG9": 15,
//                }
//            },
//           "M_20_30": {
//                "0": {
//                    // 7 8 8 9 12 16 20 26 45
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 8,
//                    "UG4": 9,
//                    "UG5": 12,
//                    "UG6": 16,
//                    "UG7": 20,
//                    "UG8": 26,
//                    "UG9": 45,
//                },
//                "1": {
//                    // 13 18 23 27 32 36 39 46 52
//                    "UG1": 13,
//                    "UG2": 18,
//                    "UG3": 23,
//                    "UG4": 27,
//                    "UG5": 32,
//                    "UG6": 36,
//                    "UG7": 39,
//                    "UG8": 46,
//                    "UG9": 52,
//               },
//                "2": {
//                    // 4 4 5 6 8 10 11 12 14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "3": {
//                    // 4 5 6 7 8 10 11 12 14
//                    "UG1": 4,
//                    "UG2": 5,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4 4 5 7 9 11 12 13 16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 9,
//                    "UG6": 11,
//                    "UG7": 12,
//                    "UG8": 13,
//                    "UG9": 16,
//                },
//                "5": {
//                    // 4 4 4 5 5 7 8 9 13
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 5,
//                    "UG6": 7,
//                    "UG7": 8,
//                    "UG8": 9,
//                    "UG9": 13,
//                },
//                "6": {
//                    // 4 4 4 5 7 10 12 14 16 
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 7,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 14,
//                    "UG9": 16,
//                }
//            },
//            "F_31_50": {
//                "0": {
//                    // 7    8   8   10  13  17  23  29  49
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 8,
//                    "UG4": 10,
//                    "UG5": 13,
//                    "UG6": 17,
//                    "UG7": 23,
//                    "UG8": 29,
//                    "UG9": 49,
//                },
//                "1": {
//                    // 13   19  25  30  34  38  42  46  52
//                    "UG1": 13,
//                    "UG2": 19,
//                    "UG3": 25,
//                    "UG4": 30,
//                    "UG5": 34,
//                    "UG6": 38,
//                    "UG7": 42,
//                    "UG8": 46,
//                    "UG9": 52,
//                },
//                "2": {
//                    // 4    4   5   6   8   9   11  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "3": {
//                    // 4    4   6   7   8   10  11  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4    4   6   7   9   11  12  14  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 9,
//                    "UG6": 11,
//                    "UG7": 12,
//                    "UG8": 14,
//                    "UG9": 16,
//                },
//                "5": {
//                    // 4    4   4   5   6   7   9   12  15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 9,
//                    "UG8": 12,
//                    "UG9": 15,
//                },
//                "6": {
//                    // 4    4   4   5   7   9   11  13  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 7,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 13,
//                    "UG9": 16,
//                }
//            },
//            "M_31_50": {
//                "0": {
//                    // 7    8   8   9   12  15  21  29  44
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 8,
//                    "UG4": 9,
//                    "UG5": 12,
//                    "UG6": 15,
//                    "UG7": 21,
//                    "UG8": 29,
//                    "UG9": 44,
//                },
//                "1": {
//                    // 13   17  23  28  32  37  40  44  50
//                    "UG1": 13,
//                    "UG2": 17,
//                    "UG3": 23,
//                    "UG4": 28,
//                    "UG5": 32,
//                    "UG6": 37,
//                    "UG7": 40,
//                    "UG8": 44,
//                    "UG9": 50,
//                },
//                "2": {
//                    // 4    4   5   6   8   9   11  12  13
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 13,
//                },
//                "3": {
//                    // 4    4   6   7   8   9   11  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4    4   5   7   8   10  12  13  15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 13,
//                    "UG9": 15,
//                },
//                "5": {
//                    // 4    4   4   5   6   7   8   10  13
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 8,
//                    "UG8": 10,
//                    "UG9": 13,
//                },
//                "6": {
//                    // 4    4   4   5   8   10  13  15  16 
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 13,
//                    "UG8": 13,
//                    "UG9": 16,
//                }
//            },
//            "F_51": {
//                "0": {
//                    // 7    8   8   10  13  19  22  31  42
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 8,
//                    "UG4": 10,
//                    "UG5": 13,
//                    "UG6": 19,
//                    "UG7": 22,
//                    "UG8": 31,
//                    "UG9": 42,
//               },
//                "1": {
//                    // 13   18  23  30  34  37  42  46  51
//                    "UG1": 13,
//                    "UG2": 18,
//                    "UG3": 23,
//                    "UG4": 30,
//                    "UG5": 34,
//                    "UG6": 37,
//                    "UG7": 42,
//                    "UG8": 46,
//                    "UG9": 51,
//                },
//                "2": {
//                    // 4    4   5   7   8   9   11  12  15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 15,
//                },
//                "3": {
//                    // 4    5   6   7   8   10  12  13  14
//                    "UG1": 4,
//                    "UG2": 5,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 13,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4    4   5   7   8   10  12  13  15
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 13,
//                    "UG9": 15,
//                },
//                "5": {
//                    // 4    4   4   5   6   8   11  13  16 
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 8,
//                    "UG7": 11,
//                    "UG8": 13,
//                    "UG9": 16,
//                },
//                "6": {
//                    // 4    4   4   5   8   9   10  14  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 14,
//                    "UG9": 16,
//                }
//            },
//            "M_51": {
//                "0": {
//                    // 7    8   10  13  17  23  33  44  46
//                    "UG1": 7,
//                    "UG2": 8,
//                    "UG3": 10,
//                    "UG4": 13,
//                    "UG5": 17,
//                    "UG6": 23,
//                    "UG7": 33,
//                    "UG8": 44,
//                    "UG9": 46,
//                },
//                "1": {
//                    // 13   16  20  27  32  37  41  46  51 
//                    "UG1": 13,
//                    "UG2": 16,
//                    "UG3": 20,
//                    "UG4": 27,
//                    "UG5": 32,
//                    "UG6": 37,
//                    "UG7": 41,
//                    "UG8": 46,
//                    "UG9": 51,
//                },
//                "2": {
//                    // 4    4   5   6   8   9   11  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 6,
//                    "UG5": 8,
//                    "UG6": 9,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "3": {
//                    // 4    4   6   7   8   10  11  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 6,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 11,
//                    "UG8": 12,
//                    "UG9": 14,
//                },
//                "4": {
//                    // 4    4   5   7   8   10  12  14  16
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 5,
//                    "UG4": 7,
//                    "UG5": 8,
//                    "UG6": 10,
//                    "UG7": 12,
//                    "UG8": 14,
//                    "UG9": 16,
//                },
//                "5": {
//                    // 4    4   4   5   6   7   8   11  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 6,
//                    "UG6": 7,
//                    "UG7": 8,
//                    "UG8": 11,
//                    "UG9": 14,
//                },
//                "6": {
//                    // 4    4   4   5   7   9   10  12  14
//                    "UG1": 4,
//                    "UG2": 4,
//                    "UG3": 4,
//                    "UG4": 5,
//                    "UG5": 7,
//                    "UG6": 9,
//                    "UG7": 10,
//                    "UG8": 12,
//                    "UG9": 14,
//                }
//            }
//        }
    // -----------------------------------
    // Chart: Timeline
    // -----------------------------------

    $scope.setTimelineChartOptions = function() {
        // -----------------------------------
        // Chart: Timeline Options
        // - fillDates:  Still experimental
        // -----------------------------------
        var myPatient = $scope.d.dataMain.patient.patient.data;
        var patientFullName = myPatient.last_name + ' ' + myPatient.first_name;

        $scope.d.timeline = {};
        $scope.d.timeline.data = $scope.d.dataMain.survey_responses_array;

        $scope.d.timeline.options = {
            'title': 'Suchtdruck (∑)',
            'focusField': 'dailyMood[mood]',
            'fillDates': false,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };
    };


    // -----------------------------------
    // Chart: T-Score <chart-tscore>
    // -----------------------------------

    $scope.getAnswer = function() {
        var score_answer = [{
            "question": "GSI (Global Severity Index)",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Psychotizismus",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Paranoides Denken",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Phobische Angst",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Aggressivität/ Feindseligkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Ängstlichkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Depressivität",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Unsicherheit im Sozialkontakt",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Zwanghaftigkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Somatisierung",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }];

        return score_answer;
    };

    $scope.setTscoreChart = function() {

        // Options
        $scope.options_plot = {
            'show_scores': true
        };

        // Results
        $scope.plotdata = [{
            "label": "Eintritt",
            "scores": $scope.getAnswer()
        }, {
            "label": "Austritt",
            "scores": $scope.getAnswer()
        }];
    };


    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------

    $scope.getAnswerStanine = function() {
        var score_answer = [{
            "question": "Stress durch Unsicherheit",
            "sub_left": "Stabiles Umfeld. Keine Belastung.",
            "sub_right": "Unsicherheit in wichtigen Lebensbereichen",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Stress durch Überforderung",
            "sub_left": "Keine Belastung durch Überforderung",
            "sub_right": "Überforderung in wichtigen Lebensbereichen",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Stress durch Verlust",
            "sub_left": "Keine Belastung durch Verlust und negative Ereignisse",
            "sub_right": "Belastung durch Verlust und negative Ereignisse",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Soziale Unterstützung",
            "sub_left": "Ungünstig: Kaum Unterstützung durch andere",
            "sub_right": "Gut: Viel Unterstützung durch Freunde und Bekannte",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }];

        return score_answer;
    };

    $scope.setStanineView = function() {

        $scope.stanine = {};
        $scope.stanine.data = [{
            "label": "Eintritt",
            "scores": $scope.getAnswerStanine()
        }, {
            "label": "Verlauf 12.12.1996",
            "scores": $scope.getAnswerStanine()
        }, {
            "label": "Austritt",
            "scores": $scope.getAnswerStanine()
        }];

        $scope.stanine.options = {
            "population_name": "Männer, 31-50 Jahre",
            "norm_name": "Normalbereich",
            "start_result": $scope.stanine.data.length - 1
        };
    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        var resultsArray = $scope.d.dataMain.survey_responses_array;



        $scope.d.grid = {};
        $scope.d.grid.rowData = $scope.d.functions.enrichResults(resultsArray);

        // automatic or manually like (columnDefsManually)
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);

        // columnDefsManually: If you want to create columnDefs manually:
        // Ref: http://www.angulargrid.com/angular-grid-column-definitions/index.php
        var columnDefsManually = [{
            headerTooltip: "Datum",
            headerName: "Datum",
            editable: true,
            suppressSizeToFit: true,
            width: 145,
            field: "datestamp",
            cellClass: 'md-body-1',
        }, {
            headerTooltip: "Suchtdruck_1",
            headerName: "Suchtdruck (Int)",
            cellClass: 'md-body-2',
            suppressSizeToFit: true,
            width: 110,
            valueGetter: 'parseInt(data.Suchtdruck_1)',
            filter: 'number'
        }, {
            headerName: "Bemerkungen",
            editable: true,
            cellClass: 'md-body-1',
            field: "diary",
            filter: 'text'
        }, {
            headerTooltip: "PID",
            headerName: "Patient-ID",
            editable: false,
            field: "PID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }, {
            headerTooltip: "FID",
            headerName: "Fall-ID",
            editable: false,
            field: "FID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }];


        // DataView - Options
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: $scope.d.grid.rowData,
            columnDefs: $scope.d.grid.columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
