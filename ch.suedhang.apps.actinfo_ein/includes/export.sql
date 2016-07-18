SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,
    
  ((cast(response AS json))->>'FNr') as fnr,
  ((cast(response AS json))->>'Institution') as institution,
  ((cast(response AS json))->>'PID') as pid,
  ((cast(response AS json))->>'QNEC050[VNEC050al]') as qnec050_vnec050al,
  ((cast(response AS json))->>'QNEC050[VNEC050ao]') as qnec050_vnec050ao,
  ((cast(response AS json))->>'QNEC050[VNEC050ar]') as qnec050_vnec050ar,
  ((cast(response AS json))->>'QNEC050[VNEC050at]') as qnec050_vnec050at,
  ((cast(response AS json))->>'QNEC050[VNEC050ba]') as qnec050_vnec050ba,
  ((cast(response AS json))->>'QNEC050[VNEC050be]') as qnec050_vnec050be,
  ((cast(response AS json))->>'QNEC050[VNEC050bg]') as qnec050_vnec050bg,
  ((cast(response AS json))->>'QNEC050[VNEC050br]') as qnec050_vnec050br,
  ((cast(response AS json))->>'QNEC050[VNEC050ca]') as qnec050_vnec050ca,
  ((cast(response AS json))->>'QNEC050[VNEC050cd]') as qnec050_vnec050cd,
  ((cast(response AS json))->>'QNEC050[VNEC050cg]') as qnec050_vnec050cg,
  ((cast(response AS json))->>'QNEC050[VNEC050ch]') as qnec050_vnec050ch,
  ((cast(response AS json))->>'QNEC050[VNEC050cl]') as qnec050_vnec050cl,
  ((cast(response AS json))->>'QNEC050[VNEC050co]') as qnec050_vnec050co,
  ((cast(response AS json))->>'QNEC050[VNEC050cu]') as qnec050_vnec050cu,
  ((cast(response AS json))->>'QNEC050[VNEC050cy]') as qnec050_vnec050cy,
  ((cast(response AS json))->>'QNEC050[VNEC050cz]') as qnec050_vnec050cz,
  ((cast(response AS json))->>'QNEC050[VNEC050de]') as qnec050_vnec050de,
  ((cast(response AS json))->>'QNEC050[VNEC050dk]') as qnec050_vnec050dk,
  ((cast(response AS json))->>'QNEC050[VNEC050do]') as qnec050_vnec050do,
  ((cast(response AS json))->>'QNEC050[VNEC050dz]') as qnec050_vnec050dz,
  ((cast(response AS json))->>'QNEC050[VNEC050ec]') as qnec050_vnec050ec,
  ((cast(response AS json))->>'QNEC050[VNEC050ee]') as qnec050_vnec050ee,
  ((cast(response AS json))->>'QNEC050[VNEC050eg]') as qnec050_vnec050eg,
  ((cast(response AS json))->>'QNEC050[VNEC050es]') as qnec050_vnec050es,
  ((cast(response AS json))->>'QNEC050[VNEC050fi]') as qnec050_vnec050fi,
  ((cast(response AS json))->>'QNEC050[VNEC050fr]') as qnec050_vnec050fr,
  ((cast(response AS json))->>'QNEC050[VNEC050gb]') as qnec050_vnec050gb,
  ((cast(response AS json))->>'QNEC050[VNEC050ge]') as qnec050_vnec050ge,  
  ((cast(response AS json))->>'QNEC050[VNEC050gr]') as qnec050_vnec050gr,
  ((cast(response AS json))->>'QNEC050[VNEC050hr]') as qnec050_vnec050hr,
  ((cast(response AS json))->>'QNEC050[VNEC050hu]') as qnec050_vnec050hu,
  ((cast(response AS json))->>'QNEC050[VNEC050ie]') as qnec050_vnec050ie,
  ((cast(response AS json))->>'QNEC050[VNEC050in]') as qnec050_vnec050in,
  ((cast(response AS json))->>'QNEC050[VNEC050iq]') as qnec050_vnec050iq,
  ((cast(response AS json))->>'QNEC050[VNEC050ir]') as qnec050_vnec050ir,
  ((cast(response AS json))->>'QNEC050[VNEC050is]') as qnec050_vnec050is,  
  ((cast(response AS json))->>'QNEC050[VNEC050it]') as qnec050_vnec050it,
  ((cast(response AS json))->>'QNEC050[VNEC050ke]') as qnec050_vnec050ke,
  ((cast(response AS json))->>'QNEC050[VNEC050li]') as qnec050_vnec050li,
  ((cast(response AS json))->>'QNEC050[VNEC050lk]') as qnec050_vnec050lk,
  ((cast(response AS json))->>'QNEC050[VNEC050lt]') as qnec050_vnec050lt,
  ((cast(response AS json))->>'QNEC050[VNEC050lu]') as qnec050_vnec050lu,
  ((cast(response AS json))->>'QNEC050[VNEC050lv]') as qnec050_vnec050lv,
  ((cast(response AS json))->>'QNEC050[VNEC050ma]') as qnec050_vnec050ma,
  ((cast(response AS json))->>'QNEC050[VNEC050me]') as qnec050_vnec050me,
  ((cast(response AS json))->>'QNEC050[VNEC050mk]') as qnec050_vnec050mk,
  ((cast(response AS json))->>'QNEC050[VNEC050mt]') as qnec050_vnec050mt,
  ((cast(response AS json))->>'QNEC050[VNEC050mx]') as qnec050_vnec050mx,
  ((cast(response AS json))->>'QNEC050[VNEC050ng]') as qnec050_vnec050ng,
  ((cast(response AS json))->>'QNEC050[VNEC050nl]') as qnec050_vnec050nl,
  ((cast(response AS json))->>'QNEC050[VNEC050no]') as qnec050_vnec050no,
  ((cast(response AS json))->>'QNEC050[VNEC050pe]') as qnec050_vnec050pe,
  ((cast(response AS json))->>'QNEC050[VNEC050ph]') as qnec050_vnec050ph,
  ((cast(response AS json))->>'QNEC050[VNEC050pk]') as qnec050_vnec050pk,
  ((cast(response AS json))->>'QNEC050[VNEC050pl]') as qnec050_vnec050pl,
  ((cast(response AS json))->>'QNEC050[VNEC050pt]') as qnec050_vnec050pt,
  ((cast(response AS json))->>'QNEC050[VNEC050ro]') as qnec050_vnec050ro,
  ((cast(response AS json))->>'QNEC050[VNEC050rs]') as qnec050_vnec050rs,
  ((cast(response AS json))->>'QNEC050[VNEC050ru]') as qnec050_vnec050ru,
  ((cast(response AS json))->>'QNEC050[VNEC050se]') as qnec050_vnec050se,
  ((cast(response AS json))->>'QNEC050[VNEC050si]') as qnec050_vnec050si,
  ((cast(response AS json))->>'QNEC050[VNEC050sk]') as qnec050_vnec050sk,
  ((cast(response AS json))->>'QNEC050[VNEC050sn]') as qnec050_vnec050sn,
  ((cast(response AS json))->>'QNEC050[VNEC050so]') as qnec050_vnec050so,
  ((cast(response AS json))->>'QNEC050[VNEC050th]') as qnec050_vnec050th,
  ((cast(response AS json))->>'QNEC050[VNEC050tn]') as qnec050_vnec050tn,
  ((cast(response AS json))->>'QNEC050[VNEC050tr]') as qnec050_vnec050tr,
  ((cast(response AS json))->>'QNEC050[VNEC050ua]') as qnec050_vnec050ua,
  ((cast(response AS json))->>'QNEC050[VNEC050us]') as qnec050_vnec050us,
  ((cast(response AS json))->>'QNEC050[VNEC050ve]') as qnec050_vnec050ve,
  ((cast(response AS json))->>'QNEC050[VNEC050vn]') as qnec050_vnec050vn,
  ((cast(response AS json))->>'QNEC050[VNEC050xk]') as qnec050_vnec050xk,
  ((cast(response AS json))->>'QNEC050[VNEC050yy]') as qnec050_vnec050yy,
  ((cast(response AS json))->>'QNEC050[VNEC050za]') as qnec050_vnec050za,
  ((cast(response AS json))->>'QNEC060QNEC065[VNEC060]') as qnec060qnec065_vnec060,
  ((cast(response AS json))->>'QNEC060QNEC065[VNEC065]') as qnec060qnec065_vnec065,
  ((cast(response AS json))->>'QNEC070QNEC075[VNEC070]') as qnec070qnec075_vnec070,
  ((cast(response AS json))->>'QNEC070QNEC075[VNEC075]') as qnec070qnec075_vnec075,
  ((cast(response AS json))->>'QNEC080QNEC090[VNEC080]') as qnec080qnec090_vnec080,
  ((cast(response AS json))->>'QNEC080QNEC090[VNEC090]') as qnec080qnec090_vnec090,
  ((cast(response AS json))->>'QNEC100QNEC110[VNEC100]') as qnec100qnec110_vnec100,
  ((cast(response AS json))->>'QNEC100QNEC110[VNEC110]') as qnec100qnec110_vnec110,
  ((cast(response AS json))->>'QNEC120[VNEC120a]') as qnec120_vnec120a,
  ((cast(response AS json))->>'QNEC120[VNEC120b]') as qnec120_vnec120b,
  ((cast(response AS json))->>'QNEC120[VNEC120c]') as qnec120_vnec120c,
  ((cast(response AS json))->>'QNEC120[VNEC120d]') as qnec120_vnec120d,
  ((cast(response AS json))->>'QNEC120[VNEC120e]') as qnec120_vnec120e,
  ((cast(response AS json))->>'QNEC120[VNEC120f]') as qnec120_vnec120f,
  ((cast(response AS json))->>'QNEC120[VNEC120g]') as qnec120_vnec120g,
  ((cast(response AS json))->>'QNEC120[VNEC120h]') as qnec120_vnec120h,
  ((cast(response AS json))->>'QNEC120[VNEC120x]') as qnec120_vnec120x,
  ((cast(response AS json))->>'QNEC120[VNEC120y]') as qnec120_vnec120y,
  ((cast(response AS json))->>'QNED016[VNED016a]') as qned016_vned016a,
  ((cast(response AS json))->>'QNED016[VNED016b]') as qned016_vned016b,
  ((cast(response AS json))->>'QNED016[VNED016c]') as qned016_vned016c,
  ((cast(response AS json))->>'QNED016[VNED016d]') as qned016_vned016d,
  ((cast(response AS json))->>'QNED016[VNED016e]') as qned016_vned016e,
  ((cast(response AS json))->>'QNED016[VNED016f]') as qned016_vned016f,
  ((cast(response AS json))->>'QNED016[VNED016g]') as qned016_vned016g,
  ((cast(response AS json))->>'QNED016[VNED016h]') as qned016_vned016h,
  ((cast(response AS json))->>'QNED016[VNED016i]') as qned016_vned016i,
  ((cast(response AS json))->>'QNED016[VNED016j]') as qned016_vned016j,
  ((cast(response AS json))->>'QNED016[VNED016x]') as qned016_vned016x,
  ((cast(response AS json))->>'QNED0701[VNED070a]') as qned0701_vned070a,
  ((cast(response AS json))->>'QNED0702[VNED070ba]') as qned0702_vned070ba,
  ((cast(response AS json))->>'QNED0702[VNED070bb]') as qned0702_vned070bb,
  ((cast(response AS json))->>'QNED0702[VNED070bd]') as qned0702_vned070bd,
  ((cast(response AS json))->>'QNED0702[VNED070be]') as qned0702_vned070be,
  ((cast(response AS json))->>'QNED0702[VNeD070bc]') as qned0702_vned070bc,
  ((cast(response AS json))->>'QNED0703[VNED070ca]') as qned0703_vned070ca,
  ((cast(response AS json))->>'QNED0703[VNED070cb]') as qned0703_vned070cb,
  ((cast(response AS json))->>'QNED0703[VNED070cc]') as qned0703_vned070cc,
  ((cast(response AS json))->>'QNED0704[VNED070da]') as qned0704_vned070da,
  ((cast(response AS json))->>'QNED0704[VNED070db]') as qned0704_vned070db,
  ((cast(response AS json))->>'QNED0704[VNED070dc]') as qned0704_vned070dc,
  ((cast(response AS json))->>'QNED0704[VNED070dd]') as qned0704_vned070dd,
  ((cast(response AS json))->>'QNED0704[VNED070de]') as qned0704_vned070de,
  ((cast(response AS json))->>'QNED0705[VNED070ea]') as qned0705_vned070ea,
  ((cast(response AS json))->>'QNED0705[VNED070eb]') as qned0705_vned070eb,
  ((cast(response AS json))->>'QNED0705[VNED070ec]') as qned0705_vned070ec,
  ((cast(response AS json))->>'QNED0705[VNED070ed]') as qned0705_vned070ed,
  ((cast(response AS json))->>'QNED0706[VNED070fa]') as qned0706_vned070fa,
  ((cast(response AS json))->>'QNED0706[VNED070fb]') as qned0706_vned070fb,
  ((cast(response AS json))->>'QNED0706[VNED070fc]') as qned0706_vned070fc,
  ((cast(response AS json))->>'QNED0707[VNED070g]') as qned0707_vned070g,
  ((cast(response AS json))->>'QNED0707[VNED070h]') as qned0707_vned070h,
  ((cast(response AS json))->>'QNED0707[VNED070i]') as qned0707_vned070i,
  ((cast(response AS json))->>'QNED0707[VNED070j]') as qned0707_vned070j,
  ((cast(response AS json))->>'QNED0708[VNED070ka]') as qned0708_vned070ka,
  ((cast(response AS json))->>'QNED0708[VNED070kb]') as qned0708_vned070kb,
  ((cast(response AS json))->>'QNED0708[VNED070kc]') as qned0708_vned070kc,
  ((cast(response AS json))->>'QNED0708[VNED070kd]') as qned0708_vned070kd,
  ((cast(response AS json))->>'QYED075[VYED075a]') as qyed075_vyed075a,
  ((cast(response AS json))->>'QYED075[VYED075b]') as qyed075_vyed075b,
  ((cast(response AS json))->>'QYED075[VYED075c]') as qyed075_vyed075c,
  ((cast(response AS json))->>'QYED075[VYED075d]') as qyed075_vyed075d,
  ((cast(response AS json))->>'QYED075[VYED075e]') as qyed075_vyed075e,
  ((cast(response AS json))->>'QYED075[VYED075f]') as qyed075_vyed075f,
  ((cast(response AS json))->>'QYED075[VYED075g]') as qyed075_vyed075g,
  ((cast(response AS json))->>'QYED075[VYED075h]') as qyed075_vyed075h,
  ((cast(response AS json))->>'QYED075[VYED075i]') as qyed075_vyed075i,
  ((cast(response AS json))->>'QYEE020[VYEE020a]') as qyee020_vyee020a,
  ((cast(response AS json))->>'QYEE020[VYEE020b]') as qyee020_vyee020b,
  ((cast(response AS json))->>'QYEE020[VYEE020c]') as qyee020_vyee020c,
  ((cast(response AS json))->>'QYEE020[VYEE020d]') as qyee020_vyee020d,
  ((cast(response AS json))->>'QYEE020[VYEE020x]') as qyee020_vyee020x,
  ((cast(response AS json))->>'QYEP010[VYEP010a]') as qyep010_vyep010a,
  ((cast(response AS json))->>'QYEP010[VYEP010b]') as qyep010_vyep010b,
  ((cast(response AS json))->>'QYEP010[VYEP010c]') as qyep010_vyep010c,
  ((cast(response AS json))->>'QYEP010[VYEP010d]') as qyep010_vyep010d,
  ((cast(response AS json))->>'QYEP010[VYEP010e]') as qyep010_vyep010e,
  ((cast(response AS json))->>'QYEP010[VYEP010f]') as qyep010_vyep010f,
  ((cast(response AS json))->>'QYEP010[VYEP010g]') as qyep010_vyep010g,
  ((cast(response AS json))->>'QYEP010[VYEP010h]') as qyep010_vyep010h,
  ((cast(response AS json))->>'QYEP010[VYEP010i]') as qyep010_vyep010i,
  ((cast(response AS json))->>'QYEP010[VYEP010j]') as qyep010_vyep010j,
  ((cast(response AS json))->>'QYEP010[VYEP010k]') as qyep010_vyep010k,
  ((cast(response AS json))->>'QYEP010[VYEP010l]') as qyep010_vyep010l,
  ((cast(response AS json))->>'QYEP010[VYEP010x]') as qyep010_vyep010x,
  ((cast(response AS json))->>'QYEP010[VYEP010y]') as qyep010_vyep010y,
  ((cast(response AS json))->>'QYEP012[VYEP012a]') as qyep012_vyep012a,
  ((cast(response AS json))->>'QYEP012[VYEP012b]') as qyep012_vyep012b,
  ((cast(response AS json))->>'QYEP012[VYEP012c]') as qyep012_vyep012c,
  ((cast(response AS json))->>'QYEP012[VYEP012d]') as qyep012_vyep012d,
  ((cast(response AS json))->>'QYEP012[VYEP012e]') as qyep012_vyep012e,
  ((cast(response AS json))->>'QYEP012[VYEP012f]') as qyep012_vyep012f,
  ((cast(response AS json))->>'QYEP012[VYEP012g]') as qyep012_vyep012g,
  ((cast(response AS json))->>'QYEP012[VYEP012h]') as qyep012_vyep012h,
  ((cast(response AS json))->>'QYEP012[VYEP012i]') as qyep012_vyep012i,
  ((cast(response AS json))->>'QYEP012[VYEP012j]') as qyep012_vyep012j,
  ((cast(response AS json))->>'QYEP012[VYEP012k]') as qyep012_vyep012k,
  ((cast(response AS json))->>'QYEP012[VYEP012l]') as qyep012_vyep012l,
  ((cast(response AS json))->>'QYEP012[VYEP012x]') as qyep012_vyep012x,
  ((cast(response AS json))->>'QYEP012[VYEP012y]') as qyep012_vyep012y,
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
  ((cast(response AS json))->>'QZEE025') as qzee025,
  ((cast(response AS json))->>'QZEK010[VZEK010a]') as qzek010_vzek010a,
  ((cast(response AS json))->>'QZEK010[VZEK010b]') as qzek010_vzek010b,
  ((cast(response AS json))->>'QZEK010[VZEK010c]') as qzek010_vzek010c,
  ((cast(response AS json))->>'QZEK010[VZEK010d]') as qzek010_vzek010d,
  ((cast(response AS json))->>'QZEK010[VZEK010e]') as qzek010_vzek010e,
  ((cast(response AS json))->>'QZEK010[VZEK010f]') as qzek010_vzek010f,
  ((cast(response AS json))->>'QZEK010[VZEK010g]') as qzek010_vzek010g,
  ((cast(response AS json))->>'QZEK010[VZEK010h]') as qzek010_vzek010h,
  ((cast(response AS json))->>'QZEK010[VZEK010i]') as qzek010_vzek010i,
  ((cast(response AS json))->>'QZEK010[VZEK010j]') as qzek010_vzek010j,
  ((cast(response AS json))->>'QZEK010[VZEK010k]') as qzek010_vzek010k,
  ((cast(response AS json))->>'QZEK010[VZEK010l]') as qzek010_vzek010l,
  ((cast(response AS json))->>'QZEK010[VZEK010m]') as qzek010_vzek010m,
  ((cast(response AS json))->>'QZEK010[VZEK010n]') as qzek010_vzek010n,
  ((cast(response AS json))->>'QZEK010[VZEK010o]') as qzek010_vzek010o,
  ((cast(response AS json))->>'QZEK010[VZEK010p]') as qzek010_vzek010p,
  ((cast(response AS json))->>'QZEK010[VZEK010q]') as qzek010_vzek010q,
  ((cast(response AS json))->>'QZEK010[VZEK010r]') as qzek010_vzek010r,
  ((cast(response AS json))->>'QZEK010[VZEK010s]') as qzek010_vzek010s,
  ((cast(response AS json))->>'QZEK010[VZEK010t]') as qzek010_vzek010t,
  ((cast(response AS json))->>'QZEK010[VZEK010u]') as qzek010_vzek010u,
  ((cast(response AS json))->>'QZEK010[VZEK010v]') as qzek010_vzek010v,
  ((cast(response AS json))->>'QZEK010[VZEK010x]') as qzek010_vzek010x,
  ((cast(response AS json))->>'QZEK010[VZEK010y]') as qzek010_vzek010y,

  ((cast(response AS json))->>'QZES060QZES070[VZES060]') as qzes060qzes070_vzes060,
  ((cast(response AS json))->>'QZES060QZES070[VZES070]') as qzes060qzes070_vzes070,
  ((cast(response AS json))->>'QZES080[VZES080a]') as qzes080_vzes080a,
  ((cast(response AS json))->>'QZES080[VZES080b]') as qzes080_vzes080b,
  ((cast(response AS json))->>'QZES080[VZES080c]') as qzes080_vzes080c,
  ((cast(response AS json))->>'QZES080[VZES080d]') as qzes080_vzes080d,
  ((cast(response AS json))->>'QZES080[VZES080x]') as qzes080_vzes080x,
  ((cast(response AS json))->>'QZES080[VZES080y]') as qzes080_vzes080y,

  ((cast(response AS json))->>'QZEU025[VZEU025a]') as qzeu025_vzeu025a,
  ((cast(response AS json))->>'QZEU025[VZEU025b]') as qzeu025_vzeu025b,
  ((cast(response AS json))->>'QZEU025[VZEU025c]') as qzeu025_vzeu025c,
  ((cast(response AS json))->>'QZEU025[VZEU025d]') as qzeu025_vzeu025d,
  ((cast(response AS json))->>'QZEU025[VZEU025x]') as qzeu025_vzeu025x,
  ((cast(response AS json))->>'QZEU070[VZEU070a]') as qzeu070_vzeu070a,
  ((cast(response AS json))->>'QZEU070[VZEU070b]') as qzeu070_vzeu070b,
  ((cast(response AS json))->>'QZEU070[VZEU070c]') as qzeu070_vzeu070c,
  ((cast(response AS json))->>'QZEU070[VZEU070d]') as qzeu070_vzeu070d,
  ((cast(response AS json))->>'QZEU070[VZEU070e]') as qzeu070_vzeu070e,
  ((cast(response AS json))->>'QZEU070[VZEU070f]') as qzeu070_vzeu070f,
  ((cast(response AS json))->>'QZEU070[VZEU070g]') as qzeu070_vzeu070g,
  ((cast(response AS json))->>'QZEU070[VZEU070x]') as qzeu070_vzeu070x,
  ((cast(response AS json))->>'QZEU070[VZEU070y]') as qzeu070_vzeu070y,


  ((cast(response AS json))->>'VMEB061') as vmeb061,

  ((cast(response AS json))->>'VMEC010') as vmec010,
  ((cast(response AS json))->>'VMEC020') as vmec020,

  ((cast(response AS json))->>'VMEC040') as vmec040,

  ((cast(response AS json))->>'VMED040') as vmed040,

  ((cast(response AS json))->>'VMED046') as vmed046,
  ((cast(response AS json))->>'VMED050') as vmed050,

  ((cast(response AS json))->>'VMED056') as vmed056,
  ((cast(response AS json))->>'VMED060') as vmed060,

  ((cast(response AS json))->>'VMED066') as vmed066,

  ((cast(response AS json))->>'VMED097') as vmed097,

  ((cast(response AS json))->>'VNEB050[VNEB050a]') as vneb050_vneb050a,
  ((cast(response AS json))->>'VNEB050[VNEB050b]') as vneb050_vneb050b,
  ((cast(response AS json))->>'VNEB050[VNEB050c]') as vneb050_vneb050c,
  ((cast(response AS json))->>'VNEB050[VNEB050d]') as vneb050_vneb050d,
  ((cast(response AS json))->>'VNEB050[VNEB050e]') as vneb050_vneb050e,
  ((cast(response AS json))->>'VNEB050[VNEB050x]') as vneb050_vneb050x,
  ((cast(response AS json))->>'VNEB050[VNEB050y]') as vneb050_vneb050y,

  ((cast(response AS json))->>'VNEB060[VNEB060a]') as vneb060_vneb060a,
  ((cast(response AS json))->>'VNEB060[VNEB060b]') as vneb060_vneb060b,
  ((cast(response AS json))->>'VNEB060[VNEB060c]') as vneb060_vneb060c,
  ((cast(response AS json))->>'VNEB060[VNEB060d]') as vneb060_vneb060d,
  ((cast(response AS json))->>'VNEB060[VNEB060e]') as vneb060_vneb060e,
  ((cast(response AS json))->>'VNEB060[VNEB060f]') as vneb060_vneb060f,
  ((cast(response AS json))->>'VNEB060[VNEB060g]') as vneb060_vneb060g,
  ((cast(response AS json))->>'VNEB060[VNEB060h]') as vneb060_vneb060h,
  ((cast(response AS json))->>'VNEB060[VNEB060i]') as vneb060_vneb060i,
  ((cast(response AS json))->>'VNEB060[VNEB060x]') as vneb060_vneb060x,
  ((cast(response AS json))->>'VNEB065') as vneb065,
  ((cast(response AS json))->>'VNEB066') as vneb066,

  ((cast(response AS json))->>'VNEB080') as vneb080,

  ((cast(response AS json))->>'VNEC050x') as vnec050x,
  ((cast(response AS json))->>'VNEC067') as vnec067,
  ((cast(response AS json))->>'VNEC068') as vnec068,

  ((cast(response AS json))->>'VNED010') as vned010,
  ((cast(response AS json))->>'VNED015') as vned015,
  ((cast(response AS json))->>'VNED025') as vned025,
  ((cast(response AS json))->>'VNED026') as vned026,
  ((cast(response AS json))->>'VNED030') as vned030,

  ((cast(response AS json))->>'VNED070x') as vned070x,

  ((cast(response AS json))->>'VNED073a') as vned073a,
  ((cast(response AS json))->>'VNED073ba') as vned073ba,
  ((cast(response AS json))->>'VNED073bb') as vned073bb,
  ((cast(response AS json))->>'VNED073bd') as vned073bd,
  ((cast(response AS json))->>'VNED073be') as vned073be,
  ((cast(response AS json))->>'VNED073ca') as vned073ca,
  ((cast(response AS json))->>'VNED073cb') as vned073cb,
  ((cast(response AS json))->>'VNED073cc') as vned073cc,
  ((cast(response AS json))->>'VNED073da') as vned073da,
  ((cast(response AS json))->>'VNED073db') as vned073db,
  ((cast(response AS json))->>'VNED073dc') as vned073dc,
  ((cast(response AS json))->>'VNED073dd') as vned073dd,
  ((cast(response AS json))->>'VNED073de') as vned073de,
  ((cast(response AS json))->>'VNED073ea') as vned073ea,
  ((cast(response AS json))->>'VNED073eb') as vned073eb,
  ((cast(response AS json))->>'VNED073ec') as vned073ec,
  ((cast(response AS json))->>'VNED073ed') as vned073ed,
  ((cast(response AS json))->>'VNED073fa') as vned073fa,
  ((cast(response AS json))->>'VNED073fb') as vned073fb,
  ((cast(response AS json))->>'VNED073fc') as vned073fc,
  ((cast(response AS json))->>'VNED073g') as vned073g,
  ((cast(response AS json))->>'VNED073h') as vned073h,
  ((cast(response AS json))->>'VNED073i') as vned073i,
  ((cast(response AS json))->>'VNED073j') as vned073j,
  ((cast(response AS json))->>'VNED073ka') as vned073ka,
  ((cast(response AS json))->>'VNED073kb') as vned073kb,
  ((cast(response AS json))->>'VNED073kc') as vned073kc,
  ((cast(response AS json))->>'VNED073kd') as vned073kd,

  ((cast(response AS json))->>'VNED090') as vned090,
  ((cast(response AS json))->>'VNED092') as vned092,
  ((cast(response AS json))->>'VNED093') as vned093,
  ((cast(response AS json))->>'VNED094') as vned094,
  ((cast(response AS json))->>'VNED095') as vned095,
  ((cast(response AS json))->>'VNED098') as vned098,

  ((cast(response AS json))->>'VNED073bc') as vned073bc,

  ((cast(response AS json))->>'VYEE010') as vyee010,
  ((cast(response AS json))->>'VYEE040') as vyee040,
  ((cast(response AS json))->>'VYEF010') as vyef010,
  ((cast(response AS json))->>'VYEF040') as vyef040,
  ((cast(response AS json))->>'VYEK040') as vyek040,
  ((cast(response AS json))->>'VYEK041') as vyek041,
  ((cast(response AS json))->>'VYEK060') as vyek060,
  ((cast(response AS json))->>'VYEK061') as vyek061,
  ((cast(response AS json))->>'VYEP011') as vyep011,
  ((cast(response AS json))->>'VYEP013') as vyep013,

  ((cast(response AS json))->>'VZEA010') as vzea010,
  ((cast(response AS json))->>'VZEA020') as vzea020,
  ((cast(response AS json))->>'VZEA030') as vzea030,
  ((cast(response AS json))->>'VZEA040') as vzea040,
  ((cast(response AS json))->>'VZEA050') as vzea050,
  ((cast(response AS json))->>'VZEA060') as vzea060,
  ((cast(response AS json))->>'VZEA070') as vzea070,
  ((cast(response AS json))->>'VZEA080') as vzea080,
  ((cast(response AS json))->>'VZEA090') as vzea090,
  ((cast(response AS json))->>'VZEA100') as vzea100,
  ((cast(response AS json))->>'VZEA130') as vzea130,

  ((cast(response AS json))->>'VZEA136') as vzea136,
  ((cast(response AS json))->>'VZEA140') as vzea140,

  ((cast(response AS json))->>'VZEE050') as vzee050,

  ((cast(response AS json))->>'VZEF030') as vzef030,

  ((cast(response AS json))->>'VZEO010') as vzeo010,

  ((cast(response AS json))->>'VZES010') as vzes010,
  ((cast(response AS json))->>'VZES015') as vzes015,
  ((cast(response AS json))->>'VZES020') as vzes020,
  ((cast(response AS json))->>'VZES050') as vzes050,

  ((cast(response AS json))->>'VZET010') as vzet010,
  ((cast(response AS json))->>'VZET020') as vzet020,
  ((cast(response AS json))->>'VZET030') as vzet030,
  ((cast(response AS json))->>'VZET040') as vzet040,
  ((cast(response AS json))->>'VZET050') as vzet050,
  ((cast(response AS json))->>'VZET060') as vzet060,
  ((cast(response AS json))->>'VZET070') as vzet070,
  ((cast(response AS json))->>'VZEU010') as vzeu010,
  ((cast(response AS json))->>'VZEU020') as vzeu020,

  ((cast(response AS json))->>'VZEU031') as vzeu031,

  ((cast(response AS json))->>'VZEU041') as vzeu041,


  ((cast(response AS json))->>'cgiSG') as cgisg,
  ((cast(response AS json))->>'datestamp') as datestamp,
  TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')  as datestamp_date,
  SUBSTRING(((cast(response AS json))->>'datestamp'),12,5) AS datestamp_time,
  SUBSTRING(((cast(response AS json))->>'datestamp'),1,4)::integer AS datestamp_year,
  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'datestamp'), 'YYYY-MM-DD HH24:MI:SS')) AS datestamp_week,
  ((cast(response AS json))->>'id') as id,
  ((cast(response AS json))->>'lastpage') as lastpage,
  ((cast(response AS json))->>'optinomixHASH') as optinomixhash,

  random_hash,
  scheduled,
  filled,
  module,
  survey_response.id AS survey_response_id  

FROM survey_response 
INNER JOIN patient ON(survey_response.patient = patient.id) 

WHERE module = 'ch.suedhang.apps.actinfo_ein';
