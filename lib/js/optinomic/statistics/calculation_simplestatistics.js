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

    return calc.sum(x) / x.length;
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

    var mean_value = calc.mean(x),
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

    return Math.sqrt(calc.variance(x));
}


// # [Z-Score, or Standard Score](http://en.wikipedia.org/wiki/Standard_score)
//
// The standard score is the number of standard deviations an observation
// or datum is above or below the mean. Thus, a positive standard score
// represents a datum above the mean, while a negative standard score
// represents a datum below the mean. It is a dimensionless quantity
// obtained by subtracting the population mean from an individual raw
// score and then dividing the difference by the population standard
// deviation.
//
// The z-score is only defined if one knows the population parameters;
// if one only has a sample set, then the analogous computation with
// sample mean and sample standard deviation yields the
// Student's t-statistic.
calc.z_score = function(x, mean, standard_deviation) {
    return (x - mean) / standard_deviation;
}



// # Standard Normal Table
// A standard normal table, also called the unit normal table or Z table,
// is a mathematical table for the values of Φ (phi), which are the values of
// the cumulative distribution function of the normal distribution.
// It is used to find the probability that a statistic is observed below,
// above, or between values on the standard normal distribution, and by
// extension, any normal distribution.
//
// The probabilities are taken from http://en.wikipedia.org/wiki/Standard_normal_table
// The table used is the cumulative, and not cumulative from 0 to mean
// (even though the latter has 5 digits precision, instead of 4).
calc.standard_normal_table = [
    /*  z      0.00    0.01    0.02    0.03    0.04    0.05    0.06    0.07    0.08    0.09 */
    /* 0.0 */
    0.5000, 0.5040, 0.5080, 0.5120, 0.5160, 0.5199, 0.5239, 0.5279, 0.5319, 0.5359,
    /* 0.1 */
    0.5398, 0.5438, 0.5478, 0.5517, 0.5557, 0.5596, 0.5636, 0.5675, 0.5714, 0.5753,
    /* 0.2 */
    0.5793, 0.5832, 0.5871, 0.5910, 0.5948, 0.5987, 0.6026, 0.6064, 0.6103, 0.6141,
    /* 0.3 */
    0.6179, 0.6217, 0.6255, 0.6293, 0.6331, 0.6368, 0.6406, 0.6443, 0.6480, 0.6517,
    /* 0.4 */
    0.6554, 0.6591, 0.6628, 0.6664, 0.6700, 0.6736, 0.6772, 0.6808, 0.6844, 0.6879,
    /* 0.5 */
    0.6915, 0.6950, 0.6985, 0.7019, 0.7054, 0.7088, 0.7123, 0.7157, 0.7190, 0.7224,
    /* 0.6 */
    0.7257, 0.7291, 0.7324, 0.7357, 0.7389, 0.7422, 0.7454, 0.7486, 0.7517, 0.7549,
    /* 0.7 */
    0.7580, 0.7611, 0.7642, 0.7673, 0.7704, 0.7734, 0.7764, 0.7794, 0.7823, 0.7852,
    /* 0.8 */
    0.7881, 0.7910, 0.7939, 0.7967, 0.7995, 0.8023, 0.8051, 0.8078, 0.8106, 0.8133,
    /* 0.9 */
    0.8159, 0.8186, 0.8212, 0.8238, 0.8264, 0.8289, 0.8315, 0.8340, 0.8365, 0.8389,
    /* 1.0 */
    0.8413, 0.8438, 0.8461, 0.8485, 0.8508, 0.8531, 0.8554, 0.8577, 0.8599, 0.8621,
    /* 1.1 */
    0.8643, 0.8665, 0.8686, 0.8708, 0.8729, 0.8749, 0.8770, 0.8790, 0.8810, 0.8830,
    /* 1.2 */
    0.8849, 0.8869, 0.8888, 0.8907, 0.8925, 0.8944, 0.8962, 0.8980, 0.8997, 0.9015,
    /* 1.3 */
    0.9032, 0.9049, 0.9066, 0.9082, 0.9099, 0.9115, 0.9131, 0.9147, 0.9162, 0.9177,
    /* 1.4 */
    0.9192, 0.9207, 0.9222, 0.9236, 0.9251, 0.9265, 0.9279, 0.9292, 0.9306, 0.9319,
    /* 1.5 */
    0.9332, 0.9345, 0.9357, 0.9370, 0.9382, 0.9394, 0.9406, 0.9418, 0.9429, 0.9441,
    /* 1.6 */
    0.9452, 0.9463, 0.9474, 0.9484, 0.9495, 0.9505, 0.9515, 0.9525, 0.9535, 0.9545,
    /* 1.7 */
    0.9554, 0.9564, 0.9573, 0.9582, 0.9591, 0.9599, 0.9608, 0.9616, 0.9625, 0.9633,
    /* 1.8 */
    0.9641, 0.9649, 0.9656, 0.9664, 0.9671, 0.9678, 0.9686, 0.9693, 0.9699, 0.9706,
    /* 1.9 */
    0.9713, 0.9719, 0.9726, 0.9732, 0.9738, 0.9744, 0.9750, 0.9756, 0.9761, 0.9767,
    /* 2.0 */
    0.9772, 0.9778, 0.9783, 0.9788, 0.9793, 0.9798, 0.9803, 0.9808, 0.9812, 0.9817,
    /* 2.1 */
    0.9821, 0.9826, 0.9830, 0.9834, 0.9838, 0.9842, 0.9846, 0.9850, 0.9854, 0.9857,
    /* 2.2 */
    0.9861, 0.9864, 0.9868, 0.9871, 0.9875, 0.9878, 0.9881, 0.9884, 0.9887, 0.9890,
    /* 2.3 */
    0.9893, 0.9896, 0.9898, 0.9901, 0.9904, 0.9906, 0.9909, 0.9911, 0.9913, 0.9916,
    /* 2.4 */
    0.9918, 0.9920, 0.9922, 0.9925, 0.9927, 0.9929, 0.9931, 0.9932, 0.9934, 0.9936,
    /* 2.5 */
    0.9938, 0.9940, 0.9941, 0.9943, 0.9945, 0.9946, 0.9948, 0.9949, 0.9951, 0.9952,
    /* 2.6 */
    0.9953, 0.9955, 0.9956, 0.9957, 0.9959, 0.9960, 0.9961, 0.9962, 0.9963, 0.9964,
    /* 2.7 */
    0.9965, 0.9966, 0.9967, 0.9968, 0.9969, 0.9970, 0.9971, 0.9972, 0.9973, 0.9974,
    /* 2.8 */
    0.9974, 0.9975, 0.9976, 0.9977, 0.9977, 0.9978, 0.9979, 0.9979, 0.9980, 0.9981,
    /* 2.9 */
    0.9981, 0.9982, 0.9982, 0.9983, 0.9984, 0.9984, 0.9985, 0.9985, 0.9986, 0.9986,
    /* 3.0 */
    0.9987, 0.9987, 0.9987, 0.9988, 0.9988, 0.9989, 0.9989, 0.9989, 0.9990, 0.9990
];



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

calc.merge_obj = function(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

calc.clone = function(something) {
    return JSON.parse(JSON.stringify(something));
};

calc.getPropertyArrayFromOject = function(objectFull) {
    // Create 'all propertys array' from Object
    var allFullPropertys = [];

    for (var property in objectFull) {
        if (objectFull.hasOwnProperty(property)) {
            allFullPropertys.push(property);
        }
    };

    return allFullPropertys;
};
