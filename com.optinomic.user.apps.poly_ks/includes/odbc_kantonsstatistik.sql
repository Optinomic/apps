SELECT
  PA.PID id_pid,
  PA.PAID id_paid,
  FA.FID id_fid,
  FA.FAID id_faid,
  CASE FA.FID
    WHEN '1' THEN (PA.PID || '01' || '00')
    WHEN '2' THEN (PA.PID || '02' || '00') 
    WHEN '3' THEN (PA.PID || '03' || '00') 
    WHEN '4' THEN (PA.PID || '04' || '00') 
    WHEN '5' THEN (PA.PID || '05' || '00') 
    WHEN '6' THEN (PA.PID || '06' || '00') 
    WHEN '7' THEN (PA.PID || '07' || '00') 
    WHEN '8' THEN (PA.PID || '08' || '00') 
    WHEN '9' THEN (PA.PID || '09' || '00') 
    ELSE (PA.PID || FA.FID || '00') 
  END CIS_FID,  

  FA.EINTRITT EINTRITT,
  FA.ZEITEINTRITT ZEITEINTRITT,
  FA.AUSTRITT AUSTRITT,
  FA.ZEITAUSTRITT ZEITAUSTRITT,
  RTRIM(GetDfByAnbindung(FA.FAID, 'Fa', 'Abkuerzung', 'Org', 'Org')) ORG_CURRENT,

  CASE GetDisStationAtDate(TRUNC(CURRENT_DATE), FA.FAID)
    WHEN 'A2' THEN 'EAS' 
    WHEN 'A3' THEN 'EAS' 
    WHEN 'C0' THEN 'EAS' 
    WHEN 'B0' THEN 'EP' 
    WHEN 'B1' THEN 'EP' 
    WHEN 'B2' THEN 'EP' 
    WHEN 'C1' THEN 'EP' 
    WHEN 'C2' THEN 'EP' 
    WHEN 'D0' THEN 'EP' 
    WHEN 'D1' THEN 'EP' 
    WHEN 'TK' THEN 'TK' 
    ELSE '?' 
  END ORG,  

  CASE BELEGUNG.STATISTIK_KANTON_AUSTRITTSART
    WHEN 'regulärer Austritt' THEN 1
    WHEN 'Abbruch PatientIn' THEN 2
    WHEN 'Abbruch Klinik' THEN 3
    WHEN 'Uebertritt in andere Klinik' THEN 4
    WHEN 'Uebertritt innerhalb des Südhangs' THEN 5
    WHEN 'auf Initiative Dritter' THEN 6
    WHEN 'Tod (nicht Suizid)' THEN 7
    WHEN 'Suizid während der Behandlungsdauer' THEN 8
    WHEN 'anderer Grund' THEN 9
    ELSE 90 
  END AUSTRITT_TYP,  

  CASE BELEGUNG.STATISTIK_KANTON_WEITERBEH
    WHEN 'Patient gestorben' THEN 1
    WHEN 'somatische Klinik' THEN 2
    WHEN 'psychiatrische Klinik stationär' THEN 3
    WHEN 'psychiatrische Klinik teilstationär' THEN 4
    WHEN 'teilstationäre Nachbetreuung' THEN 4
    WHEN 'andere Klinik / Rehab.-zentrum' THEN 5
    WHEN 'Strafvollzugsanstalt' THEN 6
    WHEN 'andere stationäre Behandlung' THEN 7
    WHEN 'Südhang stationär' THEN 8
    WHEN 'Fachstelle für Alkoholprobleme' THEN 9
    WHEN 'Therapeutische WG' THEN 10
    WHEN 'Sozialdienst' THEN 11
    WHEN 'Sozialdienst / Fachstelle' THEN 11
    WHEN 'Vormund / Beistand' THEN 12
    WHEN 'PsychiaterIn' THEN 13
    WHEN 'Hausarzt / Hausärztin' THEN 14
    WHEN 'Psychologe / Psychologin' THEN 15
    WHEN 'TherapeutIn der Klinik ambulant' THEN 16
    WHEN 'andere ambulante Betreuung' THEN 17
    WHEN 'keine Nachbetreuung nötig' THEN 18
    WHEN 'Angehörige' THEN 19
    WHEN 'keine Nachbetreuung, obwohl nötig' THEN 20
    WHEN 'Pflegepersonal, Spitex' THEN 21
    WHEN 'Tagesklinik Südhang' THEN 22
    WHEN 'sonstige' THEN 23
    ELSE 90 
  END WEITERBEHANDLUNG_TYP,  

  CASE BELEGUNG.STATISTIK_KANTON_WOHNSITUATION
    WHEN '00 gestorben' THEN 00
    WHEN '11 Zuhause, alleine' THEN 11
    WHEN '12 Zuhause, mit anderen' THEN 12
    WHEN 'alte Wohnung / Wohnort' THEN 12
    WHEN '20 Krankenheim, Pflegeheim' THEN 20
    WHEN '31 Wohnheim' THEN 31
    WHEN '32 Altersheim, andere sozialmed. Instit.' THEN 32
    WHEN '40 Psychiatrische Klinik' THEN 40
    WHEN '50 Rehabilitationsklinik' THEN 50
    WHEN '60 anderes Krankenhaus (Akutspital)' THEN 60
    WHEN '70 Strafvollzugsanstalt' THEN 70
    WHEN '81 ohne festen Wohnsitz' THEN 81
    WHEN '82 andere' THEN 82
    ELSE 90 
  END WOHNSITUATION_TYP,  

  CASE BELEGUNG.STATISTIK_KANTON_NEUEADRESSE
    WHEN 'Neue Adresse oder Telefonnummer' THEN 1
    ELSE 0 
  END ADRESSE_TYP,  

  BELEGUNG.*

FROM 
  DISDBA.FA FA,
  DISDBA.PA PA,
  (SELECT
     DocDBA.Dokument.FAID,
     DocADMIN.ELDAT_CUST_1151.*
   FROM
     DocAdmin.ELDAT_CUST_1151, DocDba.Dokument, DocDba.Dokument_Version
   WHERE
     ELDAT_CUST_1151.Dokument_Id = Dokument_Version.Dokument_Id AND
     ELDAT_CUST_1151.Version_Id = Dokument_Version.Version_Id AND
     ELDAT_CUST_1151.Struktur_Element_Id = 1115 AND
     Dokument.Dokument_Id = Dokument_Version.Dokument_Id AND
     Dokument_Version.Dokument_Id = Dokument.Dokument_Id AND
     Dokument_Version.Dokument_Id = ELDAT_CUST_1151.Dokument_Id AND
     Dokument_Version.Ist_Aktuell = 'T'
  ) BELEGUNG

WHERE 
   ((PA.PAID = FA.PAID) AND (FA.FAID = BELEGUNG.FAID)) AND
   FA.FID is not null



