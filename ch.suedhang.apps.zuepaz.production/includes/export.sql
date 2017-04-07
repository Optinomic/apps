SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  stay.cis_fid/100 AS fid,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD')  as datum,
  CASE WHEN ((cast(response AS json))->>'Q00001') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00001') END as zuepaz_01,
  CASE WHEN ((cast(response AS json))->>'Q00002') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00002') END as zuepaz_02,
  CASE WHEN ((cast(response AS json))->>'Q00003') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00003') END as zuepaz_03,
  CASE WHEN ((cast(response AS json))->>'Q00004') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00004') END as zuepaz_04,
  CASE WHEN ((cast(response AS json))->>'Q00005') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00005') END as zuepaz_05,
  CASE WHEN ((cast(response AS json))->>'Q00006') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00006') END as zuepaz_06,
  CASE WHEN ((cast(response AS json))->>'Q00007') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00007') END as zuepaz_07,
  CASE WHEN ((cast(response AS json))->>'Q00008') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00008') END as zuepaz_08,
  CASE WHEN ((cast(response AS json))->>'Q00009') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00009') END as zuepaz_09,
  CASE WHEN ((cast(response AS json))->>'Q00010') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00010') END as zuepaz_10,
  CASE WHEN ((cast(response AS json))->>'Q00011') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00011') END as zuepaz_11,
  CASE WHEN ((cast(response AS json))->>'Q00012') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00012') END as zuepaz_12,
  CASE WHEN ((cast(response AS json))->>'Q00013') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00013') END as zuepaz_13,
  CASE WHEN ((cast(response AS json))->>'Q00014') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00014') END as zuepaz_14,
  CASE WHEN ((cast(response AS json))->>'Q00015') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00015') END as zuepaz_15,
  CASE WHEN ((cast(response AS json))->>'Q00016') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00016') END as zuepaz_16,
  CASE WHEN ((cast(response AS json))->>'Q00018') = '999' THEN NULL WHEN ((cast(response AS json))->>'Q00018') = 'kA' THEN NULL ELSE ((cast(response AS json))->>'Q00018') END as zuepaz_18,
  CASE WHEN ((cast(response AS json))->>'Q00019') = '999' THEN NULL WHEN ((cast(response AS json))->>'Q00019') = 'kA' THEN NULL ELSE ((cast(response AS json))->>'Q00019') END as zuepaz_19,
  CASE WHEN ((cast(response AS json))->>'Q00020') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00020') END as zuepaz_20,
  CASE WHEN ((cast(response AS json))->>'Q00021') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00021') END as zuepaz_21,
  CASE WHEN ((cast(response AS json))->>'Q00022') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00022') END as zuepaz_22,
  CASE WHEN ((cast(response AS json))->>'Q00023') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00023') END as zuepaz_23,
  CASE WHEN ((cast(response AS json))->>'Q00024') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00024') END as zuepaz_24,
  CASE WHEN ((cast(response AS json))->>'Q00025') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00025') END as zuepaz_25,
  CASE WHEN ((cast(response AS json))->>'Q00026') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00026') END as zuepaz_26,
  CASE WHEN ((cast(response AS json))->>'Q00027') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00027') END as zuepaz_27,
  CASE WHEN ((cast(response AS json))->>'Q00028') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00028') END as zuepaz_28,
  CASE WHEN ((cast(response AS json))->>'Q00029') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00029') END as zuepaz_29,
  CASE WHEN ((cast(response AS json))->>'Q00030') = '999' THEN NULL ELSE ((cast(response AS json))->>'Q00030') END as zuepaz_30,
  CASE WHEN ((cast(response AS json))->>'Q0031') = '' THEN 0 ELSE 1 END as zuepaz_31

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.zuepaz.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';