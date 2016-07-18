SELECT
 patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,

  ((cast(response AS json))->>'FNr') as fnr,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'Institution'), CASE WHEN '333' THEN '31') as institution,
  ((cast(response AS json))->>'VZEX005') as vzex005,
  ((cast(response AS json))->>'VMEB001') as vmeb001,
  ((cast(response AS json))->>'VMEB005') as vmeb005,
  NULL as VMEB006,
  patient.four_letter_code as VMEB010,
  ((cast(response AS json))->>'VMEB040a') as vmeb040a,
  ((cast(response AS json))->>'VMEB040d') as vmeb040d,
  NULL as VMEB040g,

, recode_into(((cast(response AS json))->>'VNEB050_VNEB050x'), CASE WHEN 'Y' THEN '1') as VNEB050x 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050y'), 'Y', '1') as vneb050y 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050a'), 'Y', '1') as vneb050a 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050b'), 'Y', '1') as vneb050b 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050c'), 'Y', '1') as vneb050c 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050d'), 'Y', '1') as vneb050d 
, recode_into(((cast(response AS json))->>'VNEB050_VNEB050e'), 'Y', '1') as vneb050e 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060x'), 'Y', '1') as VNEB060x 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060a'), 'Y', '1') as vneb060a 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060b'), 'Y', '1') as vneb060b 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060c'), 'Y', '1') as vneb060c 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060d'), 'Y', '1') as vneb060d 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060e'), 'Y', '1') as vneb060e 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060f'), 'Y', '1') as vneb060f 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060g'), 'Y', '1') as vneb060g 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060h'), 'Y', '1') as vneb060h 
, recode_into(((cast(response AS json))->>'VNEB060_VNEB060i'), 'Y', '1') as vneb060i 

  NULL as VMEB061,

, recode_into(((cast(response AS json))->>'VNEB065'), '999', '-1') as vneb065
, recode_into(recode_into(((cast(response AS json))->>'VNEB066'), '999', '-1'), '1', 'SYSMIS') as vneb066

  ((cast(response AS json))->>'VNEB067') as vneb067,

, recode_into(((cast(response AS json))->>'VYEE010'), '999', '-1') as vyee010
, recode_into(((cast(response AS json))->>'QYEE020_VYEE020x'), 'Y', '1') as VYEE020x
, recode_into(((cast(response AS json))->>'QYEE020_VYEE020a'), 'Y', '1') as vyee020a
, recode_into(((cast(response AS json))->>'QYEE020_VYEE020b'), 'Y', '1') as vyee020b
, recode_into(((cast(response AS json))->>'QYEE020_VYEE020c'), 'Y', '1') as vyee020c
, recode_into(((cast(response AS json))->>'QYEE020_VYEE020d'), 'Y', '1') as vyee020d

  ((cast(response AS json))->>'QZEE025') as vzee025,

, recode_into(((cast(response AS json))->>'VYEE040'), '999', '-1') as vyee040

  ((cast(response AS json))->>'VZEE041') as vzee041,

, recode_into(((cast(response AS json))->>'VZEE050'), '999', '-1') as vzee050
, recode_into(((cast(response AS json))->>'VNEB080'), '999', '-1') as vneb080

  ((cast(response AS json))->>'VMEB081') as vmeb081,

  CASE WHEN patient.gender='Male' THEN '1' ELSE '2' as VMEC010
, recode_into(recode_into(patient.gender, 'Male', '1'), 'Female', '2') as VMEC010

  patient.birthdate as VMEC020,
  NULL as VMEC021,
  ((cast(response AS json))->>'VMEC030a') as vmec030a,
  NULL as vmec030b,
  NULL as vmec030c,
  NULL as vmec030d,
  NULL as vmec030e,

, recode_into(((cast(response AS json))->>'VMEC040'), '999', '-1') as vmec040
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050yy'), 'Y', '1') as VNEC050yy
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050ch'), 'Y', '1') as VNEC050ch
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050al'), 'Y', '1') as VNEC050al
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050dz'), 'Y', '1') as VNEC050dz
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050de'), 'Y', '1') as VNEC050de
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050at'), 'Y', '1') as VNEC050at
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050ba'), 'Y', '1') as VNEC050ba
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050br'), 'Y', '1') as VNEC050br
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050ca'), 'Y', '1') as VNEC050ca
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050hr'), 'Y', '1') as VNEC050hr
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050es'), 'Y', '1') as VNEC050es
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050us'), 'Y', '1') as VNEC050us
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050fr'), 'Y', '1') as VNEC050fr
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050gb'), 'Y', '1') as VNEC050gb
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050gr'), 'Y', '1') as VNEC050gr
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050hu'), 'Y', '1') as VNEC050hu
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050it'), 'Y', '1') as VNEC050it
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050xk'), 'Y', '1') as VNEC050xk
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050mk'), 'Y', '1') as VNEC050mk

  NULL as VNEC050ms,

