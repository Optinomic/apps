SELECT /*+ NO_PUSH_PRED */
-- count(*) over (partition by 1) as zaehler,
 Fa.FaId As interne_Fall_Nummer,
 Pa.PaId As interne_Patienten_Nummer,
 Fa.Eintritt AS Fall_Eintritt,
 Fa.Austritt AS Fall_Austritt,
 RTRIM(SUBSTR(GetDfTxt(Pa.PaId, Fa.FaId, -1, 'Az', 'HAz'),1,1900)) AS Fall_HausArztText,
 SUBSTR(Fa.Zimmernummer, 1, 5) AS Fall_Zimmernummer,
 RTRIM(SUBSTR(GetDfKurz(Pa.PaId, Fa.FaId, -1, 'Org', 'Org'),1,1900)) AS Fall_OrgeinheitKurz,
 RTRIM(SUBSTR(GetDfKurz(Pa.PaId, Fa.FaId, -1, 'Kl', 'Kl'),1,1900)) AS Fall_KlasseKurz,
 Pa.Name As Patient_Name,
 Pa.Vorname As Patient_Vorname,
 DECODE(Pa.Geburtsdatum, TO_DATE('30.12.1899', 'dd.mm.yyyy'), TO_DATE(''), Pa.Geburtsdatum) AS Patient_Geburtsdatum,
 trunc(abs(trunc(months_between(pa.geburtsdatum, sysdate))) / 12) as ALTER_SYSDATUM,


 DECODE (SEId728C.GRID_COLOR_COMBO,  
 Null, 0, 
 
             
 DECODE (
  instr(SEId728C.GRID_COLOR_COMBO, 'gestoppt'),
 0, 0, 1)  

 ) as SORTIERUNG,
  

   
 SEId728C.*

FROM Pa, Fa,/* Df, DfAkt, Az, PASuchfelder,    */
(SELECT
     DocADMIN.ELDAT_CUSTDET_649.*,
     DocDBA.Dokument.FaId
   FROM
     DocAdmin.ELDAT_CUSTDET_649, DocDba.Dokument, DocDba.Dokument_Version, DocDba.Struktur_element
   WHERE
     ELDAT_CUSTDET_649.Dokument_Id = Dokument_Version.Dokument_Id AND
     ELDAT_CUSTDET_649.Version_Id = Dokument_Version.Version_Id AND
     Struktur_element.register_guid = (SELECT register_guid
                            FROM struktur_element
                           WHERE struktur_element_id =859) AND
     ELDAT_CUSTDET_649.struktur_element_id = Struktur_element.struktur_element_id AND
     Dokument.Dokument_Id = Dokument_Version.Dokument_Id AND
     Dokument_Version.Dokument_Id = Dokument.Dokument_Id AND
     Dokument_Version.Dokument_Id = ELDAT_CUSTDET_649.Dokument_Id AND
     Dokument_Version.Ist_Aktuell = 'T'
     ) SEID728C

WHERE
  SEId728C.STATUS_SORT = 1 AND
  Fa.Paid = :PID AND
  Fa.Faid = :FID AND
  Fa.PaId     = Pa.PaId
  

and SEId728C.FaId (+) =Fa.FaId


ORDER BY

SEId728C.VERABREICHUNG, SORTIERUNG, SEId728C.MEDIKAMENT, SEID728C.D_BEGINN                         
