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
  ((cast(response AS json))->>'Alter') as Alter,
  ((cast(response AS json))->>'Ausbildungsjahre') as Ausbildungsjahre,
  ((cast(response AS json))->>'TMTATime') as ZeitA,
  ((cast(response AS json))->>'TMTAError') as FehlerA,
  ((cast(response AS json))->>'AzWert') as zWertA,
  ((cast(response AS json))->>'TMTBTime') as ZeitB,
  ((cast(response AS json))->>'TMTBError') as FehlerB,
  ((cast(response AS json))->>'BzWert') as zWertB,
  ((cast(response AS json))->>'BAzWert') as zWertQ,
  ((cast(response AS json))->>'filled') as filled,
  ((cast(response AS json))->>'Date') as Datum
  /*
  ,TO_DATE(((cast(response AS json))->>'Date'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'Date'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Date'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Date'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,
  ((cast(response AS json))->>'Messzeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'FID') as fid_survey,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'datestamp') as datestamp,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')  as datestamp_date,
  SUBSTRING(((cast(response AS json))->>'datestamp'),12,5) AS datestamp_time,
  SUBSTRING(((cast(response AS json))->>'datestamp'),1,4)::integer AS datestamp_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')) AS datestamp_week,
  ((cast(response AS json))->>'id') as id,
  ((cast(response AS json))->>'lastpage') as lastpage,
  ((cast(response AS json))->>'optinomixHASH') as optinomixhash,
  ((cast(response AS json))->>'startdate') as startdate,
  TO_DATE(((cast(response AS json))->>'startdate'), 'YYYY-MM-DD HH24:MI:SS')  as startdate_date,
  SUBSTRING(((cast(response AS json))->>'startdate'),12,5) AS startdate_time,
  SUBSTRING(((cast(response AS json))->>'startdate'),1,4)::integer AS startdate_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'startdate'), 'YYYY-MM-DD HH24:MI:SS')) AS startdate_week,
  ((cast(response AS json))->>'startlanguage') as startlanguage,
  ((cast(response AS json))->>'submitdate') as submitdate
*/

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.tmt.production';