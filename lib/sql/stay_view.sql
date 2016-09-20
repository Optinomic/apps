SELECT 

  id as id,
  cis_fid as cis_fid,
  patient as patient,
  first_contact as first_contact,
  start as start,
  to_char(start, 'YYYY' ) as start_year,
  to_char(start, 'WW' ) as start_week,
  to_char(start, 'YYYY' )  ||  ', '  ||  to_char(start, 'WW' ) as start_year_week,
  stop as stop,
  to_char(stop, 'YYYY' ) as stop_year,
  to_char(stop, 'WW' ) as stop_week,
  to_char(stop, 'YYYY' )  ||  ', '  ||  to_char(start, 'WW' ) as stop_year_week,
  status as status,
  stop_status as stop_status,
  lead_therapist as lead_therapist,
  lead_therapist_overwrite as lead_therapist_overwrite,
  deputy_lead_therapist as deputy_lead_therapist,
  cis_lead_doctor as cis_lead_doctor,
  phase_overwrite as phase_overwrite,
  insurance_number as insurance_number,
  insurance_provider as insurance_provider,
  service_provider as service_provider,
  class as class,
  photo as photo,
  notes as notes

FROM stay