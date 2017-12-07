function getPGMatrix(sr, patient_groups){
    
    function deUmlaut(value){
        value = value.toLowerCase();
        value = value.replace(/ä/g, 'ae');
        value = value.replace(/ö/g, 'oe');
        value = value.replace(/ü/g, 'ue');
        value = value.replace(/ß/g, 'ss');
        value = value.replace(/ /g, '-');
        value = value.replace(/\./g, '');
        value = value.replace(/,/g, '');
        value = value.replace(/\(/g, '');
        value = value.replace(/\)/g, '');
        return value;
    }

    var return_obj = {
        "header": [],
        "row": []
    };
    
    patient_groups.forEach(function(pg, pgID) {
        console.log('sr2', sr);
        var pg_id = pg.entity.id;
        var group_info = sr.patient_groups.matrix[pg_id];
        var name = group_info.name;
        name = deUmlaut(name);
        name = name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        var pretty_count = 5 - pg_id.length;
        //name = 'pg' + 
        return_obj.header.push('pg'+pg_id+'___'+name);
        return_obj.row.push(group_info.patient_in_group);
    }.bind(sr));
    
    return return_obj;
};
                