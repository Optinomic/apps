SELECT 
patient
, survey_response.patient
, patient.cis_pid
, ((cast(response AS json))->>'id') as ID_Limesurvey
, ((cast(response AS json))->>'PID') as PID_Limesurvey
, 'PH' as Rekordart
, 71286515 as BUR_Nummer
, ((cast(response AS json))->>'FID') as FID_Limesurvey
, ((cast(response AS json))->>'q401V04') as Messzeitpunkt
, ((cast(response AS json))->>'q401V05') as Dropoutgrund
, ((cast(response AS json))->>'q401V06') as anderer_Grund
, ((cast(response AS json))->>'q402V00') as Datum
, ((cast(response AS json))->>'H1[402V01]') as H1
, ((cast(response AS json))->>'H2[402V02]') as H2
, ((cast(response AS json))->>'H3[402V03]') as H3
, ((cast(response AS json))->>'H4[402V04]') as H4
, ((cast(response AS json))->>'H5[402V05]') as H5
, ((cast(response AS json))->>'H6[402V06]') as H6
, ((cast(response AS json))->>'H7[402V07]') as H7
, ((cast(response AS json))->>'H8[402V08]') as H8
, ((cast(response AS json))->>'H8a') as H8a
, ((cast(response AS json))->>'H8b') as H8b
, ((cast(response AS json))->>'H9[402V11]') as H9
, ((cast(response AS json))->>'H10[402V12]') as H10
, ((cast(response AS json))->>'H11[402V13]') as H11
, ((cast(response AS json))->>'H12[402V14]') as H12
,  TO_DATE(((cast(response AS json))->>'q402V00'), 'YYYY-MM-DD HH24:MI:SS')  as Datum_Datumsformat
FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 