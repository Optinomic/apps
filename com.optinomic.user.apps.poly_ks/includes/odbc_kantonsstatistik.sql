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



