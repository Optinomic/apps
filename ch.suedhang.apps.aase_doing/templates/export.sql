SELECT 
  patient.id 
, patient.last_name 
, ((cast(response AS json))->>'FID') / 100 as FID
, ((cast(response AS json))->>'Erhebungszeitpunkt') as Erhebungszeitpunkt
, ((cast(response AS json))->>'Datum') as Datum
, ((cast(response AS json))->>'AASE_AASE1') as AASE1
, ((cast(response AS json))->>'AASE_AASE2') as AASE2
, ((cast(response AS json))->>'AASE_AASE3') as AASE3
, ((cast(response AS json))->>'AASE_AASE4') as AASE4
, ((cast(response AS json))->>'AASE_AASE5') as AASE5
, ((cast(response AS json))->>'AASE_AASE6') as AASE6
, ((cast(response AS json))->>'AASE_AASE7') as AASE7
, ((cast(response AS json))->>'AASE_AASE8') as AASE8
, ((cast(response AS json))->>'AASE_AASE9') as AASE9
, ((cast(response AS json))->>'AASE_AASE10') as AASE10
, ((cast(response AS json))->>'AASE_AASE11') as AASE11
, ((cast(response AS json))->>'AASE_AASE12') as AASE12
, ((cast(response AS json))->>'AASE_AASE13') as AASE13
, ((cast(response AS json))->>'AASE_AASE14') as AASE14
, ((cast(response AS json))->>'AASE_AASE15') as AASE15
, ((cast(response AS json))->>'AASE_AASE16') as AASE16
, ((cast(response AS json))->>'AASE_AASE17') as AASE17
, ((cast(response AS json))->>'AASE_AASE18') as AASE18
, ((cast(response AS json))->>'AASE_AASE19') as AASE19
, ((cast(response AS json))->>'AASE_AASE20') as AASE20
FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id)
WHERE module = 'ch.suedhang.apps.aase'