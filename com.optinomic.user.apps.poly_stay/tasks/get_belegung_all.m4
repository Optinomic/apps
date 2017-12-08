var task_name = "Alle Patienten";


__opapp_include(tasks/get_belegung.js)

function main(token) {
    get_belegung_task({ "in_stay": "False" });
}
