angular.module('optinomicDataModule').directive('zScore', function() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            data: '=data',
            options: '=options'
        },

        // templateUrl: 'directive/z-score/z-score-dev.html',
        templateUrl: 'https://cdn.rawgit.com/Optinomic/apps/master/lib/js/optinomic/data_module/directive/z-score/rawgit/z-score-v11.html',


        link: function(scope, element, attrs, ngModel) {


            function get_x_position(my_value) {
                var space_left_right = 4;
                var max_space = (100 - space_left_right) / (scope.options.zscore_min_max_range - 1);
                my_value = (my_value - scope.options.zscore_min_rounded) * max_space;
                my_value = my_value + (space_left_right / 2);

                return my_value;
            }


            function just_do_it() {
                // Variablen initialisieren
                scope.data = initData(scope.data);
                scope.options = initOptions(scope.options);




                // Range aufzeichnen
                scope.ranges = [];

                var current_score = scope.options.zscore_min_rounded;
                var i = 0;
                for (i = 0; i < scope.options.zscore_min_max_range; i++) {

                    var my_score = current_score + i;

                    var step_to_push = {
                        "id": i,
                        "score": my_score,
                        "x_pos": get_x_position(my_score)
                    };
                    scope.ranges.push(step_to_push);

                }

                // Baseline aufzeichnen
                scope.baseline = {};
                scope.baseline.start = get_x_position(scope.options.zscore_min_rounded);
                scope.baseline.end = get_x_position(scope.options.zscore_max_rounded);
                scope.baseline.width = scope.baseline.end - scope.baseline.start;


                // Z-Score
                scope.zScore = {};
                scope.zScore.zscore = scope.data.zscore;
                if (scope.data.zscore > 0) {
                    scope.zScore.start_x = get_x_position(0);
                    scope.zScore.end_x = get_x_position(scope.data.zscore);
                    scope.zScore.score_x = get_x_position(scope.data.zscore);
                    scope.zScore.postition_align = 'start';
                    scope.zScore.score_x_text = get_x_position(scope.data.zscore + 0.1);
                } else {
                    scope.zScore.end_x = get_x_position(0);
                    scope.zScore.start_x = get_x_position(scope.data.zscore);
                    scope.zScore.score_x = get_x_position(scope.data.zscore);
                    scope.zScore.postition_align = 'end';
                    scope.zScore.score_x_text = get_x_position(scope.data.zscore - 0.1);
                };

                scope.zScore.width = scope.zScore.end_x - scope.zScore.start_x;



                // Klinische Stichprope
                scope.clinicsample = {};
                scope.clinicsample.start_x = get_x_position(scope.data.clinicsample_start);
                scope.clinicsample.end_x = get_x_position(scope.data.clinicsample_end);
                scope.clinicsample.width = scope.clinicsample.end_x - scope.clinicsample.start_x;
                scope.clinicsample.mean = ((scope.data.clinicsample_end - scope.data.clinicsample_start) / 2) + scope.data.clinicsample_start;
                scope.clinicsample.mean_x = get_x_position(scope.clinicsample.mean);


                // Marker aufzeichnen
                scope.marker = {};
                scope.marker.have = false;
                if (scope.data.marker_1_score !== null) {
                    scope.marker.have = true;
                    scope.marker.marker_1_x = get_x_position(scope.data.marker_1_score);
                };


                if (scope.data.clinicsample_color !== 'none') {
                    // console.log('(new) clinicsample_color', scope.data.clinicsample_color);
                    scope.clinicsample_color = scope.data.clinicsample_color;
                } else {
                    // console.log('scope.data', scope.data);
                    scope.clinicsample_color = scope.options.clinicsample_color;
                };
                // console.log('zScore', scope);
            }

            // -----------------------------------------------
            // FUNCTIONS
            // -----------------------------------------------

            // Init Options
            function initData(Options) {

                Options = Options === undefined ? {} : Options;
                var myWidth = window.innerWidth / 100 * 95;
                var myHeight = window.innerHeight - 160;



                // Set Given Options or Defaults
                var clinicsample_start = Options.clinicsample_start === undefined ? null : Options.clinicsample_start;
                var clinicsample_end = Options.clinicsample_end === undefined ? null : Options.clinicsample_end;
                var zscore = Options.zscore === undefined ? 0 : Options.zscore;
                var zscore_color = Options.zscore_color === undefined ? '#1A237E' : Options.zscore_color;

                var text_left = Options.text_left === undefined ? '' : Options.text_left;
                var text_left_caption = Options.text_left_caption === undefined ? '' : Options.text_left_caption;
                var text_right = Options.text_right === undefined ? '' : Options.text_right;
                var text_right_caption = Options.text_right_caption === undefined ? '' : Options.text_right_caption;
                var marker_1_score = Options.marker_1_score === undefined ? null : Options.marker_1_score;
                var marker_1_text = Options.marker_1_text === undefined ? 'Marker' : Options.marker_1_text;
                var marker_1_color = Options.marker_1_color === undefined ? '#F44336' : Options.marker_1_color;
                var clinicsample_color = Options.clinicsample_color === undefined ? 'none' : Options.clinicsample_color;


                var ReturnedOptions = {
                    "zscore": zscore,
                    "zscore_color": zscore_color,
                    "clinicsample_start": clinicsample_start,
                    "clinicsample_end": clinicsample_end,
                    "text_left": text_left,
                    "text_left_caption": text_left_caption,
                    "text_right": text_right,
                    "text_right_caption": text_right_caption,
                    "marker_1_score": marker_1_score,
                    "marker_1_text": marker_1_text,
                    "marker_1_color": marker_1_color,
                    "clinicsample_color": clinicsample_color
                };


                // console.log('Options Return', ReturnedOptions);
                return ReturnedOptions;
            };

            // Init Options
            function initOptions(Options) {

                Options = Options === undefined ? {} : Options;
                var myWidth = window.innerWidth / 100 * 95;
                var myHeight = window.innerHeight - 160;

                // Set Given Options or Defaults
                var clinicsample_color = Options.clinicsample_color === undefined ? '#C5CAE9' : Options.clinicsample_color;
                var centered_zero = Options.centered_zero === undefined ? true : Options.centered_zero;
                var show_numbers = Options.show_numbers === undefined ? true : Options.show_numbers;
                var show_clinicsample = Options.show_clinicsample === undefined ? true : Options.show_clinicsample;
                var show_clinicsample_scores = Options.show_clinicsample_scores === undefined ? true : Options.show_clinicsample_scores;
                var show_text = Options.show_text === undefined ? true : Options.show_text;
                var zscore_min = Options.zscore_min === undefined ? -3 : Options.zscore_min;
                var zscore_max = Options.zscore_max === undefined ? 3 : Options.zscore_max;

                if (centered_zero) {
                    if (Math.abs(zscore_min) > Math.abs(zscore_max)) {
                        zscore_max = Math.abs(zscore_min);
                    } else {
                        zscore_min = Math.abs(zscore_max) * -1;
                    };
                };

                var ReturnedOptions = {
                    "zscore_min": zscore_min,
                    "zscore_max": zscore_max,
                    "zscore_min_rounded": Math.floor(zscore_min),
                    "zscore_max_rounded": Math.ceil(zscore_max),
                    "zscore_min_max_range": Math.abs(Math.floor(zscore_min)) + Math.ceil(zscore_max) + 1,
                    "clinicsample_color": clinicsample_color,
                    "centered_zero": centered_zero,
                    "show_numbers": show_numbers,
                    "show_clinicsample": show_clinicsample,
                    "show_clinicsample_scores": show_clinicsample_scores,
                    "show_text": show_text,
                    "baseline": 70,
                    "width": myWidth,
                    "height": myHeight
                };


                // console.log('Options Return', ReturnedOptions);
                return ReturnedOptions;
            };


            just_do_it();

            // Watch for changes and update.
            scope.$watch('data', function() {
                just_do_it();
            }, true);

            scope.$watch('options', function() {
                just_do_it();
            }, true);


        }
    };
});
