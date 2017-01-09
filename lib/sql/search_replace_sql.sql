
-- Alcohol Abstinence Self-Efficacy Scale (AASE)
-- ch.suedhang.apps.aase-g.production
---- AASE_AASE1 => AASE[AASE1]

UPDATE "survey_response" 
SET response = regexp_replace(response, 'AASE_(\w+)', 'AASE[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.aase-g.production';


-- RECODE every AASE-Score with: 
---- => 1 -> 4 | 2 -> 3 | 3 -> 2 | 4 -> 1 | 5 -> 0

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"5"', '"AASE[\1]":"ZERO"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"4"', '"AASE[\1]":"ONE"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"3"', '"AASE[\1]":"TWO"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"2"', '"AASE[\1]":"THREE"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"1"', '"AASE[\1]":"FOUR"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"ZERO"', '"AASE[\1]":"0"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"ONE"', '"AASE[\1]":"1"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"TWO"', '"AASE[\1]":"2"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"THREE"', '"AASE[\1]":"3"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';

UPDATE "survey_response" 
SET response = regexp_replace(response, '"AASE\[(\w+)\]":"FOUR"', '"AASE[\1]":"4"', 'g')
WHERE module = 'ch.suedhang.apps.aase-g.production';



-- BSCL – ANQ (Brief Symptom Checklist)
-- ch.suedhang.apps.bscl_anq.production

---- BSCL_sq504V53 => BSCL[sq504V53]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'BSCL_(\w+)', 'BSCL[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.bscl_anq.production';



-- The World Health Organization Quality of Life (WHOQOL) – Phys / Psych
-- ch.suedhang.apps.whoqol.production

----  EWHOQOL39_EWHOQOL7 => EWHOQOL39[EWHOQOL7]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL39_(\w+)', 'EWHOQOL39[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.whoqol.production';

----  EWHOQOL1625_EWHOQOL16 => EWHOQOL1625[EWHOQOL16]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL1625_(\w+)', 'EWHOQOL1625[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.whoqol.production';

----  EWHOQOL1014_EWHOQOL10 => EWHOQOL1014[EWHOQOL10]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'EWHOQOL1014_(\w+)', 'EWHOQOL1014[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.whoqol.production';



-- act-info - Eintritt
-- ch.suedhang.apps.actinfo_ein.production

---- QNEC050_VNEC050al => QNEC050[VNEC050al]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC050_(\w+)', 'QNEC050[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNEC060QNEC065_VNEC060 => QNEC060QNEC065[VNEC060]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC060QNEC065_(\w+)', 'QNEC060QNEC065[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNEC070QNEC075_VNEC070 => QNEC070QNEC075[VNEC070]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC070QNEC075_(\w+)', 'QNEC070QNEC075[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNEC080QNEC090_VNEC080 => QNEC080QNEC090[VNEC080]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC080QNEC090_(\w+)', 'QNEC080QNEC090[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNEC100QNEC110_VNEC100 => QNEC100QNEC110[VNEC100]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC100QNEC110_(\w+)', 'QNEC100QNEC110[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNEC120_VNEC120a => QNEC120[VNEC120a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNEC120_(\w+)', 'QNEC120[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED016_VNED016a => QNED016[VNED016a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED016_(\w+)', 'QNED016[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0701_VNED070a => QNED0701[VNED070a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0701_(\w+)', 'QNED0701[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0702_VNED070ba => QNED0702[VNED070ba]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0702_(\w+)', 'QNED0702[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0703_VNED070ca => QNED0703[VNED070ca]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0703_(\w+)', 'QNED0703[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0704_VNED070da => QNED0704[VNED070da]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0704_(\w+)', 'QNED0704[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0705_VNED070ea => QNED0705[VNED070ea]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0705_(\w+)', 'QNED0705[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0706_VNED070fa => QNED0706[VNED070fa]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0706_(\w+)', 'QNED0706[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0707_VNED070g => QNED0707[VNED070g]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0707_(\w+)', 'QNED0707[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QNED0708_VNED070ka => QNED0708[VNED070ka]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNED0708_(\w+)', 'QNED0708[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QYED075_VYED075a => QYED075[VYED075a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYED075_(\w+)', 'QYED075[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QYEE020_VYEE020a => QYEE020[VYEE020a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEE020_(\w+)', 'QYEE020[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QYEP010_VYEP010a => QYEP010[VYEP010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEP010_(\w+)', 'QYEP010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QYEP012_VYEP012a => QYEP012[VYEP012a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYEP012_(\w+)', 'QYEP012[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZEA120_VZEA120a => QZEA120[VZEA120a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEA120_(\w+)', 'QZEA120[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZEK010_VZEK010a => QZEK010[VZEK010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEK010_(\w+)', 'QZEK010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZES060QZES070_VZES060 => QZES060QZES070[VZES060]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZES060QZES070_(\w+)', 'QZES060QZES070[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZES080_VZES080a => QZES080[VZES080a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZES080_(\w+)', 'QZES080[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZEU025_VZEU025a => QZEU025[VZEU025a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEU025_(\w+)', 'QZEU025[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- QZEU070_VZEU070a => QZEU070[VZEU070a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZEU070_(\w+)', 'QZEU070[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- VNEB050_VNEB050a => VNEB050[VNEB050a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'VNEB050_(\w+)', 'VNEB050[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';

---- VNEB060_VNEB060a => VNEB060[VNEB060a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'VNEB060_(\w+)', 'VNEB060[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_ein.production';



-- act-info - Austritt
-- => ch.suedhang.apps.actinfo_aus.production

---- QNAC070_VNAC070a => QNAC070[VNAC070a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAC070_(\w+)', 'QNAC070[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0101_VNAD010a => QNAD0101[VNAD010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0101_(\w+)', 'QNAD0101[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0102_VNAD010ba => QNAD0102[VNAD010be]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0102_(\w+)', 'QNAD0102[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0103_VNAD010ca => QNAD0103[VNAD010ca]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0103_(\w+)', 'QNAD0103[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0104_VNAD010da => QNAD0104[VNAD010da]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0104_(\w+)', 'QNAD0104[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0105_VNAD010ea => QNAD0105[VNAD010ea]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0105_(\w+)', 'QNAD0105[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0106_VNAD010fa => QNAD0106[VNAD010fa]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0106_(\w+)', 'QNAD0106[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0107_VNAD010g => QNAD0107[VNAD010g]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0107_(\w+)', 'QNAD0107[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QNAD0108_VNAD010ka => QNAD0108[VNAD010ka]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QNAD0108_(\w+)', 'QNAD0108[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAP010_VYAP010a => QYAP010[VYAP010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAP010_(\w+)', 'QYAP010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAP080_VYAP080a => QYAP080[VYAP080a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAP080_(\w+)', 'QYAP080[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAP090_VYAP090a => QYAP090[VYAP090a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAP090_(\w+)', 'QYAP090[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAR010_VYAR010a => QYAR010[VYAR010a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAR010_(\w+)', 'QYAR010[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAR020_VYAR020a => QYAR020[VYAR020a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAR020_(\w+)', 'QYAR020[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAR030_VYAR030a => QYAR030[VYAR030a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAR030_(\w+)', 'QYAR030[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QYAZ020_VYAZ020a => QYAZ020[VYAZ020a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QYAZ020_(\w+)', 'QYAZ020[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QZAJ015_VZAJ015a => QZAJ015[VZAJ015a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZAJ015_(\w+)', 'QZAJ015[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';

---- QZAU050_VZAU050a => QZAU050[VZAU050a]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'QZAU050_(\w+)', 'QZAU050[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.actinfo_aus.production';



-- Inventar sozialer Kompetenz (ISK-K)
-- ch.suedhang.apps.isk.production 

---- AISK_AIS10 => AISK[AIS10]
UPDATE "survey_response" 
SET response = regexp_replace(response, 'AISK_(\w+)', 'AISK[\1]', 'g') 
WHERE module = 'ch.suedhang.apps.isk.production';



-- Stress- und Copinginventar (SCI)
-- ch.suedhang.apps.sci.production

UPDATE "survey_response" 
SET response = regexp_replace(response, 'ESCI(\w+)_(\w+)', 'ESCI\1[\2]', 'g') 
WHERE module = 'ch.suedhang.apps.sci.production';



-- A. Einzelassessment
-- ch.suedhang.apps.neuroanamnese
----  UNSURE! (To Do)



----------------------------
--  Nothing to do here:
----------------------------

-- Beck-Depressions-Inventar (BDI-II)
-- ch.suedhang.apps.bdi
---- Perfect!


-- A. CASE
-- ch.suedhang.apps.case.new
---- Perfect!


-- Trail Making Test (TMT)
-- ch.suedhang.apps.tmt_V3
---- Perfect!




