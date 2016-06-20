SELECT
  sr.id as survey_response_id, 
  sr.response, 
  sr.event_id, 
  sr.filled, 
  ev.patient as patient_id,
  first(s.id) as stay_id

FROM survey_responses as sr 
LEFT JOIN event as ev on ev.id = sr.event_id 
LEFT JOIN stay as s on s.patient = ev.patient and s.start <= ev.created_at and (s.stop >= ev.created_at or s.stop is null) 
GROUP BY sr.id, sr.response, sr.event_id, sr.filled, ev.patient

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