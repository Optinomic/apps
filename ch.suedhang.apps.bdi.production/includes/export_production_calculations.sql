SELECT

  -- START:  Optinoimc Default |  Needed for Export-Toolbox
  survey_response_view.patient_id as optinomic_patient_id,
  survey_response_view.stay_id as optinomic_stay_id,
  survey_response_view.event_id as optinomic_event_id,
  survey_response_view.survey_response_id as optinomic_survey_response_id,
  survey_response_view.filled as optinomic_survey_filled,
  ((cast(response AS json))->>'id') as optinomic_limesurvey_id,
  -- END:  Optinoimc Default |  Needed for Export-Toolbox
  
  stay.cis_fid/100 as FID,
  ((cast(response AS json))->>'Erhebungszeitpunkt') as erhebungszeitpunkt,
  ((cast(response AS json))->>'Datum') as datum,

  ((cast(response AS json))->>'BDI1') as bdi1,
  ((cast(response AS json))->>'BDI2') as bdi2,
  ((cast(response AS json))->>'BDI3') as bdi3,
  ((cast(response AS json))->>'BDI4') as bdi4,
  ((cast(response AS json))->>'BDI5') as bdi5,
  ((cast(response AS json))->>'BDI6') as bdi6,
  ((cast(response AS json))->>'BDI7') as bdi7,
  ((cast(response AS json))->>'BDI8') as bdi8,
  ((cast(response AS json))->>'BDI9') as bdi9,
  ((cast(response AS json))->>'BDI10') as bdi10,
  ((cast(response AS json))->>'BDI11') as bdi11,
  ((cast(response AS json))->>'BDI12') as bdi12,
  ((cast(response AS json))->>'BDI13') as bdi13,
  ((cast(response AS json))->>'BDI14') as bdi14,
  ((cast(response AS json))->>'BDI15') as bdi15,
  ((cast(response AS json))->>'BDI16') as bdi16,
  ((cast(response AS json))->>'BDI17') as bdi17,
  ((cast(response AS json))->>'BDI18') as bdi18,
  ((cast(response AS json))->>'BDI19') as bdi19,
  ((cast(response AS json))->>'BDI20') as bdi20,
  ((cast(response AS json))->>'BDI21') as bdi21, 

  -- START:  Calculation Vaules
  cast(calc.value as json)->0#>>'{score, score}' as bdi_score,
  cast(calc.value as json)->0#>>'{score, current_range, interpretation_de}' as bdi_interpretation
  -- END:  Calculation Vaules

FROM "survey_response_view" 
LEFT JOIN patient ON(survey_response_view.patient_id = patient.id) 
LEFT JOIN stay ON(survey_response_view.stay_id = stay.id) 
LEFT JOIN calculation_values AS calc ON calc.patient_id = survey_response_view.patient_id AND calc.module = survey_response_view.module

WHERE survey_response_view.module = 'ch.suedhang.apps.bdi.production';

