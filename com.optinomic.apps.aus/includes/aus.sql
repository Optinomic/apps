SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'aus_item_01') as aus_item_01,
  ((cast(response AS json))->>'aus_item_02') as aus_item_02,
  ((cast(response AS json))->>'aus_item_03') as aus_item_03,
  ((cast(response AS json))->>'aus_item_04') as aus_item_04,
  ((cast(response AS json))->>'aus_item_05') as aus_item_05,
  ((cast(response AS json))->>'aus_item_06') as aus_item_06,
  ((cast(response AS json))->>'aus_item_07') as aus_item_07,
  ((cast(response AS json))->>'current_item') as last_page

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'com.optinomic.apps.aus';
