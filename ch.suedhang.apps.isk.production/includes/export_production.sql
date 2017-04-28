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
  
  ((cast(response AS json))->>'AISK[AISK1]') as isk_01,
  ((cast(response AS json))->>'AISK[AISK2]') as isk_02,
  ((cast(response AS json))->>'AISK[AISK3]') as isk_03,
  ((cast(response AS json))->>'AISK[AISK4]') as isk_04,
  ((cast(response AS json))->>'AISK[AISK5]') as isk_05,
  ((cast(response AS json))->>'AISK[AISK6]') as isk_06,
  ((cast(response AS json))->>'AISK[AISK7]') as isk_07,
  ((cast(response AS json))->>'AISK[AISK8]') as isk_08,
  ((cast(response AS json))->>'AISK[AISK9]') as isk_09,
  ((cast(response AS json))->>'AISK[AIS10]') as isk_10,
  ((cast(response AS json))->>'AISK[AIS11]') as isk_11,
  ((cast(response AS json))->>'AISK[AIS12]') as isk_12,
  ((cast(response AS json))->>'AISK[AIS13]') as isk_13,
  ((cast(response AS json))->>'AISK[AIS14]') as isk_14,
  ((cast(response AS json))->>'AISK[AIS15]') as isk_15,
  ((cast(response AS json))->>'AISK[AIS16]') as isk_16,
  ((cast(response AS json))->>'AISK[AIS17]') as isk_17,
  ((cast(response AS json))->>'AISK[AIS18]') as isk_18,
  ((cast(response AS json))->>'AISK[AIS19]') as isk_19,
  ((cast(response AS json))->>'AISK[AIS20]') as isk_20,
  ((cast(response AS json))->>'AISK[AIS21]') as isk_21,
  ((cast(response AS json))->>'AISK[AIS22]') as isk_22,
  ((cast(response AS json))->>'AISK[AIS23]') as isk_23,
  ((cast(response AS json))->>'AISK[AIS24]') as isk_24,
  ((cast(response AS json))->>'AISK[AIS25]') as isk_25,
  ((cast(response AS json))->>'AISK[AIS26]') as isk_26,
  ((cast(response AS json))->>'AISK[AIS27]') as isk_27,
  ((cast(response AS json))->>'AISK[AIS28]') as isk_28,
  ((cast(response AS json))->>'AISK[AIS29]') as isk_29,
  ((cast(response AS json))->>'AISK[AIS30]') as isk_30,
  ((cast(response AS json))->>'AISK[AIS31]') as isk_31,
  ((cast(response AS json))->>'AISK[AIS32]') as isk_32,
  ((cast(response AS json))->>'AISK[AIS33]') as isk_33

/*,
  SUBSTRING(((cast(response AS json))->>'Datum'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,
  ((cast(response AS json))->>'FID') as fid_survey,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
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
  ((cast(response AS json))->>'submitdate') as submitdate,
  TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')  as submitdate_date,
  SUBSTRING(((cast(response AS json))->>'submitdate'),12,5) AS submitdate_time,
  SUBSTRING(((cast(response AS json))->>'submitdate'),1,4)::integer AS submitdate_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')) AS submitdate_week
*/

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.isk.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';
