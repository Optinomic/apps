SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'aus_item_01') as aus_item_01,
  ((cast(response AS json))->>'aus_item_02') as aus_item_02,
  ((cast(response AS json))->>'aus_item_03') as aus_item_03,
  ((cast(response AS json))->>'aus_item_04') as aus_item_04,
  ((cast(response AS json))->>'aus_item_05') as aus_item_05,
  ((cast(response AS json))->>'aus_item_06') as aus_item_06,
  ((cast(response AS json))->>'aus_item_07') as aus_item_07,
  ((cast(response AS json))->>'current_item') as current_item,

  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id  

FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 

WHERE module = 'com.optinomic.apps.aus';
