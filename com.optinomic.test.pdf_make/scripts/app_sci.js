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
                "label": current_messung.label,
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
                "label": current_messung.label,
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
                "label": current_messung.label,
                "stanine": current_score.stanine,
                "sum_score": current_score.sum_score
            };
            current_array.data.push(obj_to_push);

        });

    });



    console.log('groupStanineView', $scope.d.appData["ch.suedhang.apps.sci"].app_scope.group_scores);
};
