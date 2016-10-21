
SELECT

-- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  patient,
  survey_response.id AS survey_response_id,
  ((cast(response AS json))->>'PID') as PID_Limesurvey,
  'PH' as Rekordart,
  71286515 as BUR_Nummer,
  ((cast(response AS json))->>'FID') as fid,
  ((cast(response AS json))->>'q401V04') as q401v04,
  ((cast(response AS json))->>'q401V05') as q401v05,
  ((cast(response AS json))->>'q401V06') as q401v06,
  ((cast(response AS json))->>'q402V00') as q402v00,
  ((cast(response AS json))->>'H1[402V01]') as h1_402v01,
  ((cast(response AS json))->>'H1[402V02]') as h1_402v02,
  ((cast(response AS json))->>'H1[402V03]') as h1_402v03,
  ((cast(response AS json))->>'H1[402V04]') as h1_402v04,
  ((cast(response AS json))->>'H1[402V05]') as h1_402v05,
  ((cast(response AS json))->>'H1[402V06]') as h1_402v06,
  ((cast(response AS json))->>'H1[402V07]') as h1_402v07,
  ((cast(response AS json))->>'H1[402V08]') as h1_402v08,
  ((cast(response AS json))->>'q402V09') as q402v09,
  ((cast(response AS json))->>'q402V10') as q402v10,  
  ((cast(response AS json))->>'H2[402V11]') as h2_402v11,
  ((cast(response AS json))->>'H2[402V12]') as h2_402v12,
  ((cast(response AS json))->>'H2[402V13]') as h2_402v13,
  ((cast(response AS json))->>'H2[402V14]') as h2_402v14,
  TO_DATE(((cast(response AS json))->>'q402V00'), 'YYYY-MM-DD HH24:MI:SS')  as Datum_Datumsformat

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)
WHERE module = 'ch.suedhang.apps.honos';