, recode_into(((cast(response AS json))->>'QNEC050_VNEC050me'), 'Y', '1') as VNEC050me
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050nl'), 'Y', '1') as VNEC050nl
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050pt'), 'Y', '1') as VNEC050pt
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050rs'), 'Y', '1') as VNEC050rs
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050lk'), 'Y', '1') as VNEC050lk
, recode_into(((cast(response AS json))->>'QNEC050_VNEC050tr'), 'Y', '1') as VNEC050tr
, recode_into(((cast(response AS json))->>'VNEC050x'), 'Y', '1') as VNEC050x

, recode_into(((cast(response AS json))->>'QNEC060QNEC065_VNEC060'), '999', '-1') as vnec060

  ((cast(response AS json))->>'VMEC061') as vmec061,

, recode_into(((cast(response AS json))->>'QNEC060QNEC065_VNEC065'), '999', '-1') as vnec065

  ((cast(response AS json))->>'VMEC066') as vmec066,

, recode_into(((cast(response AS json))->>'VNEC067'), '999', '-1') as vnec067
, recode_into(((cast(response AS json))->>'VNEC068'), '999', '-1') as vnec068
, recode_into(((cast(response AS json))->>'QNEC070QNEC075_VNEC070'), '999', '-1') as vnec070
, recode_into(((cast(response AS json))->>'QNEC070QNEC075_VNEC075'), '999', '-1') as vnec075
, recode_into(((cast(response AS json))->>'VZES010'), '999', '-1') as vzes010
, recode_into(((cast(response AS json))->>'VZES015'), '999', '-1') as vzes015
, recode_into(((cast(response AS json))->>'VZES020'), '999', '-1') as vzes020
, recode_into(((cast(response AS json))->>'VZES050'), '999', '-1') as vzes050
, recode_into(((cast(response AS json))->>'QZES060QZES070_VZES060'), '999', '-1') as vzes060
, recode_into(((cast(response AS json))->>'QZES060QZES070_VZES070'), '999', '-1') as vzes070
, recode_into(((cast(response AS json))->>'QZES080_VZES080x'), 'Y', '1') as VZES080x
, recode_into(((cast(response AS json))->>'QZES080_VZES080y'), 'Y', '1') as vzes080y
, recode_into(((cast(response AS json))->>'QZES080_VZES080a'), 'Y', '1') as vzes080a
, recode_into(((cast(response AS json))->>'QZES080_VZES080b'), 'Y', '1') as vzes080b
, recode_into(((cast(response AS json))->>'QZES080_VZES080c'), 'Y', '1') as vzes080c
, recode_into(((cast(response AS json))->>'QZES080_VZES080d'), 'Y', '1') as vzes080d

  ((cast(response AS json))->>'VZES081') as vzes081,

, recode_into(((cast(response AS json))->>'QNEC080QNEC090_VNEC080'), '999', '-1') as vnec080

  ((cast(response AS json))->>'VMEC081') as vmec081,

, recode_into(((cast(response AS json))->>'QNEC080QNEC090_VNEC090'), '999', '-1') as vnec090

  ((cast(response AS json))->>'VMEC091') as vmec091,

, recode_into(((cast(response AS json))->>'QNEC100QNEC110_VNEC100'), '999', '-1') as vnec100

  ((cast(response AS json))->>'VMEC101') as vmec101,

, recode_into(((cast(response AS json))->>'QNEC100QNEC110_VNEC110'), '999', '-1') as vnec110

  ((cast(response AS json))->>'VMEC111') as vmec111,

, recode_into(((cast(response AS json))->>'VYEF010'), '999', '-1') as vyef010

  ((cast(response AS json))->>'VZEF011') as vzef011,

