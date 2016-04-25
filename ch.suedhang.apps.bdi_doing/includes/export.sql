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