SELECT p.* FROM patient AS p 
LEFT JOIN (SELECT *, cast(value as json) AS json FROM annotations) AS ann 
ON ann.patient_id = p.id AND ann.module = 'com.optinomic.init.stay' 
WHERE ann.json#>>'{patient_group_selector,current_eas}' = 'true' 
OR ann.json#>>'{patient_group_selector,past_eas}' = 'true'