SELECT 
    p.id as pid,
    stay.patient as patient_id,
    stay.id as stay_id,
    stay.cis_fid 

    
    
FROM patient AS p

LEFT JOIN stay ON(p.id = stay.patient) 
LEFT JOIN (SELECT *, cast(value as json) AS json FROM annotations) AS ann 
ON ann.module = 'com.optinomic.user.apps.poly_ks' 
AND (ann.json#>>'{data,CIS_FID}' = stay.cis_fid::text)

