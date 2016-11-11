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
  stay.start as Eintritt_Entwöhnung, --stay.start entspricht allg. Klinikeintritt, nicht Entwöhnung!!!!
  EXTRACT(year FROM stay.start) as Eintrittsjahr,
  NULL as Dropoutgrund,
  ((cast(response AS json))->>'Datum') as Datum_Erhebung,
  
  ((cast(response AS json))->>'AISK[AISK1]') as isk_ein_1,
  ((cast(response AS json))->>'AISK[AISK2]') as isk_ein_2,
  ((cast(response AS json))->>'AISK[AISK3]') as isk_ein_3,
  ((cast(response AS json))->>'AISK[AISK4]') as isk_ein_4,
  ((cast(response AS json))->>'AISK[AISK5]') as isk_ein_5,
  ((cast(response AS json))->>'AISK[AISK6]') as isk_ein_6,
  ((cast(response AS json))->>'AISK[AISK7]') as isk_ein_7,
  ((cast(response AS json))->>'AISK[AISK8]') as isk_ein_8,
  ((cast(response AS json))->>'AISK[AISK9]') as isk_ein_9,
  ((cast(response AS json))->>'AISK[AIS10]') as isk_ein_10,
  ((cast(response AS json))->>'AISK[AIS11]') as isk_ein_11,
  ((cast(response AS json))->>'AISK[AIS12]') as isk_ein_12,
  ((cast(response AS json))->>'AISK[AIS13]') as isk_ein_13,
  ((cast(response AS json))->>'AISK[AIS14]') as isk_ein_14,
  ((cast(response AS json))->>'AISK[AIS15]') as isk_ein_15,
  ((cast(response AS json))->>'AISK[AIS16]') as isk_ein_16,
  ((cast(response AS json))->>'AISK[AIS17]') as isk_ein_17,
  ((cast(response AS json))->>'AISK[AIS18]') as isk_ein_18,
  ((cast(response AS json))->>'AISK[AIS19]') as isk_ein_19,
  ((cast(response AS json))->>'AISK[AIS20]') as isk_ein_20,
  ((cast(response AS json))->>'AISK[AIS21]') as isk_ein_21,
  ((cast(response AS json))->>'AISK[AIS22]') as isk_ein_22,
  ((cast(response AS json))->>'AISK[AIS23]') as isk_ein_23,
  ((cast(response AS json))->>'AISK[AIS24]') as isk_ein_24,
  ((cast(response AS json))->>'AISK[AIS25]') as isk_ein_25,
  ((cast(response AS json))->>'AISK[AIS26]') as isk_ein_26,
  ((cast(response AS json))->>'AISK[AIS27]') as isk_ein_27,
  ((cast(response AS json))->>'AISK[AIS28]') as isk_ein_28,
  ((cast(response AS json))->>'AISK[AIS29]') as isk_ein_29,
  ((cast(response AS json))->>'AISK[AIS30]') as isk_ein_30,
  ((cast(response AS json))->>'AISK[AIS31]') as isk_ein_31,
  ((cast(response AS json))->>'AISK[AIS32]') as isk_ein_32,
  ((cast(response AS json))->>'AISK[AIS33]') as isk_ein_33

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.isk'
AND ((cast(response AS json))->>'Erhebungszeitpunkt') = '1';
