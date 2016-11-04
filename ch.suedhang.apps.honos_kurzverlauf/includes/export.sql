
SELECT

-- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox
  stay.cis_fid as cis_fid,
  stay.cis_fid/100 as FID,
  patient,
  survey_response_view.survey_response_id AS survey_response_id,
  ((cast(response AS json))->>'PID') as PID_Limesurvey,
  'PH' as Rekordart,
  71286515 as betriebsnummer_bur,
  ((cast(response AS json))->>'FID') as FID,
  3 as zeitpunkt_honos,
  null as dropoutcode_honos,
  null as spezifikation_dropout_honos_andere,
  ((cast(response AS json))->>'q402V00') as datum_erhebung_honos,
  ((cast(response AS json))->>'H1[402V01]') as honos_h1,
  ((cast(response AS json))->>'H1[402V02]') as honos_h2,
  null as honos_h3,
  null as honos_h4,
  ((cast(response AS json))->>'H1[402V05]') as honos_h5,
  null as honos_h6,
  null as honos_h7,
  null as honos_h8,
  null as honos_h8a,
  null as honos_h8b,  
  null as honos_h9,
  null as honos_h10,
  null as honos_h11,
  null as honos_h12,
  TO_DATE(((cast(response AS json))->>'q402V00'), 'YYYY-MM-DD HH24:MI:SS')  as Datum_Datumsformat

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)
WHERE module = 'ch.suedhang.apps.honos_kurzverlauf';