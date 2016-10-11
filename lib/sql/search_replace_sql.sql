

-- Alcohol Abstinence Self-Efficacy Scale (AASE)
-- ch.suedhang.apps.aase-g
---- AASE_AASE1 => AASE[AASE1]

UPDATE "survey_response" 
SET response = regexp_replace(response, 'AASE_(\w+)', 'AASE[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.aase-g';



-- BSCL – ANQ (Brief Symptom Checklist)
-- ch.suedhang.apps.bscl.anq
---- BSCL_sq504V53 => BSCL[sq504V53]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'BSCL_(\w+)', 'BSCL[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.bscl.anq';


-- The World Health Organization Quality of Life (WHOQOL) – Phys / Psych
-- com.optinomic.apps.whoqol
----  EWHOQOL39_EWHOQOL7 => EWHOQOL39[EWHOQOL7]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL39_(\w+)', 'EWHOQOL39[\1]', 'g') 
WHERE module = 'com.optinomic.apps.whoqol';

----  EWHOQOL1625_EWHOQOL16 => EWHOQOL1625[EWHOQOL16]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL1625_(\w+)', 'EWHOQOL1625[\1]', 'g') 
WHERE module = 'com.optinomic.apps.whoqol';

----  EWHOQOL1014_EWHOQOL10 => EWHOQOL1014[EWHOQOL10]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL1014_(\w+)', 'EWHOQOL1014[\1]', 'g') 
WHERE module = 'com.optinomic.apps.whoqol';


-- act-info - Eintritt
-- ch.suedhang.apps.actinfo_ein

---- QNEC050_VNEC050al => QNEC050[VNEC050al]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC050_(\w+)', 'QNEC050[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNEC060QNEC065_VNEC060 => QNEC060QNEC065[VNEC060]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC060QNEC065_(\w+)', 'QNEC060QNEC065[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNEC070QNEC075_VNEC070 => QNEC070QNEC075[VNEC070]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC070QNEC075_(\w+)', 'QNEC070QNEC075[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNEC080QNEC090_VNEC080 => QNEC080QNEC090[VNEC080]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC080QNEC090_(\w+)', 'QNEC080QNEC090[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNEC100QNEC110_VNEC100 => QNEC100QNEC110[VNEC100]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC100QNEC110_(\w+)', 'QNEC100QNEC110[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNEC120_VNEC120a => QNEC120[VNEC120a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC120_(\w+)', 'QNEC120[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED016_VNED016a => QNED016[VNED016a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED016_(\w+)', 'QNED016[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0701_VNED070a => QNED0701[VNED070a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0701_(\w+)', 'QNED0701[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0702_VNED070ba => QNED0702[VNED070ba]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0702_(\w+)', 'QNED0702[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0703_VNED070ca => QNED0703[VNED070ca]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0703_(\w+)', 'QNED0703[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0704_VNED070da => QNED0704[VNED070da]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0704_(\w+)', 'QNED0704[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0705_VNED070ea => QNED0705[VNED070ea]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0705_(\w+)', 'QNED0705[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0706_VNED070fa => QNED0706[VNED070fa]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0706_(\w+)', 'QNED0706[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0707_VNED070g => QNED0707[VNED070g]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0707_(\w+)', 'QNED0707[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QNED0708_VNED070ka => QNED0708[VNED070ka]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0708_(\w+)', 'QNED0708[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QYED075_VYED075a => QYED075[VYED075a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYED075_(\w+)', 'QYED075[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QYEE020_VYEE020a => QYEE020[VYEE020a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEE020_(\w+)', 'QYEE020[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QYEP010_VYEP010a => QYEP010[VYEP010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEP010_(\w+)', 'QYEP010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QYEP012_VYEP012a => QYEP012[VYEP012a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEP012_(\w+)', 'QYEP012[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZEA120_VZEA120a => QZEA120[VZEA120a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEA120_(\w+)', 'QZEA120[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZEK010_VZEK010a => QZEK010[VZEK010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEK010_(\w+)', 'QZEK010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZES060QZES070_VZES060 => QZES060QZES070[VZES060]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZES060QZES070_(\w+)', 'QZES060QZES070[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZES080_VZES080a => QZES080[VZES080a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZES080_(\w+)', 'QZES080[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZEU025_VZEU025a => QZEU025[VZEU025a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEU025_(\w+)', 'QZEU025[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- QZEU070_VZEU070a => QZEU070[VZEU070a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEU070_(\w+)', 'QZEU070[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- VNEB050_VNEB050a => VNEB050[VNEB050a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'VNEB050_(\w+)', 'VNEB050[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'

---- VNEB060_VNEB060a => VNEB060[VNEB060a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'VNEB060_(\w+)', 'VNEB060[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein'



-- act-info - Austritt
-- => ch.suedhang.apps.actinfo_aus



-- Inventar sozialer Kompetenz (ISK-K)
-- ch.suedhang.apps.isk 
---- AISK_AIS10 => AISK[AIS10]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'AISK_(\w+)', 'AISK[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.isk'


-- Stress- und Copinginventar (SCI)
-- ch.suedhang.apps.sci

UPDATE "survey_response" 
SET response = regexp_replace(response, 'ESCI(\w+)_(\w+)', 'ESCI\1[\2]', 'g') 
WHERE module = 'ch.suedhang.apps.sci';

-- A. Einzelassessment
-- ch.suedhang.apps.neuroanamnese
----  UNSURE! (To Do)


-- Beck-Depressions-Inventar (BDI-II)
-- ch.suedhang.apps.bdi
---- Perfect!


-- A. CASE
-- ch.suedhang.apps.case.new
---- Perfect!


-- Trail Making Test (TMT)
-- ch.suedhang.apps.tmt_V3
---- Perfect!




