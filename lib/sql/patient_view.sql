SELECT 
  CASE WHEN patient_view.gender='Male' THEN 'Herr' ELSE 'Frau' END AS patient_ansprache,
  CASE WHEN patient_view.gender='Male' THEN 'Mr.' ELSE 'Mrs.' END AS patient_speech,
  COALESCE(patient_view.last_name, '') || ' ' || COALESCE(patient_view.first_name, '') AS patient_name,
  to_char(birthdate, 'DD.MM.YYYY' ) as patient_birthdate,
  date_part('year',age(birthdate)) as patient_age,
  to_char(birthdate, 'DD.MM.YYYY' )  ||  ' | '  || date_part('year',age(birthdate)) as patient_birthday_age,
* 
FROM patient_view