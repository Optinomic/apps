
SELECT 
((cast(value AS json))->'patient_group_selector'->>'current_eas') as EAS
FROM annotations
WHERE module = 'com.optinomic.init.stay' 


// Currently in EAS


SELECT 
patient_id as pid, *
FROM annotations
WHERE module = 'com.optinomic.init.stay' 
AND ((cast(value AS json))->'patient_group_selector'->>'current_eas') = 'true'


// Currently in EAS or had EAS

SELECT 
patient_id as pid, *
FROM annotations
WHERE module = 'com.optinomic.init.stay' 
AND ((((cast(value AS json))->'patient_group_selector'->>'current_eas') = 'true') OR  (((cast(value AS json))->'patient_group_selector'->>'past_eas') = 'true'))


