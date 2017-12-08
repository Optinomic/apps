var task_name = "Aktuelle Patienten";

__opapp_include(tasks/get_belegung.js)

function main(token) {
    get_belegung_task({ "in_stay": "True" });
}
