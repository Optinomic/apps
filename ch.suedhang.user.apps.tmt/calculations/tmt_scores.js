function main(responses) {


    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------


    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };


    calc.getPatientScores = function(d) {

        return 73;
    };

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------

    calc.getResults = function(d) {
        // Calculate stuff first.
        var test = calc.getPatientScores(d);

        // Build & add stuff to returnObj.
        var returnObj = {};
        returnObj.test = test;


        returnObj.d = d;

        // Return
        return returnObj;
    };


    // Return
    return calc.getResults(responses);
}