, recode_into(((cast(response AS json))->>'QNEC120_VNEC120x'), 'Y', '1') as VNEC120x
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120y'), 'Y', '1') as VNEC120y
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120a'), 'Y', '1') as VNEC120a
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120b'), 'Y', '1') as VNEC120b
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120c'), 'Y', '1') as VNEC120c
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120d'), 'Y', '1') as VNEC120d
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120e'), 'Y', '1') as VNEC120e
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120f'), 'Y', '1') as VNEC120f
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120g'), 'Y', '1') as VNEC120g
, recode_into(((cast(response AS json))->>'QNEC120_VNEC120h'), 'Y', '1') as VNEC120h
, recode_into(((cast(response AS json))->>'VZEF030'),'999', '-1') as vzef030
, recode_into(((cast(response AS json))->>'VYEF040'), '999', '-1') as vyef040
, recode_into(((cast(response AS json))->>'QNED0701_VNED070a'), 'Y', '1') as vneD070a
, recode_into(((cast(response AS json))->>'QNED0702_VNED070ba'), 'Y', '1') as vneD070ba
, recode_into(((cast(response AS json))->>'QNED0702_VNED070bb'), 'Y', '1') as vneD070bb
, recode_into(((cast(response AS json))->>'QNED0702_VNeD070bc'), 'Y', '1') as vneD070bc
, recode_into(((cast(response AS json))->>'QNED0702_VNED070bd'), 'Y', '1') as vneD070bd
, recode_into(((cast(response AS json))->>'QNED0702_VNED070be'), 'Y', '1') as vneD070be
, recode_into(((cast(response AS json))->>'QNED0703_VNED070ca'), 'Y', '1') as vneD070ca
, recode_into(((cast(response AS json))->>'QNED0703_VNED070cb'), 'Y', '1') as vneD070cb
, recode_into(((cast(response AS json))->>'QNED0703_VNED070cc'), 'Y', '1') as vneD070cc
, recode_into(((cast(response AS json))->>'QNED0704_VNED070da'), 'Y', '1') as vneD070da
, recode_into(((cast(response AS json))->>'QNED0704_VNED070db'), 'Y', '1') as vneD070db
, recode_into(((cast(response AS json))->>'QNED0704_VNED070dc'), 'Y', '1') as vneD070dc
, recode_into(((cast(response AS json))->>'QNED0704_VNED070dd'), 'Y', '1') as vneD070dd
, recode_into(((cast(response AS json))->>'QNED0704_VNED070de'), 'Y', '1') as vneD070de
, recode_into(((cast(response AS json))->>'QNED0705_VNED070ea'), 'Y', '1') as vneD070ea
, recode_into(((cast(response AS json))->>'QNED0705_VNED070eb'), 'Y', '1') as vneD070eb
, recode_into(((cast(response AS json))->>'QNED0705_VNED070ec'), 'Y', '1') as vneD070ec
, recode_into(((cast(response AS json))->>'QNED0705_VNED070ed'), 'Y', '1') as vneD070ed
, recode_into(((cast(response AS json))->>'QNED0706_VNED070fa'), 'Y', '1') as vneD070fa
, recode_into(((cast(response AS json))->>'QNED0706_VNED070fb'), 'Y', '1') as vneD070fb
, recode_into(((cast(response AS json))->>'QNED0706_VNED070fc'), 'Y', '1') as vneD070fc
, recode_into(((cast(response AS json))->>'QNED0707_VNED070g'), 'Y', '1') as vneD070g
, recode_into(((cast(response AS json))->>'QNED0707_VNED070h'), 'Y', '1') as vneD070h
, recode_into(((cast(response AS json))->>'QNED0707_VNED070i'), 'Y', '1') as vneD070i
, recode_into(((cast(response AS json))->>'QNED0707_VNED070j'), 'Y', '1') as vneD070j
, recode_into(((cast(response AS json))->>'QNED0708_VNED070ka'), 'Y', '1') as vneD070ka
, recode_into(((cast(response AS json))->>'QNED0708_VNED070kb'), 'Y', '1') as vneD070kb
, recode_into(((cast(response AS json))->>'QNED0708_VNED070kc'), 'Y', '1') as vneD070kc
, recode_into(((cast(response AS json))->>'QNED0708_VNED070kd'), 'Y', '1') as vneD070kd
, recode_into(((cast(response AS json))->>'VNED070x'), '999', '-1') as VNED070x


  ((cast(response AS json))->>'VNED071be') as vned071be,
  ((cast(response AS json))->>'VNED071cc') as vned071cc,
  ((cast(response AS json))->>'VNED071de') as vned071de,
  ((cast(response AS json))->>'VNED071ed') as vned071ed,
  ((cast(response AS json))->>'VNED071fc') as vned071fc,
  ((cast(response AS json))->>'VNED071j') as vned071j,
  ((cast(response AS json))->>'VNED071kd') as vned071kd,

