SELECT
  patient.id AS pid,
  patient,
  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,
  patient.four_letter_code,

  ((cast(response AS json))->>'Fallnummer') as fnr,
, ((cast(response AS json))->>'Institution') as institution
, recode_into(((cast(response AS json))->>'Institution'), '333', '31') as institution
, ((cast(response AS json))->>'PID') as pid

, ((cast(response AS json))->>'VZAX005') as VZAX005
, ((cast(response AS json))->>'VMAB001') as VMAB001
, ((cast(response AS json))->>'VMAB005') as VMAB005
, NULL as VMAB006
, patient.four_letter_code as VMAB010
, ((cast(response AS json))->>'VMAB020') as VMAB020
, recode_into (recode_into(patient.gender, 'Male', '1'), 'Female', '2') as vmac001
, patient.birthdate as vmac005
, NULL as VMAC006
, recode_into(((cast(response AS json))->>'VMAB040'), '999', '-1') as vmab040
, recode_into(((cast(response AS json))->>'VNAB041'), '999', '-1') as vnab041
, ((cast(response AS json))->>'VMAB042') as VMAB042
, recode_into(((cast(response AS json))->>'VMAB044'), '999', '-1') as vmab044
, ((cast(response AS json))->>'VMAB045') as VMAB045
, ((cast(response AS json))->>'VMAB046') as VMAB046
, ((cast(response AS json))->>'VYAN010') as VYAN010
, recode_into(((cast(response AS json))->>'VMAB050'), '999', '-1') as vmab050
, recode_into(((cast(response AS json))->>'VMAB055'), '999', '-1') as vmab055
, recode_into(((cast(response AS json))->>'VMAB060'), '999', '-1') as VMAB060
, recode_into(((cast(response AS json))->>'VZAJ010'), '999', '-1') as vzaj010
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015x]'), 'Y', '1') as VZAJ015x
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015a]'), 'Y', '1') as vzaj015a
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015b]'), 'Y', '1') as vzaj015b
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015c]'), 'Y', '1') as vzaj015c
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015d]'), 'Y', '1') as vzaj015d
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015e]'), 'Y', '1') as vzaj015e
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015f]'), 'Y', '1') as vzaj015f
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015g]'), 'Y', '1') as vzaj015g
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015h]'), 'Y', '1') as vzaj015h
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015i]'), 'Y', '1') as vzaj015i
, recode_into(((cast(response AS json))->>'QZAJ015[VZAJ015j]'), 'Y', '1') as vzaj015j
, ((cast(response AS json))->>'VZAJ016') as VZAJ016
, ((cast(response AS json))->>'VMAC010a') as VMAC010a
, NULL as vmac010b
, NULL as vmac010c
, NULL as vmac010d
, NULL as VMAC010e
, recode_into(((cast(response AS json))->>'VMAC020'), '999', '-1') as vmac020
, recode_into(((cast(response AS json))->>'VNAC030'), '999', '-1') as vnac030
, ((cast(response AS json))->>'VMAC031') as VMAC031
, recode_into(((cast(response AS json))->>'VNAC040'), '999', '-1') as vnac040
, recode_into(((cast(response AS json))->>'VZAS010'), '999', '-1') as vzas010
, recode_into(((cast(response AS json))->>'VYAS015'), '999', '-1') as vyas015
, recode_into(((cast(response AS json))->>'VZAS020'), '999', '-1') as vzas020
, recode_into(((cast(response AS json))->>'VNAC050'), '999', '-1') as vnac050
, ((cast(response AS json))->>'VMAC051') as VMAC051
, recode_into(((cast(response AS json))->>'VNAC060'), '999', '-1') as vnac060
, ((cast(response AS json))->>'VMAC061') as VMAC061
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070x]'), 'Y' , '1') as VNAC070x
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070y]'), 'Y' , '1') as VNAC070y
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070a]'), 'Y' , '1') as VNAC070a
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070b]'), 'Y' , '1') as VNAC070b
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070c]'), 'Y' , '1') as VNAC070c
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070d]'), 'Y' , '1') as VNAC070d
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070e]'), 'Y' , '1') as VNAC070e
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070f]'), 'Y' , '1') as VNAC070f
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070g]'), 'Y' , '1') as VNAC070g
, recode_into(((cast(response AS json))->>'QNAC070[VNAC070h]'), 'Y' , '1') as VNAC070h
, recode_into(((cast(response AS json))->>'VZAF010'), '999', '-1') as vzaf010
, ((cast(response AS json))->>'VZAF011') as VZAF011
, recode_into(((cast(response AS json))->>'VYAF030'), '999', '-1') as vyaf030
, recode_into(((cast(response AS json))->>'VYAR009'), '999', '-1') as vyar009
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010x]'), 'Y' , '1') as VYAR010x
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010a]'), 'Y' , '1') as vyar010a
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010b]'), 'Y' , '1') as vyar010b
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010c]'), 'Y' , '1') as vyar010c
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010d]'), 'Y' , '1') as vyar010d
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010e]'), 'Y' , '1') as vyar010e
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010f]'), 'Y' , '1') as vyar010f
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010g]'), 'Y' , '1') as vyar010g
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010h]'), 'Y' , '1') as vyar010h
, recode_into(((cast(response AS json))->>'QYAR010[VYAR010i]'), 'Y' , '1') as vyar010i
, ((cast(response AS json))->>'VZAR011') as VZAR011
, recode_into(((cast(response AS json))->>'VYAR019'), '999', '-1') as vyar019
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020x]'), 'Y' , '1') as VYAR020x
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020a]'), 'Y' , '1') as vyar020a
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020b]'), 'Y' , '1') as vyar020b
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020c]'), 'Y' , '1') as vyar020c
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020d]'), 'Y' , '1') as vyar020d
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020e]'), 'Y' , '1') as vyar020e
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020f]'), 'Y' , '1') as vyar020f
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020g]'), 'Y' , '1') as vyar020g
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020h]'), 'Y' , '1') as vyar020h
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020i]'), 'Y' , '1') as vyar020i
, recode_into(((cast(response AS json))->>'QYAR020[VYAR020j]'), 'Y' , '1') as vyar020j
, ((cast(response AS json))->>'VZAR021') as VZAR021
, recode_into(((cast(response AS json))->>'VYAR029'), '999', '-1') as vyar029
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030x]'), 'Y' , '1') as VYAR030x
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030a]'), 'Y' , '1') as vyar030a
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030b]'), 'Y' , '1') as vyar030b
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030c]'), 'Y' , '1') as vyar030c
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030d]'), 'Y' , '1') as vyar030d
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030e]'), 'Y' , '1') as vyar030e
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030f]'), 'Y' , '1') as vyar030f
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030g]'), 'Y' , '1') as vyar030g
, recode_into(((cast(response AS json))->>'QYAR030[VYAR030h]'), 'Y' , '1') as vyar030h
, ((cast(response AS json))->>'VZAR031') as VZAR031
, recode_into(((cast(response AS json))->>'QNAD0101[VNAD010a]'), 'Y' , '1') as vnaD010a 
, recode_into(((cast(response AS json))->>'QNAD0102[VNAD010ba]'), 'Y' , '1') as vnaD010ba
, recode_into(((cast(response AS json))->>'QNAD0102[VNAD010bb]'), 'Y' , '1') as vnaD010bb
, recode_into(((cast(response AS json))->>'QNAD0102[VNAD010bc]'), 'Y' , '1') as vnaD010bc
, recode_into(((cast(response AS json))->>'QNAD0102[VNAD010bd]'), 'Y' , '1') as vnaD010bd
, recode_into(((cast(response AS json))->>'QNAD0102[VNAD010be]'), 'Y' , '1') as vnaD010be
, ((cast(response AS json))->>'VNAD011be') as VNAD011be
, recode_into(((cast(response AS json))->>'QNAD0103[VNAD010ca]'), 'Y' , '1') as vnaD010ca
, recode_into(((cast(response AS json))->>'QNAD0103[VNAD010cb]'), 'Y' , '1') as vnaD010cb
, recode_into(((cast(response AS json))->>'QNAD0103[VNAD010cc]'), 'Y' , '1') as vnaD010cc
, ((cast(response AS json))->>'VNAD011cc') as VNAD011cc
, recode_into(((cast(response AS json))->>'QNAD0104[VNAD010da]'), 'Y' , '1') as vnaD010da
, recode_into(((cast(response AS json))->>'QNAD0104[VNAD010db]'), 'Y' , '1') as vnaD010db
, recode_into(((cast(response AS json))->>'QNAD0104[VNAD010dc]'), 'Y' , '1') as vnaD010dc
, recode_into(((cast(response AS json))->>'QNAD0104[VNAD010dd]'), 'Y' , '1') as vnaD010dd
, recode_into(((cast(response AS json))->>'QNAD0104[VNAD010de]'), 'Y' , '1') as vnaD010de
, ((cast(response AS json))->>'VNAD011de') as VNAD011de
, recode_into(((cast(response AS json))->>'QNAD0105[VNAD010ea]'), 'Y' , '1') as vnaD010ea
, recode_into(((cast(response AS json))->>'QNAD0105[VNAD010eb]'), 'Y' , '1') as vnaD010eb
, recode_into(((cast(response AS json))->>'QNAD0105[VNAD010ec]'), 'Y' , '1') as vnaD010ec
, recode_into(((cast(response AS json))->>'QNAD0105[VNAD010ed]'), 'Y' , '1') as vnaD010ed
, ((cast(response AS json))->>'VNAD011ed') as VNAD011ed
, recode_into(((cast(response AS json))->>'QNAD0106[VNAD010fa]'), 'Y' , '1') as vnaD010fa
, recode_into(((cast(response AS json))->>'QNAD0106[VNAD010fb]'), 'Y' , '1') as vnaD010fb
, recode_into(((cast(response AS json))->>'QNAD0106[VNAD010fc]'), 'Y' , '1') as vnaD010fc
, ((cast(response AS json))->>'VNAD011fc') as VNAD011fc
, recode_into(((cast(response AS json))->>'QNAD0107[VNAD010g]'), 'Y' , '1') as vnaD010g
, recode_into(((cast(response AS json))->>'QNAD0107[VNAD010h]'), 'Y' , '1') as vnaD010h
, recode_into(((cast(response AS json))->>'QNAD0107[VNAD010i]'), 'Y' , '1') as vnaD010i
, recode_into(((cast(response AS json))->>'QNAD0107[VNAD010j]'), 'Y' , '1') as vnaD010j
, ((cast(response AS json))->>'VNAD011j') as VNAD011j
, recode_into(((cast(response AS json))->>'QNAD0108[VNAD010ka]'), 'Y' , '1') as vnaD010ka
, recode_into(((cast(response AS json))->>'QNAD0108[VNAD010kb]'), 'Y' , '1') as vnaD010kb
, recode_into(((cast(response AS json))->>'QNAD0108[VNAD010kc]'), 'Y' , '1') as vnaD010kc
, recode_into(((cast(response AS json))->>'QNAD0108[VNAD010kd]'), 'Y' , '1') as vnaD010kd
, ((cast(response AS json))->>'VNAD011kd') as VNAD011kd
, recode_into(((cast(response AS json))->>'VNAD010x'), '0' , NULL) as VNAD010x
, ((cast(response AS json))->>'VNAD010y') as VNAD010y
, recode_into(((cast(response AS json))->>'VNAD015a'), '999', '-1') as VNAD015a
, recode_into(((cast(response AS json))->>'VNAD015ba'), '999', '-1') as VNAD015ba
, recode_into(((cast(response AS json))->>'VNAD015bb'), '999', '-1') as VNAD015bb
, recode_into(((cast(response AS json))->>'VNAD015bc'), '999', '-1') as VNAD015bc
, recode_into(((cast(response AS json))->>'VNAD015bd'), '999', '-1') as VNAD015bd
, recode_into(((cast(response AS json))->>'VNAD015be'), '999', '-1') as VNAD015be
, recode_into(((cast(response AS json))->>'VNAD015ca'), '999', '-1') as VNAD015ca
, recode_into(((cast(response AS json))->>'VNAD015cb'), '999', '-1') as VNAD015cb
, recode_into(((cast(response AS json))->>'VNAD015cc'), '999', '-1') as VNAD015cc
, recode_into(((cast(response AS json))->>'VNAD015da'), '999', '-1') as VNAD015da
, recode_into(((cast(response AS json))->>'VNAD015db'), '999', '-1') as VNAD015db
, recode_into(((cast(response AS json))->>'VNAD015dc'), '999', '-1') as VNAD015dc
, recode_into(((cast(response AS json))->>'VNAD015dd'), '999', '-1') as VNAD015dd
, recode_into(((cast(response AS json))->>'VNAD015de'), '999', '-1') as VNAD015de
, recode_into(((cast(response AS json))->>'VNAD015ea'), '999', '-1') as VNAD015ea
, recode_into(((cast(response AS json))->>'VNAD015eb'), '999', '-1') as VNAD015eb
, recode_into(((cast(response AS json))->>'VNAD015ec'), '999', '-1') as VNAD015ec
, recode_into(((cast(response AS json))->>'VNAD015ed'), '999', '-1') as VNAD015ed
, recode_into(((cast(response AS json))->>'VNAD015fa'), '999', '-1') as VNAD015fa
, recode_into(((cast(response AS json))->>'VNAD015fb'), '999', '-1') as VNAD015fb
, recode_into(((cast(response AS json))->>'VNAD015fc'), '999', '-1') as VNAD015fc
, recode_into(((cast(response AS json))->>'VNAD015g'), '999', '-1') as VNAD015g
, recode_into(((cast(response AS json))->>'VNAD015h'), '999', '-1') as VNAD015h
, recode_into(((cast(response AS json))->>'VNAD015i'), '999', '-1') as VNAD015i
, recode_into(((cast(response AS json))->>'VNAD015j'), '999', '-1') as VNAD015j
, recode_into(((cast(response AS json))->>'VNAD015ka'), '999', '-1') as VNAD015ka
, recode_into(((cast(response AS json))->>'VNAD015kb'), '999', '-1') as VNAD015kb
, recode_into(((cast(response AS json))->>'VNAD015kc'), '999', '-1') as VNAD015kc
, recode_into(((cast(response AS json))->>'VNAD015kd'), '999', '-1') as VNAD015kd
, recode_into(((cast(response AS json))->>'VYAZ010'), '999', '-1') as vyaz010
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020x]'), 'Y' , '1') as VYAZ020x
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020a]'), 'Y' , '1') as vyaz020a
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020b]'), 'Y' , '1') as vyaz020b
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020c]'), 'Y' , '1') as vyaz020c
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020d]'), 'Y' , '1') as vyaz020d
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020e]'), 'Y' , '1') as vyaz020e
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020f]'), 'Y' , '1') as vyaz020f
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020g]'), 'Y' , '1') as vyaz020g
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020h]'), 'Y' , '1') as vyaz020h
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020i]'), 'Y' , '1') as vyaz020i
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020j]'), 'Y' , '1') as vyaz020j
, ((cast(response AS json))->>'VYAZ021j') as VYAZ021j
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020k]'), 'Y' , '1') as vyaz020k
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020l]'), 'Y' , '1') as vyaz020l
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020m]'), 'Y' , '1') as vyaz020m
, recode_into(((cast(response AS json))->>'QYAZ020[VYAZ020n]'), 'Y' , '1') as vyaz020n
, ((cast(response AS json))->>'VYAZ021n') as VYAZ021n
, recode_into(((cast(response AS json))->>'VZAO010'), '999', NULL) as vzao010
, ((cast(response AS json))->>'VZAO011') as VZAO011
, recode_into(((cast(response AS json))->>'VZAT010'), '999', NULL) as vzat010
, recode_into(recode_into(((cast(response AS json))->>'VZAT020'), '999', NULL), '777', NULL) as vzat020
, recode_into(((cast(response AS json))->>'VZAT030'), '999', NULL) as vzat030
, recode_into(((cast(response AS json))->>'VZAT040'), '999', NULL) as vzat040
, recode_into(((cast(response AS json))->>'VZAT050'), '999', NULL) as vzat050
, recode_into(((cast(response AS json))->>'VZAT060'), '999', NULL) as vzat060
, recode_into(((cast(response AS json))->>'VZAT070'), '999', NULL) as vzat070
, NULL as vzat080
, NULL as VZAT081
, recode_into(((cast(response AS json))->>'VZAT100'), '999', NULL) as vzat100
, recode_into(((cast(response AS json))->>'VZAU010'), '999', NULL) as vzau010
, ((cast(response AS json))->>'VZAU011') as VZAU011
, ((cast(response AS json))->>'VZAU020') as VZAU020
, recode_into(((cast(response AS json))->>'VZAU021'), '999', NULL) as VZAU021
, ((cast(response AS json))->>'VZAU030') as VZAU030
, recode_into(((cast(response AS json))->>'VZAU031'), '999', NULL) as VZAU031
, NULL as vzau040
, NULL as VZAU041
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050x]'), 'Y' , '1') as VZAU050x
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050y]'), 'Y' , '1') as VZAU050y
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050a]'), 'Y' , '1') as VZAU050a
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050b]'), 'Y' , '1') as VZAU050b
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050c]'), 'Y' , '1') as VZAU050c
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050d]'), 'Y' , '1') as VZAU050d
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050e]'), 'Y' , '1') as VZAU050e
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050f]'), 'Y' , '1') as VZAU050f
, recode_into(((cast(response AS json))->>'QZAU050[VZAU050g]'), 'Y' , '1') as VZAU050g
, ((cast(response AS json))->>'VZAU051') as VZAU051
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010x]'), 'Y' , '1') as VYAP010x
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010y]'), 'Y' , '1') as vyap010y
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010a]'), 'Y' , '1') as vyap010a
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010b]'), 'Y' , '1') as vyap010b
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010c]'), 'Y' , '1') as vyap010c
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010d]'), 'Y' , '1') as vyap010d
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010e]'), 'Y' , '1') as vyap010e
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010f]'), 'Y' , '1') as vyap010f
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010g]'), 'Y' , '1') as vyap010g
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010h]'), 'Y' , '1') as vyap010h
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010i]'), 'Y' , '1') as vyap010i
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010j]'), 'Y' , '1') as vyap010j
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010k]'), 'Y' , '1') as vyap010k
, recode_into(((cast(response AS json))->>'QYAP010[VYAP010l]'), 'Y' , '1') as vyap010l
, ((cast(response AS json))->>'VZAP011') as VZAP011
, ((cast(response AS json))->>'VZAP020') as VZAP020
, recode_into(((cast(response AS json))->>'VZAP021'), '999', NULL) as VZAP021
, NULL as VZAP022
, ((cast(response AS json))->>'VZAP030') as VZAP030
, recode_into(((cast(response AS json))->>'VZAP031'), '999', NULL) as VZAP031
, NULL as VZAP032
, ((cast(response AS json))->>'VZAP040') as VZAP040
, recode_into(((cast(response AS json))->>'VZAP041'), '999', NULL) as VZAP041
, NULL as VZAP042
, ((cast(response AS json))->>'QYAP080[VYAP080a]') as VYAP080a
, ((cast(response AS json))->>'QYAP080[VYAP080b]') as VYAP080b
, ((cast(response AS json))->>'QYAP080[VYAP080c]') as VYAP080c
, recode_into(((cast(response AS json))->>'VYAP080x'), '999', NULL) as VYAP080x
, ((cast(response AS json))->>'QYAP090[VYAP090a]') as VYAP090a
, ((cast(response AS json))->>'QYAP090[VYAP090b]') as VYAP090b
, ((cast(response AS json))->>'QYAP090[VYAP090c]') as VYAP090c
, recode_into(((cast(response AS json))->>'VYAP090x'), '999', NULL) as VYAP090x

,((cast(response AS json))->>'cgiZA') as cgiZA,
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

WHERE module = 'ch.suedhang.apps.actinfo_aus';