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
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD')  as datum,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB1]') as sci_01,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB2]') as sci_02,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB3]') as sci_03,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB4]') as sci_04,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB5]') as sci_05,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB6]') as sci_06,
  ((cast(response AS json))->>'ESCIBelastung[ESCIB7]') as sci_07,
  ((cast(response AS json))->>'ESCISymptome[ESCIS1]') as sci_08,
  ((cast(response AS json))->>'ESCISymptome[ESCIS2]') as sci_09,
  ((cast(response AS json))->>'ESCISymptome[ESCIS3]') as sci_10,
  ((cast(response AS json))->>'ESCISymptome[ESCIS4]') as sci_11,
  ((cast(response AS json))->>'ESCISymptome[ESCIS5]') as sci_12,
  ((cast(response AS json))->>'ESCISymptome[ESCIS6]') as sci_13,
  ((cast(response AS json))->>'ESCISymptome[ESCIS7]') as sci_14,
  ((cast(response AS json))->>'ESCISymptome[ESCIS8]') as sci_15,
  ((cast(response AS json))->>'ESCISymptome[ESCIS9]') as sci_16,
  ((cast(response AS json))->>'ESCISymptome[ESCI10]') as sci_17,
  ((cast(response AS json))->>'ESCISymptome[ESCI11]') as sci_18,
  ((cast(response AS json))->>'ESCISymptome[ESCI12]') as sci_19,
  ((cast(response AS json))->>'ESCISymptome[ESCI13]') as sci_20,
  ((cast(response AS json))->>'ESCICoping[ESCIC1]') as sci_21,
  ((cast(response AS json))->>'ESCICoping[ESCIC2]') as sci_22,
  ((cast(response AS json))->>'ESCICoping[ESCIC3]') as sci_23,
  ((cast(response AS json))->>'ESCICoping[ESCIC4]') as sci_24,
  ((cast(response AS json))->>'ESCICoping[ESCIC5]') as sci_25,
  ((cast(response AS json))->>'ESCICoping[ESCIC6]') as sci_26,
  ((cast(response AS json))->>'ESCICoping[ESCIC7]') as sci_27,
  ((cast(response AS json))->>'ESCICoping[ESCIC8]') as sci_28,
  ((cast(response AS json))->>'ESCICoping[ESCIC90]') as sci_29,
  ((cast(response AS json))->>'ESCICoping[ESCIC10]') as sci_30,
  ((cast(response AS json))->>'ESCICoping[ESCIC11]') as sci_31,
  ((cast(response AS json))->>'ESCICoping[ESCIC12]') as sci_32,
  ((cast(response AS json))->>'ESCICoping[ESCIC13]') as sci_33,
  ((cast(response AS json))->>'ESCICoping[ESCIC14]') as sci_34,
  ((cast(response AS json))->>'ESCICoping[ESCIC15]') as sci_35,
  ((cast(response AS json))->>'ESCICoping[ESCIC16]') as sci_36,
  ((cast(response AS json))->>'ESCICoping[ESCIC17]') as sci_37,
  ((cast(response AS json))->>'ESCICoping[ESCIC18]') as sci_38,
  ((cast(response AS json))->>'ESCICoping[ESCIC19]') as sci_39,
  ((cast(response AS json))->>'ESCICoping[ESCIC20]') as sci_40

/*
  ,((cast(response AS json))->>'datestamp') as datestamp,
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

WHERE module = 'ch.suedhang.apps.sci.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';