, recode_into(((cast(response AS json))->>'VNED073a'), '999', '-1') as vned073a
, recode_into(((cast(response AS json))->>'VNED073ba'), '999', '-1') as vned073ba
, recode_into(((cast(response AS json))->>'VNED073bb'), '999', '-1') as vned073bb
, recode_into(((cast(response AS json))->>'VNED073bc'), '999', '-1') as vned073bc
, recode_into(((cast(response AS json))->>'VNED073bd'), '999', '-1') as vned073bd
, recode_into(((cast(response AS json))->>'VNED073be'), '999', '-1') as vned073be
, recode_into(((cast(response AS json))->>'VNED073ca'), '999', '-1') as vned073ca
, recode_into(((cast(response AS json))->>'VNED073cb'), '999', '-1') as vned073cb
, recode_into(((cast(response AS json))->>'VNED073cc'), '999', '-1') as vned073cc
, recode_into(((cast(response AS json))->>'VNED073da'), '999', '-1') as vned073da
, recode_into(((cast(response AS json))->>'VNED073db'), '999', '-1') as vned073db
, recode_into(((cast(response AS json))->>'VNED073dc'), '999', '-1') as vned073dc
, recode_into(((cast(response AS json))->>'VNED073dd'), '999', '-1') as vned073dd
, recode_into(((cast(response AS json))->>'VNED073de'), '999', '-1') as vned073de
, recode_into(((cast(response AS json))->>'VNED073ea'), '999', '-1') as vned073ea
, recode_into(((cast(response AS json))->>'VNED073eb'), '999', '-1') as vned073eb
, recode_into(((cast(response AS json))->>'VNED073ec'), '999', '-1') as vned073ec
, recode_into(((cast(response AS json))->>'VNED073ed'), '999', '-1') as vned073ed
, recode_into(((cast(response AS json))->>'VNED073fa'), '999', '-1') as vned073fa
, recode_into(((cast(response AS json))->>'VNED073fb'), '999', '-1') as vned073fb
, recode_into(((cast(response AS json))->>'VNED073fc'), '999', '-1') as vned073fc
, recode_into(((cast(response AS json))->>'VNED073g'), '999', '-1') as vned073g
, recode_into(((cast(response AS json))->>'VNED073h'), '999', '-1') as vned073h
, recode_into(((cast(response AS json))->>'VNED073i'), '999', '-1') as vned073i
, recode_into(((cast(response AS json))->>'VNED073j'), '999', '-1') as vned073j
, recode_into(((cast(response AS json))->>'VNED073ka'), '999', '-1') as vned073ka
, recode_into(((cast(response AS json))->>'VNED073kb'), '999', '-1') as vned073kb
, recode_into(((cast(response AS json))->>'VNED073kc'), '999', '-1') as vned073kc
, recode_into(((cast(response AS json))->>'VNED073kd'), '999', '-1') as vned073kd
, recode_into(((cast(response AS json))->>'QYED075_VYED075a'), '999', 'SYSMIS') as VYED075a
, recode_into(((cast(response AS json))->>'QYED075_VYED075b'), '999', 'SYSMIS') as VYED075b
, recode_into(((cast(response AS json))->>'QYED075_VYED075c'), '999', 'SYSMIS') as VYED075c
, recode_into(((cast(response AS json))->>'QYED075_VYED075d'), '999', 'SYSMIS') as VYED075d
, recode_into(((cast(response AS json))->>'QYED075_VYED075e'), '999', 'SYSMIS') as VYED075e
, recode_into(((cast(response AS json))->>'QYED075_VYED075f'), '999', 'SYSMIS') as VYED075f
, recode_into(((cast(response AS json))->>'QYED075_VYED075g'), '999', 'SYSMIS') as VYED075g
, recode_into(((cast(response AS json))->>'QYED075_VYED075h'), '999', 'SYSMIS') as VYED075h
, recode_into(((cast(response AS json))->>'QYED075_VYED075i'), '999', 'SYSMIS') as VYED075i
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075a'), '999', '-1') as VYED076a
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075b'), '999', '-1') as VYED076b
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075c'), '999', '-1') as VYED076c
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075d'), '999', '-1') as VYED076d
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075e'), '999', '-1') as VYED076e
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075f'), '999', '-1') as VYED076f
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075g'), '999', '-1') as VYED076g
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075h'), '999', '-1') as VYED076h
, recode_into_null(((cast(response AS json))->>'QYED075_VYED075i'), '999', '-1') as VYED076i
, recode_into(((cast(response AS json))->>'VNED010'), '999', '-1') as vned010
, recode_into(((cast(response AS json))->>'VNED015'), '999', '-1') as vned015
, recode_into(((cast(response AS json))->>'QNED016_VNED016x'), 'Y', '1') as VNED016x
, recode_into(((cast(response AS json))->>'QNED016_VNED016a'), 'Y', '1') as vned016a
, recode_into(((cast(response AS json))->>'QNED016_VNED016b'), 'Y', '1') as vned016b
, recode_into(((cast(response AS json))->>'QNED016_VNED016c'), 'Y', '1') as vned016c
, recode_into(((cast(response AS json))->>'QNED016_VNED016d'), 'Y', '1') as vned016d
, recode_into(((cast(response AS json))->>'QNED016_VNED016e'), 'Y', '1') as vned016e
, recode_into(((cast(response AS json))->>'QNED016_VNED016f'), 'Y', '1') as vned016f
, recode_into(((cast(response AS json))->>'QNED016_VNED016g'), 'Y', '1') as vned016g
, recode_into(((cast(response AS json))->>'QNED016_VNED016h'), 'Y', '1') as vned016h
, recode_into(((cast(response AS json))->>'QNED016_VNED016i'), 'Y', '1') as vned016i
, recode_into(((cast(response AS json))->>'QNED016_VNED016j'), 'Y', '1') as vned016j
, recode_into(((cast(response AS json))->>'VNED025'), '999', '-1') as vned025
, recode_into(((cast(response AS json))->>'VNED030'), '999', '-1') as vned030

  ((cast(response AS json))->>'VNED031') as vned031,

