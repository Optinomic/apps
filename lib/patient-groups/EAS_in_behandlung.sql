SELECT p.* FROM patient AS p

LEFT JOIN (SELECT *, cast(value as json) AS json FROM annotations) AS ann ON ann.patient_id = p.id AND ann.module = 'com.optinomic.init.poly_stay' 
WHERE 
	ann.json#>>'{aktuell_letzter,bel_selector,bel_id}' = '1'
	AND  ann.json#>>'{aktuell_letzter,bel_selector,phase}' = 'in_stay'
