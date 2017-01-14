SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  ((cast(response AS json))->>'Datum') as datum,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'Datum'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'Datum'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,
  ((cast(response AS json))->>'EWHOQOL1') as WHOQOL_1,
  ((cast(response AS json))->>'EWHOQOL2') as WHOQOL_2,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL3]') as WHOQOL_3,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL4]') as WHOQOL_4,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL5]') as WHOQOL_5,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL6]') as WHOQOL_6,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL7]') as WHOQOL_7,
  ((cast(response AS json))->>'EWHOQOL1014[EWHOQOL10]') as WHOQOL_10,
  ((cast(response AS json))->>'EWHOQOL1014[EWHOQOL11]') as WHOQOL_11,
  ((cast(response AS json))->>'EWHOQOL15') as WHOQOL_15,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL16]') as WHOQOL_16,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL17]') as WHOQOL_17,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL18]') as WHOQOL_18,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL19]') as WHOQOL_19,
  ((cast(response AS json))->>'EWHOQOL26') as WHOQOL_26,
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
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
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'submitdate'), 'YYYY-MM-DD HH24:MI:SS')) AS submitdate_week,
  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id,
  stay.cis_fid AS fid,
  stay.id AS stay,
  stay.first_contact AS first_contact,
  stay.start AS start,
  to_char(stay.start, 'YYYY') AS start_year,
  to_char(stay.start, 'WW') AS start_week,
  to_char(stay.start, 'HH24:MI') AS start_time,
  stay.stop AS stop,
  stay.stop_status AS stop_status,
  stay.lead_therapist AS lead_therapist,
  stay.deputy_lead_therapist AS deputy_lead_therapist,
  stay.cis_lead_doctor AS lead_doctor,
  stay.insurance_number AS insurance_number

FROM "survey_response_view"
LEFT JOIN event ON event.id = survey_response_view.id
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id)
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)

WHERE module = 'com.optinomic.apps.whoqol';
/*
AND patient_view.id=1
AND to_char(stay.start, 'YYYY') = '2014'
*/
