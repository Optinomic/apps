-- Just for TESTING / DEV - Export Toolbox --

SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox


  CASE WHEN ((stay.stop IS NULL) AND (stay.start NOT BETWEEN '2015-01-01' AND '2015-12-31')) THEN 'D1' ELSE CASE WHEN ((stay.stop IS NULL) AND (stay.start BETWEEN '2015-01-01' AND '2015-12-31')) THEN 'D2' ELSE CASE WHEN (stay.start IS NULL AND stay.stop IS NULL) THEN '?' ELSE 
    CASE WHEN (stay.start BETWEEN '2015-01-01' AND '2015-12-31') THEN 
       CASE WHEN (stay.stop BETWEEN '2015-01-01' AND '2015-12-31') THEN 'A1' ELSE 'B' END
       ELSE 
       CASE WHEN (stay.stop BETWEEN '2015-01-01' AND '2015-12-31') THEN 'A2' ELSE 'C' END
       END 
  END END END as optinomic_falltyp,


  -- Add whatever you need here
  ((cast(response AS json))->>'Institution') as institution,
  ((cast(response AS json))->>'VZEX005') as vzex005,
  ((cast(response AS json))->>'VMEB001') as vmeb001,
  ((cast(response AS json))->>'VMEB005') as vmeb005,
  patient.four_letter_code as VMEB010,
  CASE WHEN ((cast(response AS json))->>'VNEB050[VNEB050a]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'VNEB050[VNEB050a]') END as vneb050_vneb050a,
  CASE WHEN ((cast(response AS json))->>'VNEB050[VNEB050b]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'VNEB050[VNEB050b]') END as vneb050_vneb050b,
  CASE WHEN ((cast(response AS json))->>'VNEB050[VNEB050c]') = 'Y' THEN '1' ELSE ((cast(response AS json))->>'VNEB050[VNEB050c]') END as vneb050_vneb050c



FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.actinfo_ein' 


AND survey_response_view.filled BETWEEN '2015-01-01' AND '2015-12-31'
