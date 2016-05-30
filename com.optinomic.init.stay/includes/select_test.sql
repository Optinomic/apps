
1.)
SELECT 
*, 
cast(value as json) AS json
FROM annotations r


2.)
SELECT 
*, 
((cast(value AS json))->>'init_stay') as fnr,
cast(value as json) AS json
FROM annotations r
WHERE module = 'com.optinomic.init.stay'


3.) 

SELECT *
FROM   json_array_elements(
  '[{"name": "Toby", "occupation": "Software Engineer"},
    {"name": "Zaphod", "occupation": "Galactic President"} ]'
  ) AS elem
WHERE elem->>'name' = 'Toby';


4.)

https://www.postgresql.org/docs/current/static/functions-json.html#FUNCTIONS-JSON-TABLE


SELECT 
*, 
((cast(value AS json))->>'init_stay') as fnr,
((cast(value AS json))->>'init_stay')::json#>'2' as fnr,
cast(value as json) AS json
FROM annotations r
WHERE module = 'com.optinomic.init.stay'



