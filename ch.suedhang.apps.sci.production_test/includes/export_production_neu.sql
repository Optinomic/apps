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
  ((cast(response AS json))->>'andererZeitpunkt') as andererzeitpunkt,
  TO_DATE(((cast(response AS json))->>'Datum'), 'YYYY-MM-DD')  as datum,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB1]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB1]') END as sci_01,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB2]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB2]') END as sci_02,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB3]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB3]') END as sci_03,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB4]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB4]') END as sci_04,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB5]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB5]') END as sci_05,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB6]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB6]') END as sci_06,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCIBelastung[ESCIB7]') ELSE ((cast(response AS json))->>'ESCIBelastung[ESCIB7]') END as sci_07,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS1]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS1]') END as sci_08,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS2]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS2]') END as sci_09,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS3]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS3]') END as sci_10,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS4]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS4]') END as sci_11,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS5]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS5]') END as sci_12,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS6]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS6]') END as sci_13,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS7]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS7]') END as sci_14,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS8]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS8]') END as sci_15,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCIS9]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCIS9]') END as sci_16,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCI10]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCI10]') END as sci_17,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCI11]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCI11]') END as sci_18,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCI12]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCI12]') END as sci_19,
  CASE WHEN (filled > '2017-01-15'::date) AND (((cast(response AS json))->>'Erhebungszeitpunkt') = '2') THEN ((cast(response AS json))->>'ASCISymptome[ESCI13]') ELSE ((cast(response AS json))->>'ESCISymptome[ESCI13]') END as sci_20,
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
FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.sci.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';

