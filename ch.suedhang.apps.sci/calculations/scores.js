function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.get_population = function(age, gender) {
        // Variablen initialisieren


        // Falls gender nicht gesetzt ist = Mann / 35LJ
        if (gender === null) {
            gender = 'male';
        };

        if (age === null) {
            age = 35;
        } else {
            age = parseInt(age);
        };


        var F_0_19 = {
            "0": {
                "UG1": 7,
                "UG2": 8,
                "UG3": 9,
                "UG4": 11,
                "UG5": 14,
                "UG6": 19,
                "UG7": 26,
                "UG8": 36,
                "UG9": 43
            },
            "1": {
                "UG1": 13,
                "UG2": 21,
                "UG3": 26,
                "UG4": 32,
                "UG5": 37,
                "UG6": 41,
                "UG7": 44,
                "UG8": 47,
                "UG9": 52
            },
            "2": {
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 8,
                "UG7": 9,
                "UG8": 11,
                "UG9": 16
            },
            "3": {
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 7,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 9,
                "UG6": 10,
                "UG7": 12,
                "UG8": 15,
                "UG9": 16
            },
            "5": {
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 9,
                "UG8": 12,
                "UG9": 14
            },
            "6": {
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 15
            }
        };
        var M_0_19 = {
            "0": {
                // 7   8   9   11  14  17  20  29  32
                "UG1": 7,
                "UG2": 8,
                "UG3": 9,
                "UG4": 11,
                "UG5": 14,
                "UG6": 17,
                "UG7": 20,
                "UG8": 29,
                "UG9": 32
            },
            "1": {
                // 13  19  27  31  34  38  42  49  52
                "UG1": 13,
                "UG2": 19,
                "UG3": 27,
                "UG4": 31,
                "UG5": 34,
                "UG6": 38,
                "UG7": 42,
                "UG8": 49,
                "UG9": 52
            },
            "2": {
                // 4   5   6   7   8   9   10  12  13
                "UG1": 4,
                "UG2": 5,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 13
            },
            "3": {
                // 4   4   6   7   8   9   10  12  13
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 13
            },
            "4": {
                // 4   4   5   7   8   11  12  14  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 8,
                "UG6": 11,
                "UG7": 12,
                "UG8": 14,
                "UG9": 16
            },
            "5": {
                // 4   4   4   5   6   7   8   9   10
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 8,
                "UG8": 9,
                "UG9": 10
            },
            "6": {
                // 4   4   4   4   5   9   12  14  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 4,
                "UG5": 5,
                "UG6": 9,
                "UG7": 12,
                "UG8": 14,
                "UG9": 16
            }
        };
        var F_20_30 = {
            "0": {
                // 7 8 8 10 14 18 23 28 44
                "UG1": 7,
                "UG2": 8,
                "UG3": 8,
                "UG4": 10,
                "UG5": 14,
                "UG6": 18,
                "UG7": 23,
                "UG8": 28,
                "UG9": 44
            },
            "1": {
                // 13 21 27 32 36 39 43 46 52
                "UG1": 13,
                "UG2": 21,
                "UG3": 27,
                "UG4": 32,
                "UG5": 36,
                "UG6": 39,
                "UG7": 43,
                "UG8": 46,
                "UG9": 52
            },
            "2": {
                // 4 4 5 6 7 9 10 12 13
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 7,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 13
            },
            "3": {
                // 4 4 6 7 8 9 11 12 14
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                // 4 4 6 8 10 12 13 15 16
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 8,
                "UG5": 10,
                "UG6": 12,
                "UG7": 13,
                "UG8": 15,
                "UG9": 16
            },
            "5": {
                // 4 4 4 5 6 7 8 10 15
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 8,
                "UG8": 10,
                "UG9": 15
            },
            "6": {
                // 4 4 4 4 7 9 10 13 15
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 4,
                "UG5": 7,
                "UG6": 9,
                "UG7": 10,
                "UG8": 13,
                "UG9": 15
            }
        };
        var M_20_30 = {
            "0": {
                // 7 8 8 9 12 16 20 26 45
                "UG1": 7,
                "UG2": 8,
                "UG3": 8,
                "UG4": 9,
                "UG5": 12,
                "UG6": 16,
                "UG7": 20,
                "UG8": 26,
                "UG9": 45
            },
            "1": {
                // 13 18 23 27 32 36 39 46 52
                "UG1": 13,
                "UG2": 18,
                "UG3": 23,
                "UG4": 27,
                "UG5": 32,
                "UG6": 36,
                "UG7": 39,
                "UG8": 46,
                "UG9": 52
            },
            "2": {
                // 4 4 5 6 8 10 11 12 14
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 8,
                "UG6": 10,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "3": {
                // 4 5 6 7 8 10 11 12 14
                "UG1": 4,
                "UG2": 5,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                // 4 4 5 7 9 11 12 13 16
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 9,
                "UG6": 11,
                "UG7": 12,
                "UG8": 13,
                "UG9": 16
            },
            "5": {
                // 4 4 4 5 5 7 8 9 13
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 5,
                "UG6": 7,
                "UG7": 8,
                "UG8": 9,
                "UG9": 13
            },
            "6": {
                // 4 4 4 5 7 10 12 14 16 
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 7,
                "UG6": 10,
                "UG7": 12,
                "UG8": 14,
                "UG9": 16
            }
        };
        var F_31_50 = {
            "0": {
                // 7    8   8   10  13  17  23  29  49
                "UG1": 7,
                "UG2": 8,
                "UG3": 8,
                "UG4": 10,
                "UG5": 13,
                "UG6": 17,
                "UG7": 23,
                "UG8": 29,
                "UG9": 49
            },
            "1": {
                // 13   19  25  30  34  38  42  46  52
                "UG1": 13,
                "UG2": 19,
                "UG3": 25,
                "UG4": 30,
                "UG5": 34,
                "UG6": 38,
                "UG7": 42,
                "UG8": 46,
                "UG9": 52
            },
            "2": {
                // 4    4   5   6   8   9   11  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "3": {
                // 4    4   6   7   8   10  11  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                // 4    4   6   7   9   11  12  14  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 9,
                "UG6": 11,
                "UG7": 12,
                "UG8": 14,
                "UG9": 16
            },
            "5": {
                // 4    4   4   5   6   7   9   12  15
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 9,
                "UG8": 12,
                "UG9": 15
            },
            "6": {
                // 4    4   4   5   7   9   11  13  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 7,
                "UG6": 9,
                "UG7": 11,
                "UG8": 13,
                "UG9": 16
            }
        };
        var M_31_50 = {
            "0": {
                // 7    8   8   9   12  15  21  29  44
                "UG1": 7,
                "UG2": 8,
                "UG3": 8,
                "UG4": 9,
                "UG5": 12,
                "UG6": 15,
                "UG7": 21,
                "UG8": 29,
                "UG9": 44
            },
            "1": {
                // 13   17  23  28  32  37  40  44  50
                "UG1": 13,
                "UG2": 17,
                "UG3": 23,
                "UG4": 28,
                "UG5": 32,
                "UG6": 37,
                "UG7": 40,
                "UG8": 44,
                "UG9": 50
            },
            "2": {
                // 4    4   5   6   8   9   11  12  13
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 13
            },
            "3": {
                // 4    4   6   7   8   9   11  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                // 4    4   5   7   8   10  12  13  15
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 12,
                "UG8": 13,
                "UG9": 15
            },
            "5": {
                // 4    4   4   5   6   7   8   10  13
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 8,
                "UG8": 10,
                "UG9": 13
            },
            "6": {
                // 4    4   4   5   8   10  13  15  16 
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 8,
                "UG6": 10,
                "UG7": 13,
                "UG8": 13,
                "UG9": 16
            }
        };
        var F_51 = {
            "0": {
                // 7    8   8   10  13  19  22  31  42
                "UG1": 7,
                "UG2": 8,
                "UG3": 8,
                "UG4": 10,
                "UG5": 13,
                "UG6": 19,
                "UG7": 22,
                "UG8": 31,
                "UG9": 42
            },
            "1": {
                // 13   18  23  30  34  37  42  46  51
                "UG1": 13,
                "UG2": 18,
                "UG3": 23,
                "UG4": 30,
                "UG5": 34,
                "UG6": 37,
                "UG7": 42,
                "UG8": 46,
                "UG9": 51
            },
            "2": {
                // 4    4   5   7   8   9   11  12  15
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 15
            },
            "3": {
                // 4    5   6   7   8   10  12  13  14
                "UG1": 4,
                "UG2": 5,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 12,
                "UG8": 13,
                "UG9": 14
            },
            "4": {
                // 4    4   5   7   8   10  12  13  15
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 12,
                "UG8": 13,
                "UG9": 15
            },
            "5": {
                // 4    4   4   5   6   8   11  13  16 
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 8,
                "UG7": 11,
                "UG8": 13,
                "UG9": 16
            },
            "6": {
                // 4    4   4   5   8   9   10  14  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 8,
                "UG6": 9,
                "UG7": 10,
                "UG8": 14,
                "UG9": 16
            }
        };
        var M_51 = {
            "0": {
                // 7    8   10  13  17  23  33  44  46
                "UG1": 7,
                "UG2": 8,
                "UG3": 10,
                "UG4": 13,
                "UG5": 17,
                "UG6": 23,
                "UG7": 33,
                "UG8": 44,
                "UG9": 46
            },
            "1": {
                // 13   16  20  27  32  37  41  46  51 
                "UG1": 13,
                "UG2": 16,
                "UG3": 20,
                "UG4": 27,
                "UG5": 32,
                "UG6": 37,
                "UG7": 41,
                "UG8": 46,
                "UG9": 51
            },
            "2": {
                // 4    4   5   6   8   9   11  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 6,
                "UG5": 8,
                "UG6": 9,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "3": {
                // 4    4   6   7   8   10  11  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 6,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 11,
                "UG8": 12,
                "UG9": 14
            },
            "4": {
                // 4    4   5   7   8   10  12  14  16
                "UG1": 4,
                "UG2": 4,
                "UG3": 5,
                "UG4": 7,
                "UG5": 8,
                "UG6": 10,
                "UG7": 12,
                "UG8": 14,
                "UG9": 16
            },
            "5": {
                // 4    4   4   5   6   7   8   11  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 6,
                "UG6": 7,
                "UG7": 8,
                "UG8": 11,
                "UG9": 14
            },
            "6": {
                // 4    4   4   5   7   9   10  12  14
                "UG1": 4,
                "UG2": 4,
                "UG3": 4,
                "UG4": 5,
                "UG5": 7,
                "UG6": 9,
                "UG7": 10,
                "UG8": 12,
                "UG9": 14
            }
        };


        // current_population festlegen
        current_population = {
            current: {},
            name: "Undefiniert",
            patient_age: age,
            patient_gender: gender
        };

        if ((age >= 0) && (age <= 19)) {
            if (gender === 'male') {
                // Mann
                current_population.current = M_0_19;
                current_population.name = "Männer, Jünger als 20 Jahre";
            } else {
                // Frau
                current_population.current = F_0_19;
                current_population.name = "Frauen, Jünger als 20 Jahre";
            };
        };

        if ((age >= 20) && (age <= 30)) {
            if (gender === 'male') {
                // Mann
                current_population.current = M_20_30;
                current_population.name = "Männer, 20-30 Jahre";
            } else {
                // Frau
                current_population.current = M_20_30;
                current_population.name = "Frauen, 20-30 Jahre";
            };
        };

        if ((age >= 31) && (age <= 50)) {
            if (gender === 'male') {
                // Mann
                current_population.current = M_31_50;
                current_population.name = "Männer, 31-50 Jahre";
            } else {
                // Frau
                current_population.current = F_31_50;
                current_population.name = "Frauen, 31-50 Jahre";
            };
        };

        if (age >= 51) {
            if (gender === 'male') {
                // Mann
                current_population.current = M_51;
                current_population.name = "Männer, Älter als 50 Jahre";
            } else {
                // Frau
                current_population.current = F_51;
                current_population.name = "Frauen, Älter als 50 Jahre";
            };
        };


        return current_population;
    };

    calc.get_stanine = function(current_population, score) {

        // Variablen initialisieren
        var stanine = 0;


        if (score >= current_population.UG1) {
            stanine = 1;
        }
        if (score >= current_population.UG2) {
            stanine = 2;
        }
        if (score >= current_population.UG3) {
            stanine = 3;
        }
        if (score >= current_population.UG4) {
            stanine = 4;
        }
        if (score >= current_population.UG5) {
            stanine = 5;
        }
        if (score >= current_population.UG6) {
            stanine = 6;
        }
        if (score >= current_population.UG7) {
            stanine = 7;
        }
        if (score >= current_population.UG8) {
            stanine = 8;
        }
        if (score >= current_population.UG9) {
            stanine = 9;
        }


        return stanine;
    };

    calc.getScores = function(d, current_population) {
        // INIT


        // Data-Model
        var scores_array = [{
            "question": "Stress durch Verlust",
            "sub_left": "Keine oder wenige Stressoren durch negative Ereignisse",
            "sub_right": "Viele Stressoren durch negative Ereignisse",
            "stanine": 0,
            "sum_score": 0,
            "name": 'belastung',
            "population": current_population
        }, {
            "question": "Stresssymptome",
            "sub_left": "Wenig koerperliche und psychische Stressreaktionen",
            "sub_right": "Viele koerperliche und psychische Stressreaktionen",
            "stanine": 0,
            "sum_score": 0,
            "name": 'stress',
            "population": current_population
        }, {
            "question": "Positives Denken",
            "sub_left": "Anwendung der Strategie wenig ausgepraegt",
            "sub_right": "Hilfreiche Nutzung der Strategie",
            "stanine": 0,
            "sum_score": 0,
            "name": 'coping_pos',
            "population": current_population
        }, {
            "question": "Aktive Stressbewaeltigung",
            "sub_left": "Anwendung der Strategie wenig ausgepraegt",
            "sub_right": "Hilfreiche Nutzung der Strategie",
            "stanine": 0,
            "sum_score": 0,
            "name": 'coping_ab',
            "population": current_population
        }, {
            "question": "Soziale Unterstuetzung",
            "sub_left": "Anwendung der Strategie wenig ausgepraegt",
            "sub_right": "Gut: Hilfreiche Nutzung der Strategie",
            "stanine": 0,
            "sum_score": 0,
            "name": 'coping_su',
            "population": current_population
        }, {
            "question": "Halt im Glauben",
            "sub_left": "Anwendung der Strategie wenig ausgepraegt",
            "sub_right": "Hilfreiche Nutzung der Strategie",
            "stanine": 0,
            "sum_score": 0,
            "name": 'coping_rel',
            "population": current_population
        }, {
            "question": "Alkohol- und Zigarettenkonsum",
            "sub_left": "Anwendung der Strategie wenig ausgepraegt",
            "sub_right": "Haeufige Anwendung der unguenstigen Strategie",
            "stanine": 0,
            "sum_score": 0,
            "name": 'coping_alk',
            "population": current_population
        }];

        var score_id = 0;

        // Scores berechnen
        score_id = 0;
        scores_array[score_id].name = 'belastung';
        scores_array[score_id].sum_score = 0;
        if (d['ESCIBelastung[ESCIB1]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB1]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB2]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB3]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB4]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB5]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB6]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCIBelastung[ESCIB7]']);
        };

        if (d['ASCIBelastung[ESCIB1]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB1]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB2]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB3]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB4]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB5]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB6]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCIBelastung[ESCIB7]']);
        };

        if (d.ESCIBelastung_ESCIB1) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB1);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB2);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB3);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB4);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB5);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB6);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCIBelastung_ESCIB7);
        };

        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 1;
        scores_array[score_id].name = 'stress';
        scores_array[score_id].sum_score = 0;
        if (d['ESCISymptome[ESCIS1]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS1]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS2]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS3]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS4]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS5]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS6]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS7]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS8]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCIS9]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCI10]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCI11]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCI12]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCISymptome[ESCI13]']);
        };

        if (d['ASCISymptome[ESCIS1]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS1]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS2]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS3]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS4]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS5]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS6]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS7]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS8]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCIS9]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCI10]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCI11]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCI12]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ASCISymptome[ESCI13]']);
        };

        if (d.ESCISymptome_ESCIS1) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS1);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS2);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS3);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS4);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS5);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS6);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS7);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS8);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCIS9);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCI10);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCI11);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCI12);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCISymptome_ESCI13);
        };

        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 2;
        scores_array[score_id].name = 'coping_pos';
        scores_array[score_id].sum_score = 0;
        if (d['ESCICoping[ESCIC1]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC1]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC5]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC6]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC16]']);
        };
        if (d.ESCICoping_ESCIC1) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC1);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC5);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC6);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC16);
        };
        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 3;
        scores_array[score_id].name = 'coping_ab';
        scores_array[score_id].sum_score = 0;
        if (d['ESCICoping[ESCIC3]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC3]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC7]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC12]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC17]']);
        };
        if (d.ESCICoping_ESCIC1) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC3);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC7);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC12);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC17);
        };
        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 4;
        scores_array[score_id].name = 'coping_su';
        scores_array[score_id].sum_score = 0;
        if (d['ESCICoping[ESCIC4]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC4]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC13]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC15]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC19]']);
        };
        if (d.ESCICoping_ESCIC4) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC4);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC13);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC15);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC19);
        };
        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 5;
        scores_array[score_id].name = 'coping_rel';
        scores_array[score_id].sum_score = 0;
        if (d['ESCICoping[ESCIC8]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC8]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC90]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC10]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC18]']);
        };
        if (d.ESCICoping_ESCIC8) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC8);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC90);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC10);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC18);
        };
        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        score_id = 6;
        scores_array[score_id].name = 'coping_alk';
        scores_array[score_id].sum_score = 0;
        if (d['ESCICoping[ESCIC8]']) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC8]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + (5 - parseInt(d['ESCICoping[ESCIC2]']));
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC11]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC14]']);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['ESCICoping[ESCIC20]']);
        };
        if (d.ESCICoping_ESCIC4) {
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC8);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + (5 - parseInt(d.ESCICoping_ESCIC2));
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC11);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC14);
            scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d.ESCICoping_ESCIC20);
        };
        scores_array[score_id].stanine = calc.get_stanine(current_population.current[score_id], scores_array[score_id].sum_score);

        return scores_array;
    };

    calc.getPatientAge = function(birth_date) {
        if (birth_date !== null) {
            var today = new Date();
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];



        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Calculate Stuff

            var age = calc.getPatientAge(myResponses.patient.data.birthdate);
            var gender = myResponses.patient.data.gender;
            var population = calc.get_population(age, gender);
            myResults.population = population;

            myResults.scores = calc.getScores(result, population);

            // Unneeded - Just for DEBUG
            // myResults.full_data = myResponses;

            // Write Results for the Return
            // Do not modify stuff down here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
