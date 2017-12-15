    var calc = {};


    // ------------------------------------------
    // Extras
    // ------------------------------------------
    calc.formatDateCH = function(date_string) {
      date_string = date_string || null
      if (date_string !== null) {

        // 1952-11-19T00:00:00.000000000000Z
        var year = parseInt(date_string.substring(0, 4));
        var month = parseInt(date_string.substring(5, 7));
        var day = parseInt(date_string.substring(8, 10));
        var date_string_return = day + "." + month + "." + year

        return date_string_return;
      } else {
        return null;
      }
    };

    calc.createPatientExtras = function(patient, filled_date) {

      function getAge(dateString, when) {
        if (when) {
          var today = new Date(when);
        } else {
          var today = new Date();
        };

        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }


      // patient.age = $filter('dateToAge')(patient.birthdate);
      // patient.birthday = $filter('date')(patient.birthdate);

      patient.extras = {};
      patient.extras.age = getAge(patient.birthdate);
      patient.extras.age_when_filled = getAge(patient.birthdate, filled_date);

      patient.extras.birthday = calc.formatDateCH(patient.birthdate);
      patient.extras.birthday_age = patient.extras.birthday + ' | ' + patient.extras.age;

      patient.extras.name = patient.last_name + ' ' + patient.first_name;

      if (patient.gender === 'male') {
        patient.extras.ansprache = 'Herr';
        patient.extras.anrede = 'Herr ' + patient.last_name;
      } else {
        patient.extras.ansprache = 'Frau';
        patient.extras.anrede = 'Frau ' + patient.last_name;
      };
      patient.extras.full_name = patient.extras.ansprache + ' ' + patient.extras.name + ' (' + patient.extras.birthday_age + ')';

      patient.extras.full_address = patient.address1 + ', ' + patient.zip_code + ' ' + patient.city;

      var myPhone = '';
      if (patient.phone_home) {
        myPhone = patient.phone_home;
      }
      if (patient.phone_mobile) {
        if (myPhone != '') {
          myPhone = myPhone + ', ' + patient.phone_mobile;
        } else {
          myPhone = patient.phone_mobile;
        }
      }
      patient.extras.phone = myPhone;
      patient.extras.infoline = patient.extras.full_address

      if (myPhone != '') {
        patient.extras.infoline + ' | ' + patient.extras.phone;
      };


      // -----------------------------------
      // Female = Pink | Male = Blue
      // -----------------------------------
      var myColor = "#3F51B5";
      var myColorAccent = "#E91E63";
      if (patient.gender === "female") {
        myColor = "#E91E63";
        myColorAccent = "#3F51B5";
      }
      patient.extras.color_main = myColor;
      patient.extras.color_accent = myColorAccent;

      return patient.extras;
    };

    calc.createStayExtras = function(current_stay) {
      current_stay.extras = {};

      // Calculate - Duration of the stay
      if (current_stay.stop) {
        current_stay.extras.duration = Math.floor((Date.parse(current_stay.stop) - Date.parse(current_stay.start)) / 86400000);
        current_stay.extras.duration = current_stay.extras.duration + 1; //incl. start & stop date
      } else {
        current_stay.extras.duration = Math.floor((new Date() - Date.parse(current_stay.start)) / 86400000);
      };

      // phase - translation
      var phase = current_stay.phase;
      var translated_de = "";
      if (phase === 'before_stay') {
        translated_de = "Bevorstehende Behandlung";
        translated_en = "the stay starts in the future";
      };
      if (phase === 'in_stay') {
        translated_de = "In akuteller Behandlung";
        translated_en = "the patient is currently in stay";
      };
      if (phase === 'after_exit') {
        translated_de = "Die Behandlung wurde vor weniger als 14 Tage beendet";
        translated_en = "the stay ended less than 14 days ago (included)";
      };
      if (phase === 'frozen') {
        translated_de = "Die Behandlung wurde manuell eingefroren";
        translated_en = "the stay has manually been frozen (no more events, changes, ...)";
      };
      if (phase === 'unfrozen') {
        translated_de = "Die Behandlung ist abgeschlossen, wurde jedoch zur Bearbeitung wieder geöffnet";
        translated_en = "the stay is complete but has been unfrozen by somebody";
      };
      if (phase === 'complete') {
        translated_de = "Die Behandlung wurde vor mehr als 14 Tage beendet";
        translated_en = "the stay ended more than 14 days ago";
      };
      current_stay.extras.phase_de = translated_de;
      current_stay.extras.phase_en = translated_en;

      // from_to
      current_stay.extras.beginn = calc.formatDateCH(current_stay.start);
      current_stay.extras.from_to = calc.formatDateCH(current_stay.start);
      current_stay.extras.from_to = current_stay.extras.from_to + ' - ';
      if (current_stay.stop) {
        current_stay.extras.from_to = current_stay.extras.from_to + calc.formatDateCH(current_stay.stop);
        current_stay.extras.ende = calc.formatDateCH(current_stay.stop);
      } else {
        current_stay.extras.from_to = current_stay.extras.from_to + "Unbekannt";
      };

      return current_stay.extras;
    };



    // ------------------------------------------
    // F U N C T I O N S
    // ------------------------------------------
    calc.getCurrentPatients = function(d) {

      calc.definitions = definitions;
      calc.definitions.patient_app_calculation = calc.definitions.paitent_app_id + ":" + calc.definitions.calculation_id;

      var return_obj = {
        "patient_groups": JSON.parse(JSON.stringify(d.patient_groups)),
        "patients": null,
        "definitions": calc.definitions
      };

      if ("patients" in d) {

        var found = false;
        d.patients.forEach(function(r, rID) {
          if (r.identifier === calc.definitions.user_app_id) {
            return_obj.patients = JSON.parse(JSON.stringify(r.patients));
          };
        });

        return return_obj;
      };
    };


    calc.getPatientGroupsMatrix = function(pid) {
      var patient_groups = responses.patient_groups;
      pid = pid || null;

      var return_obj = null;

      if (pid !== null) {

        return_obj = {
          "matrix": {},
          "patient_in_group": {
            "yes": [],
            "no": []
          }
        };
        patient_groups.forEach(function(pg, pgID) {

          var pg_set = {
            "name": pg.entity.data.name,
            "patient_in_group": false
          };

          function inGroup(p) {
            return p.id === pid;
          };

          if (pg.patients.filter(inGroup).length > 0) {
            pg_set.patient_in_group = true;
            return_obj.patient_in_group.yes.push(pg.entity.id);
          } else {
            return_obj.patient_in_group.no.push(pg.entity.id);
          };

          return_obj.matrix[pg.entity.id] = pg_set;

        });
      };

      return return_obj;
    };


    calc.getSurveyResponses = function(all) {


      var return_array = [];
      all.forEach(function(d, dID) {


        if ("foreign_survey_responses" in d) {

          if (calc.definitions.paitent_app_id in d.foreign_survey_responses) {

            var foreign_survey_responses = d.foreign_survey_responses[calc.definitions.paitent_app_id];
            // console.log('foreign_survey_responses', foreign_survey_responses);

            foreign_survey_responses.forEach(function(fsr, fsrID) {


              var data = {
                "all_found": false,
                "survey_response": null,
                "survey_response_id": null,
                "survey_response_found": false,
                "event": null,
                "event_id": null,
                "event_found": false,
                "pum": null,
                "pum_id": null,
                "pum_found": false,
                "stay": null,
                "stay_id": null,
                "stay_found": false,
                "patient": null,
                "patient_id": null,
                "patient_found": false,
                "calculation": null,
                "calculation_id": calc.definitions.calculation_id,
                "calculation_found": false,
                "calculation_found_method": null,
                "patient_groups": {}
              };


              // Survey Response
              data.survey_response_id = fsr.id;
              data.survey_response = fsr.data;
              data.event_id = fsr.data.event_id;

              // Events
              if ("events" in d) {
                d.events.forEach(function(e, eID) {
                  if (e.id === data.event_id) {
                    data.event_found = true;
                    data.event = e.data;
                    data.pum_id = e.data.patient_uses_module_id;
                  };
                });
              };



              // patient_uses_modules
              if ("patient_uses_modules" in d) {
                d.patient_uses_modules.forEach(function(pum, pumID) {
                  if (data.event_found === false) {
                    // If no event is there
                    data.pum_id = pum.id;
                  };


                  if (pum.id === data.pum_id) {
                    data.pum_found = true;
                    data.pum = pum.data;
                    data.stay_id = pum.data.stay_id;
                    data.patient_id = pum.data.patient_id;
                    data.patient_groups = calc.getPatientGroupsMatrix(data.patient_id);
                  };

                });
              };

              // stays
              if ("stays" in d) {
                d.stays.forEach(function(s, sID) {
                  if (s.id === data.stay_id) {
                    data.stay_found = true;
                    data.stay = s.data;
                    data.stay.extras = calc.createStayExtras(data.stay);
                  };
                });
              };

              // patients
              if ("patient" in d) {
                if (d.patient.id === data.patient_id) {
                  data.patient_found = true;
                  data.patient = d.patient.data;
                  data.patient.extras = calc.createPatientExtras(d.patient.data, data.survey_response.filled);
                };
              };


              // Calculations
              if ("other_calculations" in d) {
                if (calc.definitions.patient_app_calculation in d.other_calculations) {

                  var calculation_results = d.other_calculations[calc.definitions.patient_app_calculation];

                  calculation_results.forEach(function(current_calculation, calculationID) {


                    var variant_info = false;
                    if ("info" in current_calculation) {
                      if ("response" in current_calculation.info) {
                        variant_info = true;
                      };
                    };

                    var variant_response = false;
                    if ("response" in current_calculation) {
                      if ("data" in current_calculation.response) {
                        if ("response" in current_calculation.response.data) {
                          variant_response = true;
                        };
                      };
                    };



                    // Check stuff

                    if (variant_info) {
                      var calc_resp = current_calculation.info.response;

                      if (JSON.stringify(calc_resp) === JSON.stringify(data.survey_response.response)) {
                        // console.log('(+) EQUAL: ', calc_resp);

                        data.calculation_found = true;
                        data.calculation_found_method = "variant_info";
                        data.calculation = current_calculation;
                      };
                    };

                    if (variant_response) {
                      var calc_resp = current_calculation.response.data.response;

                      if (JSON.stringify(calc_resp) === JSON.stringify(data.survey_response.response)) {
                        // console.log('(+) EQUAL: ', calc_resp);

                        data.calculation_found = true;
                        data.calculation_found_method = "variant_response";
                        data.calculation = current_calculation;

                      } else {

                        if ("TMTAError" in calc_resp) {
                          // TMT - Special
                          // console.error('DEBUG HERE ::', calc_resp, data.survey_response, current_calculation);

                          if ((parseInt(calc_resp.TMTAError) === parseInt(data.survey_response.response.TMTAError)) &&
                            (parseInt(calc_resp.TMTATime) === parseInt(data.survey_response.response.TMTATime)) &&
                            (parseInt(calc_resp.TMTBError) === parseInt(data.survey_response.response.TMTBError)) &&
                            (parseInt(calc_resp.TMTBTime) === parseInt(data.survey_response.response.TMTBTime)) &&
                            (parseInt(calc_resp.Ausbildungsjahre) === parseInt(data.survey_response.response.Ausbildungsjahre)) &&
                            (parseInt(calc_resp.Messzeitpunkt) === parseInt(data.survey_response.response.Messzeitpunkt))
                          ) {

                            data.calculation_found = true;
                            data.calculation_found_method = "variant_response_tmt";
                            data.calculation = current_calculation;
                          };

                        };

                      };
                    };
                  });


                };
              };


              // All Found
              if (data.calculation_found && data.event_found && data.patient_found && data.stay_found && data.pum_found) {
                data.all_found = true;
              };
              if (data.calculation_found && data.patient_found && data.stay_found) {
                // Save
                return_array.push(data);
              };

              data.survey_response_found = true;

            });



          };
        };


      });



      return return_array;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

      var results = calc.getCurrentPatients(d);
      results.survey_responses = calc.getSurveyResponses(results.patients);

      // var firstAllFound = calc.findFirstAllFound(results.survey_responses);
      // var flatten = calc.flatten(firstAllFound);
      // var fieldsArray = calc.getFieldsArray(flatten);

      var return_obj = {
        "_version": "1.4",
        "definitions": results.definitions,
        "survey_responses": results.survey_responses,
        "patient_groups": null
      };

      return return_obj;
    };


    return calc.getResults(responses);
