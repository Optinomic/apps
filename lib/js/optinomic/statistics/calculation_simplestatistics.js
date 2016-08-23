// ------------------------------------------
//  calculation_simplestatistics.js
//  S T A T I S T I C S
// ------------------------------------------




// ------------------------------------------
//  calculation_simplestatistics.js
//  H e l p e r   -   F U N C T I O N S
// ------------------------------------------


calc.roundToTwo = function(num) {
    // Round a Number to 0.X 
    return +(Math.round(num + "e+2") + "e-2");
};

calc.isArray = function(obj) {
    return (typeof obj !== 'undefined' &&
        obj && obj.constructor === Array);
};
