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
  ((cast(response AS json))->>'AASE[AASE1]') as aase1,
  ((cast(response AS json))->>'AASE[AASE2]') as aase2,
  ((cast(response AS json))->>'AASE[AASE3]') as aase3,
  ((cast(response AS json))->>'AASE[AASE4]') as aase4,
  ((cast(response AS json))->>'AASE[AASE5]') as aase5,
  ((cast(response AS json))->>'AASE[AASE6]') as aase6,
  ((cast(response AS json))->>'AASE[AASE7]') as aase7,
  ((cast(response AS json))->>'AASE[AASE8]') as aase8,
  ((cast(response AS json))->>'AASE[AASE9]') as aase9,
  ((cast(response AS json))->>'AASE[AASE10]') as aase10,
  ((cast(response AS json))->>'AASE[AASE11]') as aase11,
  ((cast(response AS json))->>'AASE[AASE12]') as aase12,
  ((cast(response AS json))->>'AASE[AASE13]') as aase13,
  ((cast(response AS json))->>'AASE[AASE14]') as aase14,
  ((cast(response AS json))->>'AASE[AASE15]') as aase15,
  ((cast(response AS json))->>'AASE[AASE16]') as aase16,
  ((cast(response AS json))->>'AASE[AASE17]') as aase17,
  ((cast(response AS json))->>'AASE[AASE18]') as aase18,
  ((cast(response AS json))->>'AASE[AASE19]') as aase19,
  ((cast(response AS json))->>'AASE[AASE20]') as aase20


FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.aase-g.production';