SELECT
 NULL,
  DECODE(Pa.Geburtsdatum, TO_DATE('30.12.1899', 'dd.mm.yyyy'), '', Pa.Geburtsdatum)    AS "Patient_Geburtsdatum_F#500#", 
  Pa.Name || ' ' || Pa.Vorname                                                         AS "Patient_NameVorname_F#547#",
 
  decode(pa.geschlecht, 1, 'Hr. ', 2, 'Fr. ', '')  ||  pa.NAME || ' ' ||  pa.VORNAME   AS "Patient_NameVorname_F#547#",
  trunc(abs(trunc(months_between(pa.geburtsdatum, sysdate))) / 12)                     AS "ALTER_SYSDATUM",
  GetDfByPF(fa.paid, fa.faid, 'Abkuerzung', 'BmFa1', 'BmFa1')                          AS "WARTELISTE",        
  --abs(trunc(fa.DATKOSTENGUTSPR - Fa.Eintritt))                                         AS "ANZ_TAGE_KOGU"                                                                                                                                                                         
  --trunc(abs(trunc(days_between(Fa.Eintritt, sysdate))))                                AS "BEHANDLUNGSDAUER",

  pa.plz || ' ' || pa.ort || ' (' || pa.kanton  || ')'                                 AS "PLZ_Ort_Kanton",
  pa.beruf                                                                             AS "BERUF",          
  To_Char(fa.DATKOSTENGUTSPR,'dd.mm.yyyy')                                             AS "KOGU_ALT",   
  To_Char(fa.DATKOSTENGUTSPR2,'dd.mm.yyyy')                                            AS "KOGU2",
  RTRIM(GetDfByAnbindung(Fa.FaId, 'Fa', 'GA_KOSTENGUTSPR', 'Ga', 'Ga1'))               AS "KOGU",        
  To_Char(Fa.Austritt,'dd.mm.yy')                                                      AS "Fall_Austritt_Datum_F#350#",
  --RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'Zl', 'Zl'))                                AS "Fall_Ziel",      
  Decode(RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'Zl', 'Zl')),'00.00.0000','',RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'Zl', 'Zl')))  AS "Fall_Ziel",  
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Abkuerzung', 'Az', 'BAz'))                        AS "Fall_BehanArzt_Kuerzel_F#366#",
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'BmFa4', 'BmFa4'))                          AS "Fall_Bemerkungen4_Text_F#661#", 
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'Bf', 'Bf'))                                AS "Fall_Besonderheiten_Tex_F#383#",
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Code', 'Kg', 'Kg'))                               AS "Fall_Kategorie_Code_F#475#",       
  To_Char(Fa.Eintritt,'dd.mm.yy')                                                      AS "Fall_Eintritt_Datum_F#391#",
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Code', 'Org', 'Org'))                             AS "Fall_Orgeinheit_Code_F#481#", 
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Abkuerzung', 'Org', 'Org'))                       AS "Fall_Orgeinheit_KurzBez_F#611#", 
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'Txt', 'Org', 'Org'))                              AS "Fall_Orgeinheit_Text_F#482#", 
  RTRIM(GetDfByPF(Pa.PaId, Fa.FaId, 'ZusatzText', 'Org', 'Org'))                       AS "Fall_Orgeinheit_Zusatzt_F#483#",       
  Pa.PID || ', ' || Fa.FID                                                             AS "Fall_PIDFID_F#2071#",
  Fa.Zimmernummer                                                                      AS "Fall_Zimmer_Nummer_F#484#",
  GetDisZimmerAtTime(:dteLeft, Fa.FaId)                                                AS "Fall_ZimmernummerDIS",
  --Fa.Zimmertelefon                                                                     AS "Fall_Zimmer_Telefon_F#485#",
  zimmerrs.telpriv                                                                     AS "Fall_Zimmer_Telefon_F#485#",
  :dteLeft                                                                             AS "dteLeft",  
  :dteRight                                                                            AS "dteRight"      
FROM
 Pa, Fa, PaSuchfelder, Akt, 

(SELECT
     DocADMIN.ELDAT_CUST_1215.*,
     DocDBA.Dokument.FaId
   FROM
     DocAdmin.ELDAT_CUST_1215, DocDba.Dokument, DocDba.Dokument_Version
   WHERE
     ELDAT_CUST_1215.Dokument_Id = Dokument_Version.Dokument_Id AND
     ELDAT_CUST_1215.Version_Id = Dokument_Version.Version_Id AND
     ELDAT_CUST_1215.Struktur_Element_Id = 1139 AND
     Dokument.Dokument_Id = Dokument_Version.Dokument_Id AND
     Dokument_Version.Dokument_Id = Dokument.Dokument_Id AND
     Dokument_Version.Dokument_Id = ELDAT_CUST_1215.Dokument_Id AND
     Dokument_Version.Ist_Aktuell = 'T'
     ) SEId_AG,


 (                              
select b.faid as faid, m.tel_privat as telpriv, b.belid from
  mitarbeiter m, zimmer z, bel b
where
  z.id = m.zimmer_id
  and m.id = b.rsid
  and b.belcode like 'D%'
  and b.beginn <=:dteLeft
  and b.ende >= :dteRight ) zimmerrs

WHERE
 Fa.PaId  = Pa.PaId AND
 PaSuchfelder.PaId = Pa.PaId AND
 Akt.FaId = Fa.FaId And                                                              
 Fa.Eintritt <= :dteRight AND
 Fa.AbschlussDatum >= :dteLeft AND
 SEId_AG.FaId (+) = Fa.FaId AND

 GetDfByPF(Pa.PaId, Fa.FaId, 'Code', 'Kg', 'Kg') = 'S' AND
 GetDfByPF(Pa.PaId, Fa.FaId, 'Code', 'Org', 'Org') = '14' AND
 Fa.Zimmernummer <> ' ' AND         
 ( (Fa.Austritt is null) OR (Fa.Austritt >= :dteLeft) ) AND         
 zimmerrs.belid = (
    SELECT max(belid) FROM bel 
    where 
      belcode like 'D%' 
      and faid = fa.faid
      and beginn <=:dteLeft 
      and ende >= :dteRight                        
 )                                                                                                           
ORDER BY
 GetDfByPF(Pa.PaId, Fa.FaId, 'Code', 'Org', 'Org'),  "Fall_ZimmernummerDIS" asc                                   
