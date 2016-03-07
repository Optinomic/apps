SELECT 
  patient.id 
, ((cast(response AS json))->>'FID') as FID
, ((cast(response AS json))->>'Messzeitpunkt') as Messzeitpunkt
, ((cast(response AS json))->>'Date') as Datum
, ((cast(response AS json))->>'TMTATime') as TMT_A_Zeit
, ((cast(response AS json))->>'TMTAError') as TMT_A_Fehler
, ((cast(response AS json))->>'TMTBTime') as TMT_B_Zeit
, ((cast(response AS json))->>'TMTBError') as TMT_B_Fehler
, ((cast(response AS json))->>'quotient') as Quotient
, ((cast(response AS json))->>'AzWert') as zWert_TMT_A
, ((cast(response AS json))->>'BzWert') as zWert_TMT_B

FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
WHERE module = 'ch.suedhang.apps.tmt'