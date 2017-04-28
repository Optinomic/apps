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
  ((cast(response AS json))->>'PID') as pid,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD')  as datum,
  ((cast(response AS json))->>'DauerAbh') as Abhaengigkeitsdauer,
  ((cast(response AS json))->>'statEnzug') as statEntgiftungen,
  ((cast(response AS json))->>'ambEntzugMedi') as ambEntgiftungen,
  ((cast(response AS json))->>'Craving') as Craving,
  ((cast(response AS json))->>'statEntwoehnung') as statEntwoehnung,
  ((cast(response AS json))->>'ambEntwoehnung') as ambEntwoehnung,
  ((cast(response AS json))->>'Abbrueche') as Therapieabbrueche,
  ((cast(response AS json))->>'Rueckfaelle') as Rueckfaelle,
  ((cast(response AS json))->>'Leber') as Leberschaeden,
  ((cast(response AS json))->>'Somat') as SomatSchaeden,
  ((cast(response AS json))->>'Neurol') as NeurologSchaeden,
  ((cast(response AS json))->>'Psych') as PsychSchaeden,
  ((cast(response AS json))->>'Arbeitslos') as Arbeitslos,
  ((cast(response AS json))->>'Wohnen') as Wohnungslos,
  ((cast(response AS json))->>'Allein') as Alleinstehend,
  ((cast(response AS json))->>'Alter') as U40,
  ((cast(response AS json))->>'Kontrollv') as Kontrollverlust,
  ((cast(response AS json))->>'MorgenTr') as MorgenTrinken,
  ((cast(response AS json))->>'posErw') as posErwartungen,
  ((cast(response AS json))->>'AbstZuv') as ZuvDefAbstinenz,
  ((cast(response AS json))->>'AbstMot') as AbstMotFehlt  

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.case.production'
AND survey_response_view.patient_id != '1169'
AND survey_response_view.patient_id != '387'
AND survey_response_view.patient_id != '1';


