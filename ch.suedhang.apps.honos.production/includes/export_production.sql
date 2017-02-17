
SELECT

-- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox
  
  patient.cis_pid as pid_cis,
  stay.cis_fid as fid_cis,
  stay.cis_fid/100 as fid,
  survey_response_view.survey_response_id AS survey_response_id,
  ((cast(response AS json))->>'PID') as pid_Limesurvey,
  'PH' as rekordart,
  71286515 as betriebsnummer_bur,
  ((cast(response AS json))->>'FID') as fid_survey,
  ((cast(response AS json))->>'q401V04') as zeitpunkt_honos,
  ((cast(response AS json))->>'q401V05') as dropoutcode_honos,
  ((cast(response AS json))->>'q401V06') as spezifikation_dropout_honos_andere,
  TO_CHAR(TO_DATE(((cast(response AS json))->>'q402V00'), 'YYYY-MM-DD'), 'YYYYMMDD') as datum_erhebung_honos,
  ((cast(response AS json))->>'H1[402V01]') as honos_h1,
  ((cast(response AS json))->>'H1[402V02]') as honos_h2,
  ((cast(response AS json))->>'H1[402V03]') as honos_h3,
  ((cast(response AS json))->>'H1[402V04]') as honos_h4,
  ((cast(response AS json))->>'H1[402V05]') as honos_h5,
  ((cast(response AS json))->>'H1[402V06]') as honos_h6,
  ((cast(response AS json))->>'H1[402V07]') as honos_h7,
  ((cast(response AS json))->>'H1[402V08]') as honos_h8,
  ((cast(response AS json))->>'q402V09') as honos_h8a,
  ((cast(response AS json))->>'q402V10') as honos_h8b,  
  ((cast(response AS json))->>'H2[402V11]') as honos_h9,
  ((cast(response AS json))->>'H2[402V12]') as honos_h10,
  ((cast(response AS json))->>'H2[402V13]') as honos_h11,
  ((cast(response AS json))->>'H2[402V14]') as honos_h12
FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)
WHERE module = 'ch.suedhang.apps.honos.production' 
AND ((cast(response AS json))->>'q401V04') != '';
