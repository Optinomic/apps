
SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'FID') as fid,
  ((cast(response AS json))->>'H1[402V01]') as h1_402v01,
  ((cast(response AS json))->>'H1[402V02]') as h1_402v02,
  ((cast(response AS json))->>'H1[402V03]') as h1_402v03,
  ((cast(response AS json))->>'H1[402V04]') as h1_402v04,
  ((cast(response AS json))->>'H1[402V05]') as h1_402v05,
  ((cast(response AS json))->>'H1[402V06]') as h1_402v06,
  ((cast(response AS json))->>'H1[402V07]') as h1_402v07,
  ((cast(response AS json))->>'H1[402V08]') as h1_402v08,
  ((cast(response AS json))->>'H2[402V11]') as h2_402v11,
  ((cast(response AS json))->>'H2[402V12]') as h2_402v12,
  ((cast(response AS json))->>'H2[402V13]') as h2_402v13,
  ((cast(response AS json))->>'H2[402V14]') as h2_402v14,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'cgiSG') as cgisg,
  ((cast(response AS json))->>'cgiZA') as cgiza,
  ((cast(response AS json))->>'datestamp') as datestamp,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')  as datestamp_date,
  SUBSTRING(((cast(response AS json))->>'datestamp'),12,5) AS datestamp_time,
  SUBSTRING(((cast(response AS json))->>'datestamp'),1,4)::integer AS datestamp_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')) AS datestamp_week,
  ((cast(response AS json))->>'id') as id,
  ((cast(response AS json))->>'lastpage') as lastpage,
  ((cast(response AS json))->>'optinomixHASH') as optinomixhash,
  ((cast(response AS json))->>'q401V04') as q401v04,
  ((cast(response AS json))->>'q401V05') as q401v05,
  ((cast(response AS json))->>'q401V06') as q401v06,
  ((cast(response AS json))->>'q402V00') as q402v00,
  ((cast(response AS json))->>'q402V09') as q402v09,
  ((cast(response AS json))->>'q402V10') as q402v10,
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
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')) AS submitdate_week,

  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id  

FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 

WHERE module = 'ch.suedhang.apps.honos';


 