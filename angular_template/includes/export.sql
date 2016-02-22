SELECT 
  	patient.id as pid,
  	COALESCE(CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END, '') || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') as patient_name,
  	patient.four_letter_code,
  	((cast(response AS json))->>'BSCL[sq504V40]') as int, 
  	recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '-1')  as sq504V40_1,
	recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '0') + 10  as sq504V40_2 
FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
WHERE module = 'ch.suedhang.apps.bscl.anq'

