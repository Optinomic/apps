SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  CONCAT(patient.cis_pid, '00', RIGHT((stay.cis_fid/100)::text,2)) as MedStatFid,
  stay.cis_fid/100 as FID,
  TO_DATE(TO_CHAR((filled), 'YYYY-MM-DD'), 'YYYY-MM-DD') as datum_filled,
  ((cast(response AS json))->>'Date') as Datum_alt,
  ((cast(response AS json))->>'Alter') as Alter_alt,
  ((cast(response AS json))->>'Ausbildungsjahre') as Ausbildungsjahre,
  ((cast(response AS json))->>'TMTATime') as ZeitA,
  ((cast(response AS json))->>'TMTAError') as FehlerA,
  ((cast(response AS json))->>'AzWert') as zWertA_alt,
  ((cast(response AS json))->>'TMTBTime') as ZeitB,
  ((cast(response AS json))->>'TMTBError') as FehlerB,
  ((cast(response AS json))->>'BzWert') as zWertB_alt,
  ((cast(response AS json))->>'BAzWert') as zWertQ_alt

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.tmt.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';