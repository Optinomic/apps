SELECT
  PA.PAID,
  PA.PID,
  FA.FAID,
  FA.FID,
  MEDIKAMENT.*

FROM DISDBA.FA FA,
     DISDBA.PA PA,
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
     ORDER BY DOKUMENT.FAID) MEDIKAMENT


WHERE PA.PAID = FA.PAID
AND FA.FAID = MEDIKAMENT.FAID

ORDER BY PA.PAID
