SELECT 
  patient.id
  patient.last_name,
  patient.first_name,
  ((cast(response AS json))->>'BSCL[sq504V40]') as gaga,
  recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '-1')  as sq504V40,
  recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '0') + 2  as Count
FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
WHERE module = 'ch.suedhang.apps.bscl.anq'
