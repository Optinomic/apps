SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'AASE[AASE1]') as aase_01,
  ((cast(response AS json))->>'AASE[AASE2]') as aase_02,
  ((cast(response AS json))->>'AASE[AASE3]') as aase_03,
  ((cast(response AS json))->>'AASE[AASE4]') as aase_04,
  ((cast(response AS json))->>'AASE[AASE5]') as aase_05,
  ((cast(response AS json))->>'AASE[AASE6]') as aase_06,
  ((cast(response AS json))->>'AASE[AASE7]') as aase_07,
  ((cast(response AS json))->>'AASE[AASE8]') as aase_08,
  ((cast(response AS json))->>'AASE[AASE9]') as aase_09,
  ((cast(response AS json))->>'AASE[AASE10]') as aase_10,
  ((cast(response AS json))->>'AASE[AASE11]') as aase_11,
  ((cast(response AS json))->>'AASE[AASE12]') as aase_12,
  ((cast(response AS json))->>'AASE[AASE13]') as aase_13,
  ((cast(response AS json))->>'AASE[AASE14]') as aase_14,
  ((cast(response AS json))->>'AASE[AASE15]') as aase_15,
  ((cast(response AS json))->>'AASE[AASE16]') as aase_16,
  ((cast(response AS json))->>'AASE[AASE17]') as aase_17,
  ((cast(response AS json))->>'AASE[AASE18]') as aase_18,
  ((cast(response AS json))->>'AASE[AASE19]') as aase_19,
  ((cast(response AS json))->>'AASE[AASE20]') as aase_20,

  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id  

FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 

WHERE module = 'ch.suedhang.apps.aase-g'