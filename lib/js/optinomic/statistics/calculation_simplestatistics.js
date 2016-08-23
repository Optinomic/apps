// ------------------------------------------
//  calculation_simplestatistics.js
//  S T A T I S T I C S
// ------------------------------------------


// # sum
//
// is simply the result of adding all numbers
// together, starting from zero.
//
// This runs on 'O(n)', linear time in respect to the array
calc.sum = function(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

// # mean
//
// is the sum over the number of values
//
// This runs on 'O(n)', linear time in respect to the array
calc.mean = function(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    return sum(x) / x.length;
}

// # geometric mean
//
// a mean function that is more useful for numbers in different
// ranges.
//
// this is the nth root of the input numbers multiplied by each other
//
// This runs on 'O(n)', linear time in respect to the array
calc.geometric_mean = function(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    // the starting value.
    var value = 1;

    for (var i = 0; i < x.length; i++) {
        // the geometric mean is only valid for positive numbers
        if (x[i] <= 0) return null;

        // repeatedly multiply the value by each number
        value *= x[i];
    }

    return Math.pow(value, 1 / x.length);
}


// # harmonic mean
//
// a mean function typically used to find the average of rates
//
// this is the reciprocal of the arithmetic mean of the reciprocals
// of the input numbers
//
// This runs on 'O(n)', linear time in respect to the array
calc.harmonic_mean = function(x) {
    // The mean of no numbers is null
    if (x.length === 0) return null;

    var reciprocal_sum = 0;

    for (var i = 0; i < x.length; i++) {
        // the harmonic mean is only valid for positive numbers
        if (x[i] <= 0) return null;

        reciprocal_sum += 1 / x[i];
    }

    // divide n by the the reciprocal sum
    return x.length / reciprocal_sum;
}

// root mean square (RMS)
//
// a mean function used as a measure of the magnitude of a set
// of numbers, regardless of their sign
//
// this is the square root of the mean of the squares of the
// input numbers
//
// This runs on 'O(n)', linear time in respect to the array
calc.root_mean_square = function(x) {
    if (x.length === 0) return null;

    var sum_of_squares = 0;
    for (var i = 0; i < x.length; i++) {
        sum_of_squares += Math.pow(x[i], 2);
    }

    return Math.sqrt(sum_of_squares / x.length);
}

// # min
//
// This is simply the minimum number in the set.
//
// This runs on 'O(n)', linear time in respect to the array
calc.min = function(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, min is
        // undefined and is thus made the minimum element in the array
        if (x[i] < value || value === undefined) value = x[i];
    }
    return value;
}

// # max
//
// This is simply the maximum number in the set.
//
// This runs on 'O(n)', linear time in respect to the array
calc.max = function(x) {
    var value;
    for (var i = 0; i < x.length; i++) {
        // On the first iteration of this loop, max is
        // undefined and is thus made the maximum element in the array
        if (x[i] > value || value === undefined) value = x[i];
    }
    return value;
}

// # [variance](http://en.wikipedia.org/wiki/Variance)
//
// is the sum of squared deviations from the mean
//
// depends on 'mean()'
calc.variance = function(x) {
    // The variance of no numbers is null
    if (x.length === 0) return null;

    var mean_value = mean(x),
        deviations = [];

    // Make a list of squared deviations from the mean.
    for (var i = 0; i < x.length; i++) {
        deviations.push(Math.pow(x[i] - mean_value, 2));
    }

    // Find the mean value of that list
    return calc.mean(deviations);
}

// # [standard deviation](http://en.wikipedia.org/wiki/Standard_deviation)
//
// is just the square root of the variance.
//
// depends on 'variance()'
calc.standard_deviation = function(x) {
    // The standard deviation of no numbers is null
    if (x.length === 0) return null;

    return Math.sqrt(variance(x));
}



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
