SELECT 
  patient.id 
, patient.last_name 
, ((cast(response AS json))->>'FID') as FID
, ((cast(response AS json))->>'Erhebungszeitpunkt') as Erhebungszeitpunkt
, ((cast(response AS json))->>'Datum') as Datum
, ((cast(response AS json))->>'BDI1') as BDI1
, ((cast(response AS json))->>'BDI2') as BDI2
, ((cast(response AS json))->>'BDI3') as BDI3
, ((cast(response AS json))->>'BDI4') as BDI4
, ((cast(response AS json))->>'BDI5') as BDI5
, ((cast(response AS json))->>'BDI6') as BDI6
, ((cast(response AS json))->>'BDI7') as BDI7
, ((cast(response AS json))->>'BDI8') as BDI8
, ((cast(response AS json))->>'BDI9') as BDI9
, ((cast(response AS json))->>'BDI10') as BDI10
, ((cast(response AS json))->>'BDI11') as BDI11
, ((cast(response AS json))->>'BDI12') as BDI12
, ((cast(response AS json))->>'BDI13') as BDI13
, ((cast(response AS json))->>'BDI14') as BDI14
, ((cast(response AS json))->>'BDI15') as BDI15
, ((cast(response AS json))->>'BDI16') as BDI16
, ((cast(response AS json))->>'BDI17') as BDI17
, ((cast(response AS json))->>'BDI18') as BDI18
, ((cast(response AS json))->>'BDI19') as BDI19
, ((cast(response AS json))->>'BDI20') as BDI20
, ((cast(response AS json))->>'BDI21') as BDI21
, ((cast(response AS json))->>'BDI_Score') as BDI_Summe

FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
WHERE module = 'ch.suedhang.apps.bdi'