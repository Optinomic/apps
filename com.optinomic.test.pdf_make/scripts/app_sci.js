d.sci_create_pdf_stack = function(group_scores) {

    var group_sort = [{
        "id": 0,
        "title": "Stressereignisse und Syptome",
        "description": "Hohe Ausprägungen sind nicht günstig.",
        "name": "stress",
        "left_text": "Wenig",
        "left_color": "#4CAF50",
        "right_text": "Viel/Ausgeprägt",
        "right_color": "#F44336"
    }, {
        "id": 1,
        "title": "Hilfreiche Copingstrategien",
        "description": "Diese helfen die möglichen körperlichen und psychischen Stressreaktionen, welche nicht gesund sind, zu reduzieren. Hohe Ausprägungen sind daher gut.",
        "name": "hilfreich",
        "left_text": "Wenig",
        "left_color": "#F44336",
        "right_text": "Viel/Ausgeprägt",
        "right_color": "#4CAF50"
    }, {
        "id": 2,
        "title": "Ungünstige Copingstrategien",
        "description": "Diese erhöhen oder verlängern die möglichen körperlichen und psychischen Stressreaktionen, welche nicht gesund sind. Hohe Ausprägungen sind nicht günstig.",
        "name": "unguenstig",
        "left_text": "Wenig",
        "left_color": "#4CAF50",
        "right_text": "Viel/Ausgeprägt",
        "right_color": "#F44336"
    }];

    group_sort.forEach(function(group_s, groupID) {
        var group = group_scores[group_s.name];

        group.forEach(function(group_item, group_itemID) {

            var group_stack = [];
            group_stack.push($scope.d.templates.spacer(12));
            group_stack.push($scope.d.templates.heading("h3", group_item.question, group_s.title));
            // group_stack.push($scope.d.templates.caption(group_s.description));

            var population = {
                "text": " " + group_item.population.name,
                "alignment": "center",
                "margin": [0, 0, 0, 3],
                "color": "#212121",
                "style": "caption"
            };
            group_stack.push(population);

            var top_line = {
                "alignment": "left",
                "columnGap": 12,
                "columns": [{
                    "width": "*",
                    "alignment": "left",
                    "columnGap": 0,
                    "columns": [{
                        "width": "auto",
                        "text": " " + group_s.left_text,
                        "color": group_s.left_color,
                        "alignment": "left",
                        "margin": [0, 0, 0, 0],
                        "fontSize": 11,
                        "style": "h3"
                    }, {
                        "text": "%\nStanine",
                        "fontSize": 9,
                        "alignment": "right",
                        "style": "caption"
                    }]
                }, {
                    "width": 240,
                    "alignment": "center",
                    "margin": [0, 0, 0, 3],
                    "columns": [{
                        "text": [{
                            "text": "4\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "1",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "7\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "2",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "12\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "3",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "17\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "4",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "20\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "5",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "alignment": "center",
                        "text": [{
                            "text": "17\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "6",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "12\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "7",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "7\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "8",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }, {
                        "text": [{
                            "text": "4\n",
                            "alignment": "center",
                            "fontSize": 9,
                            "style": "caption"
                        }, {
                            "text": "9",
                            "alignment": "center",
                            "style": "p"
                        }]
                    }]
                }, {
                    "width": "*",
                    "alignment": "left",
                    "columnGap": 0,
                    "columns": [{
                        "text": "%\nStanine",
                        "fontSize": 9,
                        "alignment": "left",
                        "style": "caption"
                    }, {
                        "width": "auto",
                        "text": " " + group_s.right_text,
                        "color": group_s.right_color,
                        "margin": [0, 0, 0, 0],
                        "alignment": "right",
                        "fontSize": 11,
                        "style": "h3"
                    }]
                }]
            };
            group_stack.push(top_line);

            var messungen_alle = [];
            var legende_alle = [];
            var messungen_eintritt = [];
            var legende_eintritt = [];

            group_item.data.forEach(function(data, dataID) {

                var legende_typ = [{
                    "type": "rect",
                    "x": 4,
                    "y": 2,
                    "w": 10,
                    "h": 10,
                    "color": "#3F51B5",
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "ellipse",
                    "x": 9,
                    "y": 7,
                    "color": "#FFFFFF",
                    "fillOpacity": 0.5,
                    "r1": 4,
                    "r2": 4
                }];

                if (data.mz_typ === "Eintritt") {
                    legende_typ = [{
                        "type": "ellipse",
                        "x": 9,
                        "y": 7,
                        "color": "#3F51B5",
                        "fillOpacity": 0.5,
                        "r1": 5,
                        "r2": 5
                    }];
                };

                if (data.mz_typ === "Austritt") {
                    legende_typ = [{
                        "type": "rect",
                        "x": 4,
                        "y": 2,
                        "w": 10,
                        "h": 10,
                        "color": "#3F51B5",
                        "lineColor": "#E0E0E0"
                    }];
                };

                var legende_entry = {
                    "width": "auto",
                    "columns": [{
                        "width": 10,
                        "canvas": legende_typ
                    }, {
                        "width": "*",
                        "alignment": "left",
                        "fontSize": 9,
                        "text": data.mz_typ + "\n" + data.date,
                        "style": "caption"
                    }]
                };

                messungen_alle.push($scope.d.templates.stanine(data.stanine, data.mz_typ, 240));
                legende_alle.push(legende_entry);

                if (data.mz_typ === "Eintritt") {
                    messungen_eintritt.push($scope.d.templates.stanine(data.stanine, data.mz_typ, 240));
                    legende_eintritt.push(legende_entry);
                };

            });

            var group_messungen_container = {
                "stack": [{
                    "alignment": "left",
                    "columnGap": 12,
                    "columns": [{
                        "width": "*",
                        "alignment": "right",
                        "text": " " + group_item.sub_left,
                        "margin": [0, 0, 0, 0],
                        "color": "#212121",
                        "style": "caption"
                    }, {
                        "width": 240,
                        "alignment": "center",
                        "stack": []
                    }, {
                        "width": "*",
                        "alignment": "left",
                        "text": " " + group_item.sub_right,
                        "margin": [0, 0, 0, 0],
                        "color": "#212121",
                        "style": "caption"
                    }]
                }]
            };

            var alle_messungen_container = angular.copy(group_messungen_container);
            alle_messungen_container.stack["0"].columns[1].stack.push(messungen_alle);
            alle_messungen_container.stack["0"].columns[1].stack.push(legende_alle);

            var eintritt_messungen_container = angular.copy(group_messungen_container);
            eintritt_messungen_container.stack["0"].columns[1].stack.push(messungen_eintritt);
            eintritt_messungen_container.stack["0"].columns[1].stack.push(legende_eintritt);


            var alle_group_stack = angular.copy(group_stack);
            alle_group_stack.push(alle_messungen_container);

            var eintritt_group_stack = angular.copy(group_stack);
            eintritt_group_stack.push(eintritt_messungen_container);


            $scope.d.appData["ch.suedhang.apps.sci"].pdf.all.push($scope.d.templates.keepTogether(alle_group_stack));
            $scope.d.appData["ch.suedhang.apps.sci"].pdf.eintritt.push($scope.d.templates.keepTogether(eintritt_group_stack));


        });

    });



};


// -----------------------------------
// Copy from SCI - App
// -----------------------------------

d.sci = function() {
    d.sci_setStanineView();
};

d.sci_setStanineView = function() {

    var data = $scope.d.appData["ch.suedhang.apps.sci"].data;
    $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_stanine = {};
    $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_d_stanine = {};

    var scope_stanine = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_stanine;
    var scope_d_stanine = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_d_stanine;

    scope_stanine = {};
    scope_stanine.data = [];

    // Gruppieren
    scope_d_stanine = {};
    scope_d_stanine.data_stress = [];
    scope_d_stanine.data_hilfreich = [];
    scope_d_stanine.data_unguenstig = [];

    // Loop Responses and push to Chart-Data
    var survey_responses = data.survey_responses;
    survey_responses.forEach(function(current_response, myindex) {


        // Scores - Update Scores with correct labeling
        var scores = current_response.calculations[0].calculation_result.scores

        // Stress
        scores[0].question = "Stress durch negative Ereignisse";
        scores[0].sub_left = "Wenige Stressoren durch negative Ereignisse";
        scores[0].sub_right = "Viele Stressoren durch negative Ereignisse";

        scores[1].question = "Stresssymptome";
        scores[1].sub_left = "Wenig körperliche und psychische Stresssymptome";
        scores[1].sub_right = "Viele körperliche und psychische Stresssymptome";


        // Hilfreiche Strategien

        scores[2].question = "Positives Denken";
        scores[2].sub_left = "Selbstzweifel und Fokus auf Negatives";
        scores[2].sub_right = "Stressbewältigung durch positives Denken";

        scores[3].question = "Aktive Stressbewältigung";
        scores[3].sub_left = "Stressoren werden nicht beseitigt";
        scores[3].sub_right = "Aktive und vorbeugende Stressbewältigung";


        scores[4].question = "Soziale Unterstützung";
        scores[4].sub_left = "Kaum Unterstützung durch andere";
        scores[4].sub_right = "Viel Unterstützung durch Freunde und Bekannte";

        scores[5].question = "Halt im Glauben";
        scores[5].sub_left = "Kaum religiöser / spiritueller Halt";
        scores[5].sub_right = "Person findet Halt im Glauben";


        // Ungünstige Strategien

        scores[6].question = "Alkohol- und Zigarettenkonsum";
        scores[6].sub_left = "Kein erhöhter Akohol- oder Zigarettenkonsum";
        scores[6].sub_right = "Ungünstige Bewältigung durch Alkohol und Zigaretten";


        // Create nice Labels
        var date = $filter("amDateFormat")(current_response.entity.data.filled, 'DD.MM.YYYY');
        var label_type = 'Verlauf';

        if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
            label_type = 'Eintritt';
        };
        if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
            label_type = 'Austritt';
        };
        var label = label_type + ": " + date;


        var respone_to_push = {
            "date": date,
            "label": label,
            "mz_id": parseInt(current_response.entity.data.response.Erhebungszeitpunkt),
            "mz_typ": label_type,
            "scores": scores
        };

        scope_stanine.data.push(respone_to_push);

        // Gruppiert nach Sonja
        var respone_to_push_copy = {};

        respone_to_push_copy = angular.copy(respone_to_push);
        respone_to_push_copy.scores.splice(2, 5);
        scope_d_stanine.data_stress.push(respone_to_push_copy);

        respone_to_push_copy = angular.copy(respone_to_push);
        respone_to_push_copy.scores.splice(0, 2);
        respone_to_push_copy.scores.splice(4, 1);
        scope_d_stanine.data_hilfreich.push(respone_to_push_copy);

        respone_to_push_copy = angular.copy(respone_to_push);
        respone_to_push_copy.scores.splice(0, 6);
        scope_d_stanine.data_unguenstig.push(respone_to_push_copy);

    });

    // Poulation Data - Get back 'Umlaute'
    var population = scope_stanine.data[0].scores[0].population.name;
    population = population.replace("Maenner", "Männer");
    population = population.replace("Aelter", "Älter");
    population = population.replace("Juenger", "Jünger");


    scope_stanine.options = {
        "population_name": population,
        "norm_name": "Normalbereich",
        "start_result": scope_stanine.data.length - 1
    };


    $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_stanine = scope_stanine;
    $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_d_stanine = scope_d_stanine;


    console.log('(!) setStanineView', scope_stanine, scope_d_stanine);

    d.groupStanineView();
};

d.groupStanineView = function() {

    var scope_stanine = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_stanine;
    var scope_d_stanine = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.scope_d_stanine;


    //prepare Array

    var input_data = angular.copy(scope_d_stanine.data_hilfreich);
    var group_array_hilfreich = [];

    var prp = input_data[0].scores;
    prp.forEach(function(current_score, myID) {

        var population = current_score.population.name;
        population = population.replace("Maenner", "Männer");
        population = population.replace("Aelter", "Älter");
        population = population.replace("Juenger", "Jünger");


        var obj_to_push = {
            "name": current_score.name,
            "question": current_score.question,
            "population": current_score.population,
            "sub_left": current_score.sub_left,
            "sub_right": current_score.sub_right,
            "data": []
        };

        group_array_hilfreich.push(obj_to_push);

    });

    var input_data = angular.copy(scope_d_stanine.data_stress);
    var group_array_stress = [];

    var prp = input_data[0].scores;
    prp.forEach(function(current_score, myID) {
        var obj_to_push = {
            "name": current_score.name,
            "question": current_score.question,
            "population": current_score.population,
            "sub_left": current_score.sub_left,
            "sub_right": current_score.sub_right,
            "data": []
        };

        group_array_stress.push(obj_to_push);

    });

    var input_data = angular.copy(scope_d_stanine.data_unguenstig);
    var group_array_unguenstig = [];

    var prp = input_data[0].scores;
    prp.forEach(function(current_score, myID) {
        var obj_to_push = {
            "name": current_score.name,
            "question": current_score.question,
            "population": current_score.population,
            "sub_left": current_score.sub_left,
            "sub_right": current_score.sub_right,
            "data": []
        };

        group_array_unguenstig.push(obj_to_push);

    });


    $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores = {
        "hilfreich": group_array_hilfreich,
        "stress": group_array_stress,
        "unguenstig": group_array_unguenstig
    };



    // Fill Scores
    var input_data = angular.copy(scope_d_stanine.data_hilfreich);

    input_data.forEach(function(current_messung, myMessungID) {

        current_messung.scores.forEach(function(current_score, myScoreID) {

            var current_array = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores.hilfreich[myScoreID];

            var obj_to_push = {
                "date": current_messung.date,
                "label": current_messung.label,
                "mz_id": current_messung.mz_id,
                "mz_typ": current_messung.mz_typ,
                "stanine": current_score.stanine,
                "sum_score": current_score.sum_score
            };
            current_array.data.push(obj_to_push);

        });

    });

    var input_data = angular.copy(scope_d_stanine.data_stress);

    input_data.forEach(function(current_messung, myMessungID) {

        current_messung.scores.forEach(function(current_score, myScoreID) {

            var current_array = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores.stress[myScoreID];

            var obj_to_push = {
                "date": current_messung.date,
                "label": current_messung.label,
                "mz_id": current_messung.mz_id,
                "mz_typ": current_messung.mz_typ,
                "stanine": current_score.stanine,
                "sum_score": current_score.sum_score
            };
            current_array.data.push(obj_to_push);

        });

    });

    var input_data = angular.copy(scope_d_stanine.data_unguenstig);

    input_data.forEach(function(current_messung, myMessungID) {

        current_messung.scores.forEach(function(current_score, myScoreID) {

            var current_array = $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores.unguenstig[myScoreID];

            var obj_to_push = {
                "date": current_messung.date,
                "label": current_messung.label,
                "mz_id": current_messung.mz_id,
                "mz_typ": current_messung.mz_typ,
                "stanine": current_score.stanine,
                "sum_score": current_score.sum_score
            };
            current_array.data.push(obj_to_push);

        });

    });


    d.sci_create_pdf_stack($scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores);

    //console.log('groupStanineView', $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores);
};