, recode_into(((cast(response AS json))->>'VMED040'), '999', 'SYSMIS') as VMED040
, recode_into_null(((cast(response AS json))->>'VMED040'), '999', '-1') as VMED041
, recode_into(((cast(response AS json))->>'VMED050'), '999', 'SYSMIS') as VMED050
, recode_into_null(((cast(response AS json))->>'VMED050'), '999', '-1') as VMED051
, recode_into(((cast(response AS json))->>'VMED060'), '999', 'SYSMIS') as VMED060
, recode_into_null(((cast(response AS json))->>'VMED060'), '999', '-1') as VMED061
, recode_into(((cast(response AS json))->>'VZEO010'), '999', '-1') as vzeo010

  ((cast(response AS json))->>'VZEO011') as vzeo011,

, recode_into(((cast(response AS json))->>'VNED026'), '999', '-1') as vned026

  ((cast(response AS json))->>'VMED045') as vmed045,

, recode_into(recode_into(((cast(response AS json))->>'VMED046'), '999', '-1'), '1', 'SYSMIS') as VMED046

  ((cast(response AS json))->>'VMED055') as vmed055,

, recode_into(recode_into(((cast(response AS json))->>'VMED056'), '999', '-1'), '1', 'SYSMIS') as VMED056

  ((cast(response AS json))->>'VMED065') as vmed065,

, recode_into(recode_into(((cast(response AS json))->>'VMED066'), '999', '-1'), '1', 'SYSMIS') as VMED066
, recode_into(((cast(response AS json))->>'VZEA010'), '999', '-1') as vzea010
, recode_into(((cast(response AS json))->>'VZEA020'), '999', '-1') as vzea020
, recode_into(((cast(response AS json))->>'VZEA030'), '999', '-1') as vzea030
, recode_into(((cast(response AS json))->>'VZEA040'), '999', '-1') as vzea040
, recode_into(((cast(response AS json))->>'VZEA050'), '999', '-1') as vzea050
, recode_into(((cast(response AS json))->>'VZEA060'), '999', '-1') as vzea060
, recode_into(((cast(response AS json))->>'VZEA070'), '999', '-1') as vzea070
, recode_into(((cast(response AS json))->>'VZEA080'), '999', '-1') as vzea080
, recode_into(((cast(response AS json))->>'VZEA090'), '999', '-1') as vzea090
, recode_into(((cast(response AS json))->>'VZEA100'), '999', '-1') as vzea100

  NULL as vzea110,
  NULL as VZEA111,

  ((cast(response AS json))->>'QZEA120[VZEA120a]') as qzea120_vzea120a,
  ((cast(response AS json))->>'QZEA120[VZEA120b]') as qzea120_vzea120b,
  ((cast(response AS json))->>'QZEA120[VZEA120c]') as qzea120_vzea120c,
  ((cast(response AS json))->>'QZEA120[VZEA120d]') as qzea120_vzea120d,
  ((cast(response AS json))->>'QZEA120[VZEA120e]') as qzea120_vzea120e,
  ((cast(response AS json))->>'QZEA120[VZEA120f]') as qzea120_vzea120f,
  ((cast(response AS json))->>'QZEA120[VZEA120g]') as qzea120_vzea120g,
  ((cast(response AS json))->>'QZEA120[VZEA120h]') as qzea120_vzea120h,
  ((cast(response AS json))->>'QZEA120[VZEA120i]') as qzea120_vzea120i,
  ((cast(response AS json))->>'QZEA120[VZEA120j]') as qzea120_vzea120j,

