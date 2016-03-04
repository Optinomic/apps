SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'Datum') as datum,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'Datum'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,

  ((cast(response AS json))->>'EWHOQOL1') as ewhoqol1,
  ((cast(response AS json))->>'EWHOQOL1014_EWHOQOL10') as ewhoqol1014_ewhoqol10,
  ((cast(response AS json))->>'EWHOQOL1014_EWHOQOL11') as ewhoqol1014_ewhoqol11,
  ((cast(response AS json))->>'EWHOQOL15') as ewhoqol15,
  ((cast(response AS json))->>'EWHOQOL1625_EWHOQOL16') as ewhoqol1625_ewhoqol16,
  ((cast(response AS json))->>'EWHOQOL1625_EWHOQOL17') as ewhoqol1625_ewhoqol17,
  ((cast(response AS json))->>'EWHOQOL1625_EWHOQOL18') as ewhoqol1625_ewhoqol18,
  ((cast(response AS json))->>'EWHOQOL1625_EWHOQOL19') as ewhoqol1625_ewhoqol19,
  ((cast(response AS json))->>'EWHOQOL2') as ewhoqol2,
  ((cast(response AS json))->>'EWHOQOL26') as ewhoqol26,
  ((cast(response AS json))->>'EWHOQOL39_EWHOQOL3') as ewhoqol39_ewhoqol3,
  ((cast(response AS json))->>'EWHOQOL39_EWHOQOL4') as ewhoqol39_ewhoqol4,
  ((cast(response AS json))->>'EWHOQOL39_EWHOQOL5') as ewhoqol39_ewhoqol5,
  ((cast(response AS json))->>'EWHOQOL39_EWHOQOL6') as ewhoqol39_ewhoqol6,
  ((cast(response AS json))->>'EWHOQOL39_EWHOQOL7') as ewhoqol39_ewhoqol7,
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'FID') as fid,
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
  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id  

FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 

WHERE module = 'com.optinomic.apps.whoqol'
AND SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer=2015;
