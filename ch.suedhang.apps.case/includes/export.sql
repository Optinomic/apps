SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox
  
  ((cast(response AS json))->>'DauerAbh') as Abhängigkeitsdauer,
  ((cast(response AS json))->>'statEnzug') as statEntgiftungen,
  ((cast(response AS json))->>'ambEntzugMedi') as ambEntgiftungen,
  ((cast(response AS json))->>'Craving') as Craving,
  ((cast(response AS json))->>'statEntwoehnung') as statEntwöhnung,
  ((cast(response AS json))->>'ambEntwoehnung') as ambEntwöhnung,
  ((cast(response AS json))->>'Abbrueche') as Therapieabbrüche,
  ((cast(response AS json))->>'Rueckfaelle') as Rückfälle,
  ((cast(response AS json))->>'Leber') as Leberschäden,
  ((cast(response AS json))->>'Somat') as SomatSchäden,
  ((cast(response AS json))->>'Neurol') as NeurologSchäden,
  ((cast(response AS json))->>'Psych') as PsychSchäden,
  ((cast(response AS json))->>'Arbeitslos') as Arbeitslos,
  ((cast(response AS json))->>'Wohnen') as Wohnungslos,
  ((cast(response AS json))->>'Allein') as Alleinstehend,
  ((cast(response AS json))->>'Alter') as U40,
  ((cast(response AS json))->>'Kontrollv') as Kontrollverlust,
  ((cast(response AS json))->>'MorgenTr') as MorgenTrinken,
  ((cast(response AS json))->>'posErw') as posErwartungen,
  ((cast(response AS json))->>'AbstZuv') as ZuvDefAbstinenz,
  ((cast(response AS json))->>'AbstMot') as AbstMotFehlt,

  ((cast(response AS json))->>'filled') as datum,
  TO_DATE(((cast(response AS json))->>'filled'), 'YYYY-MM-DD HH24:MI:SS')  as datum_date,
  SUBSTRING(((cast(response AS json))->>'filled'),12,5) AS datum_time,
  SUBSTRING(((cast(response AS json))->>'filled'),1,4)::integer AS datum_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'filled'), 'YYYY-MM-DD HH24:MI:SS')) AS datum_week,

  ((cast(response AS json))->>'FID') as fid,
  ((cast(response AS json))->>'PID') as pid,
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
  

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.caseV2';