, recode_into(((cast(response AS json))->>'QZEA120_VZEA120a'), '0', '1') as VZEA121a
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120b'), '0', '1') as VZEA121b
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120c'), '0', '1') as VZEA121c
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120d'), '0', '1') as VZEA121d
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120e'), '0', '1') as VZEA121e
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120f'), '0', '1') as VZEA121f
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120g'), '0', '1') as VZEA121g
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120h'), '0', '1') as VZEA121h
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120i'), '0', '1') as VZEA121i
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120j'), '0', '1') as VZEA121j
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120a'), 'SYSMIS', '-1') as VZEA122a
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120b'), 'SYSMIS', '-1') as VZEA122b
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120c'), 'SYSMIS', '-1') as VZEA122c
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120d'), 'SYSMIS', '-1') as VZEA122d
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120e'), 'SYSMIS', '-1') as VZEA122e
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120f'), 'SYSMIS', '-1') as VZEA122f
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120g'), 'SYSMIS', '-1') as VZEA122g
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120h'), 'SYSMIS', '-1') as VZEA122h
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120i'), 'SYSMIS', '-1') as VZEA122i
, recode_into(((cast(response AS json))->>'QZEA120_VZEA120j'), 'SYSMIS', '-1') as VZEA122j
, recode_into(((cast(response AS json))->>'VZEA130'), '999', '-1') as vzea130

  ((cast(response AS json))->>'VZEA135') as vzea135,

, recode_into(recode_into(((cast(response AS json))->>'VZEA136'), '999', '-1'), '1', 'SYSMIS') as VZEA136
, recode_into(((cast(response AS json))->>'VZEA140'), '999', '-1') as vzea140
, recode_into(((cast(response AS json))->>'VZET010'), '999', '-1') as vzet010
, recode_into(((cast(response AS json))->>'VZET020'), '999', '-1') as vzet020
, recode_into(((cast(response AS json))->>'VZET030'), '999', '-1') as vzet030
, recode_into(((cast(response AS json))->>'VZET040'), '999', '-1') as vzet040
, recode_into(((cast(response AS json))->>'VZET050'), '999', '-1') as vzet050
, recode_into(((cast(response AS json))->>'VZET060'), '999', '-1') as vzet060
, recode_into(((cast(response AS json))->>'VZET070'), '999', '-1') as vzet070

  NULL as vzet080,
  NULL as VZET081,

, recode_into(((cast(response AS json))->>'VNED090'), '999', '-1') as vned090
, recode_into(((cast(response AS json))->>'VNED093'), '999', '-1') as vned093
, recode_into(((cast(response AS json))->>'VNED095'), '999', '-1') as vned095

  ((cast(response AS json))->>'VMED096') as vmed096,

, recode_into(recode_into(((cast(response AS json))->>'VMED097'), '999', '-1'), '1', 'SYSMIS')  as vmed097
, recode_into(((cast(response AS json))->>'VNED092'), '999', '-1') as vned092
, recode_into(((cast(response AS json))->>'VNED094'), '999', '-1') as vned094
, recode_into(((cast(response AS json))->>'VNED098'), '999', '-1') as VNED098
, recode_into(((cast(response AS json))->>'VZEU010'), '999', '-1') as vzeu010

  ((cast(response AS json))->>'QZEU011') as vzeu011,

, recode_into(((cast(response AS json))->>'VZEU020'), '999', '-1') as vzeu020
, recode_into(((cast(response AS json))->>'QZEU025_VZEU025x'), 'Y', '1') as VZEU025x  
, recode_into(((cast(response AS json))->>'QZEU025_VZEU025a'), 'Y', '1') as VZEU025a
, recode_into(((cast(response AS json))->>'QZEU025_VZEU025b'), 'Y', '1') as VZEU025b
, recode_into(((cast(response AS json))->>'QZEU025_VZEU025c'), 'Y', '1') as VZEU025c
, recode_into(((cast(response AS json))->>'QZEU025_VZEU025d'), 'Y', '1') as VZEU025d

  ((cast(response AS json))->>'VZEU030') as vzeu030,

, recode_into(recode_into(((cast(response AS json))->>'VZEU031'), '999', '-1'), '1', 'SYSMIS') as VZEU031

  ((cast(response AS json))->>'VZEU040') as vzeu040,

, recode_into(recode_into(((cast(response AS json))->>'VZEU041'), '999', '-1'), '1', 'SYSMIS') as VZEU041

  NULL as vzeu050,
  NULL as VZEU051,

