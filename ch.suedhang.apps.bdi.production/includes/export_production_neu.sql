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
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD') as datum,

  ((cast(response AS json))->>'BDI1') as bdi1,
  ((cast(response AS json))->>'BDI2') as bdi2,
  ((cast(response AS json))->>'BDI3') as bdi3,
  ((cast(response AS json))->>'BDI4') as bdi4,
  ((cast(response AS json))->>'BDI5') as bdi5,
  ((cast(response AS json))->>'BDI6') as bdi6,
  ((cast(response AS json))->>'BDI7') as bdi7,
  ((cast(response AS json))->>'BDI8') as bdi8,
  ((cast(response AS json))->>'BDI9') as bdi9,
  ((cast(response AS json))->>'BDI10') as bdi10,
  ((cast(response AS json))->>'BDI11') as bdi11,
  ((cast(response AS json))->>'BDI12') as bdi12,
  ((cast(response AS json))->>'BDI13') as bdi13,
  ((cast(response AS json))->>'BDI14') as bdi14,
  ((cast(response AS json))->>'BDI15') as bdi15,
  ((cast(response AS json))->>'BDI16') as bdi16,
  ((cast(response AS json))->>'BDI17') as bdi17,
  ((cast(response AS json))->>'BDI18') as bdi18,
  ((cast(response AS json))->>'BDI19') as bdi19,
  ((cast(response AS json))->>'BDI20') as bdi20,
  ((cast(response AS json))->>'BDI21') as bdi21

/*
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'Datum'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,
  ((cast(response AS json))->>'FID') as fid,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
  ((cast(response AS json))->>'datestamp') as datestamp,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')  as datestamp_date,
  SUBSTRING(((cast(response AS json))->>'datestamp'),12,5) AS datestamp_time,
  SUBSTRING(((cast(response AS json))->>'datestamp'),1,4)::integer AS datestamp_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')) AS datestamp_week,
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
WHERE module = 'ch.suedhang.apps.bdi.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';
