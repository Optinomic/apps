d.tmt_loadKS = function(calculation_results) {

    var ks = {};

    var ks_file = include_as_js_string(
        ch_suedhang_user_apps_tmt_activated.json)

    ks_file = JSON.parse(ks_file);
    ks = ks_file;



    ks.text = '';
    ks.dimensions.forEach(function(dim, dimID) {
        if (ks.text !== '') {
            ks.text = ks.text + ', '
        };
        ks.text = ks.text + dim.name
    });
    ks.text = ks.n_scores + ' Messungen normiert nach ' + ks.text;
    var datum_ks = $filter('date')(ks.date);
    ks.text = ks.text + ' (' + datum_ks + ')'


    ks.normgurppe = {};
    ks.normgurppe.n = '(N=' + calculation_results.percentile.age_perz.n + ')';

    var age = calculation_results.percentile.age_perz.altersgruppe_text;
    var edu = calculation_results.percentile.age_perz.education;

    if (edu === 99) {
        edu = 'Jeder Ausbildungsgrad'
    };
    if (edu === 0) {
        edu = '<= 12 Jahre'
    };
    if (edu === 1) {
        edu = '> 12 Jahre'
    };
    ks.normgurppe.text = age + ', ' + edu + ' ' + ks.normgurppe.n;

    console.log('(✓) Klinikstichprobe geladen: ', ks);

    return ks;

};