, recode_into(((cast(response AS json))->>'QZEU070_VZEU070x'), 'Y', '1') as VZEU070x
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070y'), 'Y', '1') as VZEU070y
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070a'), 'Y', '1') as VZEU070a
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070b'), 'Y', '1') as VZEU070b
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070c'), 'Y', '1') as VZEU070c
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070d'), 'Y', '1') as VZEU070d
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070e'), 'Y', '1') as VZEU070e
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070f'), 'Y', '1') as VZEU070f
, recode_into(((cast(response AS json))->>'QZEU070_VZEU070g'), 'Y', '1') as VZEU070g

  ((cast(response AS json))->>'VZEU071') as vzeu071,

, recode_into(((cast(response AS json))->>'VYEK040'), '999', '-1') as vyek040
, recode_into(((cast(response AS json))->>'VYEK041'), '999', '-1') as vyek041
, recode_into(((cast(response AS json))->>'VYEK060'), '999', '-1') as vyek060
, recode_into(((cast(response AS json))->>'VYEK061'), '999', '-1') as vyek061
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010x'), 'Y', '1') as VZEK010x
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010y'), 'Y', '1') as vzek010y
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010a'), 'Y', '1') as vzek010a
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010b'), 'Y', '1') as vzek010b
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010c'), 'Y', '1') as vzek010c
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010d'), 'Y', '1') as vzek010d
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010e'), 'Y', '1') as vzek010e
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010f'), 'Y', '1') as vzek010f
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010g'), 'Y', '1') as vzek010g
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010h'), 'Y', '1') as vzek010h
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010i'), 'Y', '1') as vzek010i
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010j'), 'Y', '1') as vzek010j
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010k'), 'Y', '1') as vzek010k
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010l'), 'Y', '1') as vzek010l
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010m'), 'Y', '1') as vzek010m
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010n'), 'Y', '1') as vzek010n
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010o'), 'Y', '1') as vzek010o
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010p'), 'Y', '1') as vzek010p
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010q'), 'Y', '1') as vzek010q
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010r'), 'Y', '1') as vzek010r
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010s'), 'Y', '1') as vzek010s
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010t'), 'Y', '1') as vzek010t
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010u'), 'Y', '1') as vzek010u
, recode_into(((cast(response AS json))->>'QZEK010_VZEK010v'), 'Y', '1') as vzek010v

  ((cast(response AS json))->>'VZEK011') as vzek011,

