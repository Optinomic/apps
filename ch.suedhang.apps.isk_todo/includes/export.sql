SELECT 
  patient.id
, ((cast(response AS json))->>'FID') as FID
, ((cast(response AS json))->>'Erhebungszeitpunkt') as Erhebungszeitpunkt
, ((cast(response AS json))->>'Datum') as Datum
, ((cast(response AS json))->>'AISK_AISK1') as ISK1
, ((cast(response AS json))->>'AISK_AISK2') as ISK2
, ((cast(response AS json))->>'AISK_AISK3') as ISK3
, ((cast(response AS json))->>'AISK_AISK4') as ISK4
, ((cast(response AS json))->>'AISK_AISK5') as ISK5
, ((cast(response AS json))->>'AISK_AISK6') as ISK6
, ((cast(response AS json))->>'AISK_AISK7') as ISK7
, ((cast(response AS json))->>'AISK_AISK8') as ISK8
, ((cast(response AS json))->>'AISK_AISK9') as ISK9
, ((cast(response AS json))->>'AISK_AIS10') as ISK10
, ((cast(response AS json))->>'AISK_AIS11') as ISK11
, ((cast(response AS json))->>'AISK_AIS12') as ISK12
, ((cast(response AS json))->>'AISK_AIS13') as ISK13
, ((cast(response AS json))->>'AISK_AIS14') as ISK14
, ((cast(response AS json))->>'AISK_AIS15') as ISK15
, ((cast(response AS json))->>'AISK_AIS16') as ISK16
, ((cast(response AS json))->>'AISK_AIS17') as ISK17
, ((cast(response AS json))->>'AISK_AIS18') as ISK18
, ((cast(response AS json))->>'AISK_AIS19') as ISK19
, ((cast(response AS json))->>'AISK_AIS20') as ISK20
, ((cast(response AS json))->>'AISK_AIS21') as ISK21
, ((cast(response AS json))->>'AISK_AIS22') as ISK22
, ((cast(response AS json))->>'AISK_AIS23') as ISK23
, ((cast(response AS json))->>'AISK_AIS24') as ISK24
, ((cast(response AS json))->>'AISK_AIS25') as ISK25
, ((cast(response AS json))->>'AISK_AIS26') as ISK26
, ((cast(response AS json))->>'AISK_AIS27') as ISK27
, ((cast(response AS json))->>'AISK_AIS28') as ISK28
, ((cast(response AS json))->>'AISK_AIS29') as ISK29
, ((cast(response AS json))->>'AISK_AIS30') as ISK30
, ((cast(response AS json))->>'AISK_AIS31') as ISK31
, ((cast(response AS json))->>'AISK_AIS32') as ISK32
, ((cast(response AS json))->>'AISK_AIS33') as ISK33
FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
WHERE module = 'ch.suedhang.apps.isk'