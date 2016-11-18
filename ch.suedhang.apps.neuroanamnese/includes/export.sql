SELECT

stay.cis_fid/100 as FID,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ001]') as Neuro_1,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ002]') as Neuro_2,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ003]') as Neuro_3,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ006]') as Neuro_6,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ007]') as Neuro_7,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ008]') as Neuro_8,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ009]') as Neuro_9,
((cast(response AS JSON)) -> 'NeuroAnamAus[SQ010]') as Neuro_10


FROM survey_response
LEFT JOIN patient ON(survey_response.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response.stay_id = stay.id) 

WHERE module = 'ch.suedhang.apps.neuroanamnese'

/*
Abstinenz
Alkohol
AndereSubstanzen
AnzahlRelaps
BefrAbstWeiter
Bemerkungen
BemerkungenAus
Date4Sub3
DateEntzug
DateRelaps
DateRelapsSub1
DateRelapsSub2
DateRelapsSub3
DateRelapsSub4
DateRelapsSub5
DateSub1
DateSub2
DateSub4
DateSub5
DrinksRelapse
Erhebungszeitpunkt
Erkrankung
FID
KonsZiel
NeuroAnamAus[SQ001]
NeuroAnamAus[SQ002]
NeuroAnamAus[SQ003]
NeuroAnamAus[SQ006]
NeuroAnamAus[SQ007]
NeuroAnamAus[SQ008]
NeuroAnamAus[SQ009]
NeuroAnamAus[SQ010]
NeuroAnamAus[SQ011]
NeuroAnamAus[SQ012]
NeuroAnamEin[SQ001]
NeuroAnamEin[SQ002]
NeuroAnamEin[SQ003]
NeuroAnamEin[SQ004]
NeuroAnamEin[SQ005]
NeuroAnamEin[SQ006]
NeuroAnamEin[SQ007]
NeuroAnamEin[SQ008]
NeuroAnamEin[SQ009]
NeuroAnamEin[SQ010]
NeuroAnamEin[SQ011]
NeuroAnamEin[SQ013]
PID
RedKonsDpM
RedKonsSD
Relaps
RelapsSub
Trinkmenge
Trinktage
WelcheRelapsSubst[SQ001]
WelcheRelapsSubst[SQ002]
WelcheRelapsSubst[SQ003]
WelcheRelapsSubst[SQ004]
WelcheRelapsSubst[SQ005]
WelcheSubstanzen[SQ001]
WelcheSubstanzen[SQ002]
WelcheSubstanzen[SQ003]
WelcheSubstanzen[SQ004]
WelcheSubstanzen[SQ005]
befrZeit
datestamp
id
lastpage
optinomixHASH
startdate
startlanguage
submitdate
*/