, recode_into(((cast(response AS json))->>'QYEP010_VYEP010x'), 'Y', '1') as VYEP010x
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010y'), 'Y', '1') as vyep010y
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010a'), 'Y', '1') as vyep010a
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010b'), 'Y', '1') as vyep010b
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010c'), 'Y', '1') as vyep010c
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010d'), 'Y', '1') as vyep010d
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010e'), 'Y', '1') as vyep010e
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010f'), 'Y', '1') as vyep010f
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010g'), 'Y', '1') as vyep010g
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010h'), 'Y', '1') as vyep010h
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010i'), 'Y', '1') as vyep010i
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010j'), 'Y', '1') as vyep010j
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010k'), 'Y', '1') as vyep010k
, recode_into(((cast(response AS json))->>'QYEP010_VYEP010l'), 'Y', '1') as vyep010l
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012x'), 'Y', '1') as vyep012x
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012y'), 'Y', '1') as vyep012y
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012a'), 'Y', '1') as vyep012a
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012b'), 'Y', '1') as vyep012b
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012c'), 'Y', '1') as vyep012c
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012d'), 'Y', '1') as vyep012d
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012e'), 'Y', '1') as vyep012e
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012f'), 'Y', '1') as vyep012f
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012g'), 'Y', '1') as vyep012g
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012h'), 'Y', '1') as vyep012h
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012i'), 'Y', '1') as vyep012i
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012j'), 'Y', '1') as vyep012j
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012k'), 'Y', '1') as vyep012k
, recode_into(((cast(response AS json))->>'QYEP012_VYEP012l'), 'Y', '1') as vyep012l

  ((cast(response AS json))->>'QNEC050[VNEC050ao]') as qnec050_vnec050ao,
  ((cast(response AS json))->>'QNEC050[VNEC050ar]') as qnec050_vnec050ar,
  ((cast(response AS json))->>'QNEC050[VNEC050be]') as qnec050_vnec050be,
  ((cast(response AS json))->>'QNEC050[VNEC050bg]') as qnec050_vnec050bg,
  ((cast(response AS json))->>'QNEC050[VNEC050cd]') as qnec050_vnec050cd,
  ((cast(response AS json))->>'QNEC050[VNEC050cg]') as qnec050_vnec050cg,
  ((cast(response AS json))->>'QNEC050[VNEC050cl]') as qnec050_vnec050cl,
  ((cast(response AS json))->>'QNEC050[VNEC050co]') as qnec050_vnec050co,
  ((cast(response AS json))->>'QNEC050[VNEC050cu]') as qnec050_vnec050cu,
  ((cast(response AS json))->>'QNEC050[VNEC050cy]') as qnec050_vnec050cy,
  ((cast(response AS json))->>'QNEC050[VNEC050cz]') as qnec050_vnec050cz, 
  ((cast(response AS json))->>'QNEC050[VNEC050dk]') as qnec050_vnec050dk,
  ((cast(response AS json))->>'QNEC050[VNEC050do]') as qnec050_vnec050do,
  ((cast(response AS json))->>'QNEC050[VNEC050ec]') as qnec050_vnec050ec,
  ((cast(response AS json))->>'QNEC050[VNEC050ee]') as qnec050_vnec050ee,
  ((cast(response AS json))->>'QNEC050[VNEC050eg]') as qnec050_vnec050eg,
  ((cast(response AS json))->>'QNEC050[VNEC050fi]') as qnec050_vnec050fi,
  ((cast(response AS json))->>'QNEC050[VNEC050ge]') as qnec050_vnec050ge,
  ((cast(response AS json))->>'QNEC050[VNEC050ie]') as qnec050_vnec050ie,
  ((cast(response AS json))->>'QNEC050[VNEC050in]') as qnec050_vnec050in,
  ((cast(response AS json))->>'QNEC050[VNEC050iq]') as qnec050_vnec050iq,
  ((cast(response AS json))->>'QNEC050[VNEC050ir]') as qnec050_vnec050ir,
  ((cast(response AS json))->>'QNEC050[VNEC050is]') as qnec050_vnec050is,
  ((cast(response AS json))->>'QNEC050[VNEC050ke]') as qnec050_vnec050ke,
  ((cast(response AS json))->>'QNEC050[VNEC050li]') as qnec050_vnec050li,
  ((cast(response AS json))->>'QNEC050[VNEC050lt]') as qnec050_vnec050lt,
  ((cast(response AS json))->>'QNEC050[VNEC050lu]') as qnec050_vnec050lu,
  ((cast(response AS json))->>'QNEC050[VNEC050lv]') as qnec050_vnec050lv,
  ((cast(response AS json))->>'QNEC050[VNEC050ma]') as qnec050_vnec050ma,
  ((cast(response AS json))->>'QNEC050[VNEC050mt]') as qnec050_vnec050mt,
  ((cast(response AS json))->>'QNEC050[VNEC050mx]') as qnec050_vnec050mx,
  ((cast(response AS json))->>'QNEC050[VNEC050ng]') as qnec050_vnec050ng,
  ((cast(response AS json))->>'QNEC050[VNEC050no]') as qnec050_vnec050no,
  ((cast(response AS json))->>'QNEC050[VNEC050pe]') as qnec050_vnec050pe,
  ((cast(response AS json))->>'QNEC050[VNEC050ph]') as qnec050_vnec050ph,
  ((cast(response AS json))->>'QNEC050[VNEC050pk]') as qnec050_vnec050pk,
  ((cast(response AS json))->>'QNEC050[VNEC050pl]') as qnec050_vnec050pl,
  ((cast(response AS json))->>'QNEC050[VNEC050ro]') as qnec050_vnec050ro,
  ((cast(response AS json))->>'QNEC050[VNEC050ru]') as qnec050_vnec050ru,
  ((cast(response AS json))->>'QNEC050[VNEC050se]') as qnec050_vnec050se,
  ((cast(response AS json))->>'QNEC050[VNEC050si]') as qnec050_vnec050si,
  ((cast(response AS json))->>'QNEC050[VNEC050sk]') as qnec050_vnec050sk,
  ((cast(response AS json))->>'QNEC050[VNEC050sn]') as qnec050_vnec050sn,
  ((cast(response AS json))->>'QNEC050[VNEC050so]') as qnec050_vnec050so,
  ((cast(response AS json))->>'QNEC050[VNEC050th]') as qnec050_vnec050th,
  ((cast(response AS json))->>'QNEC050[VNEC050tn]') as qnec050_vnec050tn,
  ((cast(response AS json))->>'QNEC050[VNEC050ua]') as qnec050_vnec050ua,
  ((cast(response AS json))->>'QNEC050[VNEC050ve]') as qnec050_vnec050ve,
  ((cast(response AS json))->>'QNEC050[VNEC050vn]') as qnec050_vnec050vn,
  ((cast(response AS json))->>'QNEC050[VNEC050za]') as qnec050_vnec050za

FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id)
WHERE module = '9'