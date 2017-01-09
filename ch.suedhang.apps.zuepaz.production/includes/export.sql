SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  ((cast(response AS json))->>'Q00001') as zuepaz_01,
  ((cast(response AS json))->>'Q00002') as zuepaz_02,
  ((cast(response AS json))->>'Q00003') as zuepaz_03,
  ((cast(response AS json))->>'Q00004') as zuepaz_04,
  ((cast(response AS json))->>'Q00005') as zuepaz_05,
  ((cast(response AS json))->>'Q00006') as zuepaz_06,
  ((cast(response AS json))->>'Q00007') as zuepaz_07,
  ((cast(response AS json))->>'Q00008') as zuepaz_08,
  ((cast(response AS json))->>'Q00009') as zuepaz_09,
  ((cast(response AS json))->>'Q00010') as zuepaz_10,
  ((cast(response AS json))->>'Q00011') as zuepaz_11,
  ((cast(response AS json))->>'Q00012') as zuepaz_12,
  ((cast(response AS json))->>'Q00013') as zuepaz_13,
  ((cast(response AS json))->>'Q00014') as zuepaz_14,
  ((cast(response AS json))->>'Q00015') as zuepaz_15,
  ((cast(response AS json))->>'Q00016') as zuepaz_16,
  ((cast(response AS json))->>'Q00018') as zuepaz_18,
  ((cast(response AS json))->>'Q00019') as zuepaz_19,
  ((cast(response AS json))->>'Q00020') as zuepaz_20,
  ((cast(response AS json))->>'Q00021') as zuepaz_21,
  ((cast(response AS json))->>'Q00022') as zuepaz_22,
  ((cast(response AS json))->>'Q00023') as zuepaz_23,
  ((cast(response AS json))->>'Q00024') as zuepaz_24,
  ((cast(response AS json))->>'Q00025') as zuepaz_25,
  ((cast(response AS json))->>'Q00026') as zuepaz_26,
  ((cast(response AS json))->>'Q00027') as zuepaz_27,
  ((cast(response AS json))->>'Q00028') as zuepaz_28,
  ((cast(response AS json))->>'Q00029') as zuepaz_29,
  ((cast(response AS json))->>'Q00030') as zuepaz_30,
  ((cast(response AS json))->>'Q0031') as zuepaz_31,

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.zuepaz.production';