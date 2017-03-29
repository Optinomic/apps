SELECT
  PA.PAID,
  PA.PID,
  FA.FAID,
  FA.FID,

  FA.VERSICHERUNGSNUMMER1 VERSICHERUNGSNUMMER,
  FA.EINTRITT EINTRITT,
  FA.ZEITEINTRITT ZEITEINTRITT,
  FA.AUSTRITT AUSTRITT,
  FA.ZEITAUSTRITT ZEITAUSTRITT,
  RTRIM(GetDfByAnbindung(FA.FAID, 'Fa', 'Abkuerzung', 'Org', 'Org')) ORG_CURRENT,


  GetDisStationAtDate(TRUNC(BELEGUNG.BEGINN + 1), FA.FAID) STATION,
  GetDisZimmerAtTime(BELEGUNG.BEGINN + 1, FA.FAID) ZIMMER,
  CASE GetDisStationAtDate(TRUNC(BELEGUNG.BEGINN + 1), FA.FAID)
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
  
  TRUNC(BELEGUNG.DAUER/(24*60*60)) DAUER_TAGE,

  BELEGUNG.*

FROM DISDBA.FA FA,
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

WHERE ((PA.PAID = FA.PAID) AND (FA.FAID = BELEGUNG.FAID))

AND ((PA.PID='11873') AND (FA.FID='2'))

ORDER BY PA.PAID, FA.EINTRITT

