SELECT

  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox

  stay.cis_fid/100 as FID,
  ((cast(response AS json))->>'Erhebungszeitpunkt') as Erhebungszeitpunkt,
  ((cast(response AS json))->>'Substanz') as Substanzangabe,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'SubstAndere') ELSE NULL END as Substanz,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE1]') ELSE ((cast(response AS json))->>'AASE[AASE1]') END as aase1,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE2]') ELSE ((cast(response AS json))->>'AASE[AASE2]') END as aase2,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE3]') ELSE ((cast(response AS json))->>'AASE[AASE3]') END as aase3,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE4]') ELSE ((cast(response AS json))->>'AASE[AASE4]') END as aase4,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE5]') ELSE ((cast(response AS json))->>'AASE[AASE5]') END as aase5,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE6]') ELSE ((cast(response AS json))->>'AASE[AASE6]') END as aase6,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE7]') ELSE ((cast(response AS json))->>'AASE[AASE7]') END as aase7,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE8]') ELSE ((cast(response AS json))->>'AASE[AASE8]') END as aase8,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE9]') ELSE ((cast(response AS json))->>'AASE[AASE9]') END as aase9,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE10]') ELSE ((cast(response AS json))->>'AASE[AASE10]') END as aase10,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE11]') ELSE ((cast(response AS json))->>'AASE[AASE11]') END as aase11,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE12]') ELSE ((cast(response AS json))->>'AASE[AASE12]') END as aase12,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE13]') ELSE ((cast(response AS json))->>'AASE[AASE13]') END as aase13,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE14]') ELSE ((cast(response AS json))->>'AASE[AASE14]') END as aase14,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE15]') ELSE ((cast(response AS json))->>'AASE[AASE15]') END as aase15,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE16]') ELSE ((cast(response AS json))->>'AASE[AASE16]') END as aase16,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE17]') ELSE ((cast(response AS json))->>'AASE[AASE17]') END as aase17,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE18]') ELSE ((cast(response AS json))->>'AASE[AASE18]') END as aase18,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE19]') ELSE ((cast(response AS json))->>'AASE[AASE19]') END as aase19,
  CASE WHEN ((cast(response AS json))->>'Substanz') = '2' THEN ((cast(response AS json))->>'AASEandere[AASE20]') ELSE ((cast(response AS json))->>'AASE[AASE20]') END as aase20,

   -- START:  Calculation Values
  cast(calc.value as json)->0#>>'{score}' as AASE_gesamt,
  cast(calc.value as json)->0#>>'{score_entzugserscheinungen}' as AASE_entzugserscheinungen,
  cast(calc.value as json)->0#>>'{score_negativer_affekt}' as AASE_negativer_affekt,
  cast(calc.value as json)->0#>>'{score_somatisches_unwohlsein}' as AASE_somatisches_unwohlsein,
  cast(calc.value as json)->0#>>'{score_soziale_situationen}' as AASE_soziale_situationen,
  cast(calc.value as json)->0#>>'{mean_entzugserscheinungen}' as AASE_entzugserscheinungen_mean,
  cast(calc.value as json)->0#>>'{mean_negativer_affekt}' as AASE_negativer_affekt_mean,
  cast(calc.value as json)->0#>>'{mean_somatisches_unwohlsein}' as AASE_somatisches_unwohlsein_mean,
  cast(calc.value as json)->0#>>'{mean_soziale_situationen}' as AASE_soziale_situationen_mean
  -- END:  Calculation Values

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 
LEFT JOIN calculation_values AS calc ON calc.patient_id = survey_response_view.patient_id AND calc.module = survey_response_view.module

WHERE survey_response_view.module = 'ch.suedhang.apps.aase-g.production';
