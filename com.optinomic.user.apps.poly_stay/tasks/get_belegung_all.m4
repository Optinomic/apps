var task_name = "Alle Patienten";


include(tasks/get_belegung.js)

function main(token) {
    get_belegung_task({ "in_stay": "False" });
}
