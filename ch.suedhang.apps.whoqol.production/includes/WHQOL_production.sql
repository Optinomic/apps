SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  ((cast(response AS json))->>'PID') as pid,
  CONCAT(patient.cis_pid, '00', RIGHT((stay.cis_fid/100)::text,2)) as MedStatFid,
  stay.cis_fid/100 AS fid,  
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD')  as datum,
  ((cast(response AS json))->>'EWHOQOL1') as WHOQOL_1,
  ((cast(response AS json))->>'EWHOQOL2') as WHOQOL_2,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL3]') as WHOQOL_3,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL4]') as WHOQOL_4,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL5]') as WHOQOL_5,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL6]') as WHOQOL_6,
  ((cast(response AS json))->>'EWHOQOL39[EWHOQOL7]') as WHOQOL_7,
  NULL as WHO_ein_8,
  NULL as WHO_ein_9,
  ((cast(response AS json))->>'EWHOQOL1014[EWHOQOL10]') as WHOQOL_10,
  ((cast(response AS json))->>'EWHOQOL1014[EWHOQOL11]') as WHOQOL_11,
  NULL as WHO_ein_12,
  NULL as WHO_ein_13,
  NULL as WHO_ein_14,
  ((cast(response AS json))->>'EWHOQOL15') as WHOQOL_15,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL16]') as WHOQOL_16,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL17]') as WHOQOL_17,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL18]') as WHOQOL_18,
  ((cast(response AS json))->>'EWHOQOL1625[EWHOQOL19]') as WHOQOL_19,
  NULL as WHO_ein_20,
  NULL as WHO_ein_21,
  NULL as WHO_ein_22,
  NULL as WHO_ein_23,
  NULL as WHO_ein_24,
  NULL as WHO_ein_25,
  ((cast(response AS json))->>'EWHOQOL26') as WHOQOL_26

FROM "survey_response_view"
--LEFT JOIN event ON event.id = survey_response_view.event_id
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id)
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)

WHERE module = 'ch.suedhang.apps.whoqol.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';
