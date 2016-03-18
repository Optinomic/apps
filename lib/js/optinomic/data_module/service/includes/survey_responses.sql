SELECT
  sr.id as survey_response_id, 
  srf.module as module,
  sr.response, 
  sr.event_id, 
  sr.filled, 
  ev.patient as patient_id,
  first(s.id) as stay_id

FROM survey_responses as sr 
LEFT JOIN survey_response as srf on sr.id = srf.id 
LEFT JOIN event as ev on ev.id = sr.event_id 
LEFT JOIN stay as s on s.patient = ev.patient and s.start <= ev.created_at and (s.stop >= ev.created_at or s.stop is null) 
WHERE srf.module = '%module_id%'
GROUP BY sr.id, srf.module, sr.response, sr.event_id, sr.filled, ev.patient