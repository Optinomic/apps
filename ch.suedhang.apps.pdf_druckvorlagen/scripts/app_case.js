// 'ch.suedhang.apps.case.new'
d.getCaseList = function() {

    var survey_responses = $scope.d.appData["ch.suedhang.apps.case.production"].data.survey_responses;

    var list_array = [];
    survey_responses.forEach(function(response, responseID) {

        var date = $filter("amDateFormat")(response.entity.data.filled, 'DD.MM.YYYY');
        var score = response.calculations["0"].calculation_result.score;
        var text = " Am " + date + " wies der Patient im CASE " + score + " Punkte auf."
        list_array.push(text);
    });

    return {
        "ul": list_array,
        "margin": [0, 0, 0, 6]
    };
};
