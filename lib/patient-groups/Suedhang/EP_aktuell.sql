LEFT JOIN stay ON(p.id = stay.patient) 
LEFT JOIN (SELECT *, cast(value as json) AS json FROM annotations) AS ann ON ann.patient_id = p.id AND ann.module = 'com.optinomic.init.poly_stay' 

WHERE 
	(ann.json#>>'{aktuell_letzter,bel_selector,org_current}' = 'EP') 
AND (stay.stop is null OR stay.stop >= (now() - interval '1 day'))
AND stay.start <= now()