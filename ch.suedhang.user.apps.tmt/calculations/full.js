function main(responses) {

    var calc = {};

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var results = {};

        // ------------------------------------------
        // Definitions:
        // Interessting Vars of current App
        // ------------------------------------------

        var variables = {
            "TMTAError": [],
            "TMTATime": [],
            "TMTBError": [],
            "TMTBTime": [],
            "Perz_A": [],
            "Perz_B": [],
            "BA_Quotient": [],
            "TMTAZ": [],
            "TMTBZ": []
        };


        // Arrange Stuff as 'variables'


        // Return Stuff
        results.variables = variables;

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
