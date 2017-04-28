SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox


  ((cast(response AS json))->>'Institution') as institution,
  stay.cis_fid/100 as vzex005,
  CONCAT(patient.cis_pid, '00', RIGHT((stay.cis_fid/100)::text,2)) as MedStatFid,
  NULL as audit,
  CASE WHEN ((cast(response AS json))->>'VZEA010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA010') END as vzea010,
  CASE WHEN ((cast(response AS json))->>'VZEA020') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA020') END as vzea020,
  CASE WHEN ((cast(response AS json))->>'VZEA030') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA030') END as vzea030,
  CASE WHEN ((cast(response AS json))->>'VZEA040') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA040') END as vzea040,
  CASE WHEN ((cast(response AS json))->>'VZEA050') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA050') END as vzea050,
  CASE WHEN ((cast(response AS json))->>'VZEA060') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA060') END as vzea060,
  CASE WHEN ((cast(response AS json))->>'VZEA070') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA070') END as vzea070,
  CASE WHEN ((cast(response AS json))->>'VZEA080') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA080') END as vzea080,
  CASE WHEN ((cast(response AS json))->>'VZEA090') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA090') END as vzea090,
  CASE WHEN ((cast(response AS json))->>'VZEA100') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZEA100') END as vzea100,
  NULL as fagerstroem,
  CASE WHEN ((cast(response AS json))->>'VZET010') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET010') END as vzet010,
  CASE WHEN ((cast(response AS json))->>'VZET020') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET020') END as vzet020,
  CASE WHEN ((cast(response AS json))->>'VZET030') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET030') END as vzet030,
  CASE WHEN ((cast(response AS json))->>'VZET040') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET040') END as vzet040,
  CASE WHEN ((cast(response AS json))->>'VZET050') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET050') END as vzet050,
  CASE WHEN ((cast(response AS json))->>'VZET060') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET060') END as vzet060,
  CASE WHEN ((cast(response AS json))->>'VZET070') = '999' THEN '-1' ELSE ((cast(response AS json))->>'VZET070') END as vzet070

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.actinfo_ein.production';