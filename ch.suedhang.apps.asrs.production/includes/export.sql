SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

stay.cis_fid/100 as FID,
TO_DATE(((cast(response AS json))->>'Date'), 'YYYY-MM-DD HH24:MI:SS')  as datum,
((cast(response AS json))->>'ASRS_1') as ASRS_1,
((cast(response AS json))->>'ASRS_2') as ASRS_2,
((cast(response AS json))->>'ASRS_3') as ASRS_3,
((cast(response AS json))->>'ASRS_4') as ASRS_4,
((cast(response AS json))->>'ASRS_5') as ASRS_5,
((cast(response AS json))->>'ASRS_6') as ASRS_6


FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.asrs.production';
