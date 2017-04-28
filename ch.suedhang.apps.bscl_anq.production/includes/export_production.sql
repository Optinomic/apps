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
  patient,
  ((cast(response AS json))->>'id') as id_limesurvey,
  ((cast(response AS json))->>'Eintrittsort') as eintrittsort,
  ((cast(response AS json))->>'Austrittsort') as austrittsort,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'datestamp') as datestamp,
  NULL as lieferung_ab_hier,
  'PB' as rekordart,
  71286515 as betriebsnummer_bur,
  ((cast(response AS json))->>'FID') as fid_survey,
  ((cast(response AS json))->>'q501V04') as zeitpunkt_bscl,
  ((cast(response AS json))->>'q501V05') as dropoutcode_bscl,
  ((cast(response AS json))->>'q501V06') as spezifikation_dropout_bscl_andere,
  TO_CHAR(TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD'), 'YYYYMMDD')  as datum_erhebung_bscl,
  TO_CHAR((stay.start), 'YYYYMMDD') as Eintritt,
  TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date - stay.start::date as Differenz_Eintritt,
  TO_CHAR((stay.stop), 'YYYYMMDD') as Austritt,
  stay.stop::date - TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date as Differenz_Austritt,
  ((cast(response AS json))->>'BSCL[sq504V01]') as bscl_b1,
  ((cast(response AS json))->>'BSCL[sq504V02]') as bscl_b2,
  ((cast(response AS json))->>'BSCL[sq504V03]') as bscl_b3,
  ((cast(response AS json))->>'BSCL[sq504V04]') as bscl_b4,
  ((cast(response AS json))->>'BSCL[sq504V05]') as bscl_b5,
  ((cast(response AS json))->>'BSCL[sq504V06]') as bscl_b6,
  ((cast(response AS json))->>'BSCL[sq504V07]') as bscl_b7,
  ((cast(response AS json))->>'BSCL[sq504V08]') as bscl_b8,
  ((cast(response AS json))->>'BSCL[sq504V09]') as bscl_b9,
  ((cast(response AS json))->>'BSCL[sq504V10]') as bscl_b10,
  ((cast(response AS json))->>'BSCL[sq504V11]') as bscl_b11,
  ((cast(response AS json))->>'BSCL[sq504V12]') as bscl_b12,
  ((cast(response AS json))->>'BSCL[sq504V13]') as bscl_b13,
  ((cast(response AS json))->>'BSCL[sq504V14]') as bscl_b14,
  ((cast(response AS json))->>'BSCL[sq504V15]') as bscl_b15,
  ((cast(response AS json))->>'BSCL[sq504V16]') as bscl_b16,
  ((cast(response AS json))->>'BSCL[sq504V17]') as bscl_b17,
  ((cast(response AS json))->>'BSCL[sq504V18]') as bscl_b18,
  ((cast(response AS json))->>'BSCL[sq504V19]') as bscl_b19,
  ((cast(response AS json))->>'BSCL[sq504V20]') as bscl_b20,
  ((cast(response AS json))->>'BSCL[sq504V21]') as bscl_b21,
  ((cast(response AS json))->>'BSCL[sq504V22]') as bscl_b22,
  ((cast(response AS json))->>'BSCL[sq504V23]') as bscl_b23,
  ((cast(response AS json))->>'BSCL[sq504V24]') as bscl_b24,
  ((cast(response AS json))->>'BSCL[sq504V25]') as bscl_b25,
  ((cast(response AS json))->>'BSCL[sq504V26]') as bscl_b26,
  ((cast(response AS json))->>'BSCL[sq504V27]') as bscl_b27,
  ((cast(response AS json))->>'BSCL[sq504V28]') as bscl_b28,
  ((cast(response AS json))->>'BSCL[sq504V29]') as bscl_b29,
  ((cast(response AS json))->>'BSCL[sq504V30]') as bscl_b30,
  ((cast(response AS json))->>'BSCL[sq504V31]') as bscl_b31,
  ((cast(response AS json))->>'BSCL[sq504V32]') as bscl_b32,
  ((cast(response AS json))->>'BSCL[sq504V33]') as bscl_b33,
  ((cast(response AS json))->>'BSCL[sq504V34]') as bscl_b34,
  ((cast(response AS json))->>'BSCL[sq504V35]') as bscl_b35,
  ((cast(response AS json))->>'BSCL[sq504V36]') as bscl_b36,
  ((cast(response AS json))->>'BSCL[sq504V37]') as bscl_b37,
  ((cast(response AS json))->>'BSCL[sq504V38]') as bscl_b38,
  ((cast(response AS json))->>'BSCL[sq504V39]') as bscl_b39,
  ((cast(response AS json))->>'BSCL[sq504V40]') as bscl_b40,
  ((cast(response AS json))->>'BSCL[sq504V41]') as bscl_b41,
  ((cast(response AS json))->>'BSCL[sq504V42]') as bscl_b42,
  ((cast(response AS json))->>'BSCL[sq504V43]') as bscl_b43,
  ((cast(response AS json))->>'BSCL[sq504V44]') as bscl_b44,
  ((cast(response AS json))->>'BSCL[sq504V45]') as bscl_b45,
  ((cast(response AS json))->>'BSCL[sq504V46]') as bscl_b46,
  ((cast(response AS json))->>'BSCL[sq504V47]') as bscl_b47,
  ((cast(response AS json))->>'BSCL[sq504V48]') as bscl_b48,
  ((cast(response AS json))->>'BSCL[sq504V49]') as bscl_b49,
  ((cast(response AS json))->>'BSCL[sq504V50]') as bscl_b50,
  ((cast(response AS json))->>'BSCL[sq504V51]') as bscl_b51,
  ((cast(response AS json))->>'BSCL[sq504V52]') as bscl_b52,
  ((cast(response AS json))->>'BSCL[sq504V53]') as bscl_b53


FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id)
WHERE module = 'ch.suedhang.apps.bscl_anq.production' AND ((cast(response AS json))->>'q501V04') != '3';

/*
CASE WHEN ((cast(response AS json))->>'VNEB066') = '999' THEN '-1' WHEN ((cast(response AS json))->>'VNEB066') = '1' THEN 'SYSMIS' ELSE ((cast(response AS json))->>'VNEB066') END as vneb066,
 
, CASE  WHEN (((cast(response AS json))->>'q501V04') == '1') 
          AND (TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date - stay.start::date) > 2 
          AND (TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date - stay.start::date) < 0 
        THEN TO_CHAR((stay.start), 'YYYYMMDD')  
        WHEN (((cast(response AS json))->>'q501V04') == '2')
          AND (stay.stop::date - TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date) > 2 
          AND (stay.stop::date - TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD')::date) < 0 
        THEN TO_CHAR((stay.stop), 'YYYYMMDD')
        ELSE TO_CHAR(TO_DATE(((cast(response AS json))->>'q504V00'), 'YYYY-MM-DD'), 'YYYYMMDD')
        END as Erhebung
*/