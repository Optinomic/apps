\set VERBOSITY terse

CREATE OR REPLACE FUNCTION fix_event_pum (event_id integer, patient_id bigint, identifier varchar, creation_time timestamp) RETURNS integer AS $$
DECLARE
	stay_id integer;
	pum_id integer;
BEGIN
	SELECT id INTO stay_id 
	       FROM stay
	       WHERE patient = patient_id
	       	     AND stay.start <= creation_time 
		     AND (stay.stop IS NULL OR creation_time <= stay.stop + interval '14 days')
	       ORDER BY creation_time - stay.start ASC
	       LIMIT 1;
	IF stay_id IS NOT NULL THEN
   	   SELECT id INTO pum_id
   	          FROM patient_uses_module
   	          WHERE stay = stay_id AND module = identifier
   	          LIMIT 1;
              IF pum_id IS NULL THEN
   	      RAISE NOTICE 'Insert PUM for stay %', stay_id;
   	      INSERT INTO patient_uses_module (patient, module, stay, responsibility_patient_via_email, responsibility_patient_via_assessment, responsibility_nobody)
   	      	  VALUES (patient_id, identifier, stay_id, 'f', 'f', 't') RETURNING id INTO pum_id;
   	   END IF;
	   IF pum_id IS NOT NULL THEN
   	      RAISE NOTICE USING MESSAGE = 'UPDATE event SET patient_uses_module_id = ' || pum_id || ' WHERE id = ' || event_id || ';';
              --UPDATE event SET patient_uses_module_id = pum_id WHERE id = event.id;
	   END IF;
	END IF;
	RETURN 0;
END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION fix_event_pums () RETURNS integer AS $$
DECLARE
	id integer;
	patient bigint;
	module varchar;
	creation_time timestamp;
BEGIN
	FOR id, patient, module, creation_time IN SELECT event.id, event.patient, event.module, created_at FROM event LOOP
	    PERFORM fix_event_pum(id, patient, module, creation_time);
	END LOOP;
	RETURN 0;
END
$$ LANGUAGE plpgsql;

SELECT fix_event_pums();

DROP FUNCTION fix_event_pums();
DROP FUNCTION fix_event_pum(integer, bigint, varchar, timestamp);
