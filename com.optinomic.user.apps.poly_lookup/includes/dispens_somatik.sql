SELECT
     DocADMIN.ELDAT_CUST_751.*,
     DocDBA.Dokument.FaId
   FROM
     DocAdmin.ELDAT_CUST_751, DocDba.Dokument, DocDba.Dokument_Version
   WHERE
     ELDAT_CUST_751.Dokument_Id = Dokument_Version.Dokument_Id AND
     ELDAT_CUST_751.Version_Id = Dokument_Version.Version_Id AND
     ELDAT_CUST_751.Struktur_Element_Id = 858 AND
     Dokument.Dokument_Id = Dokument_Version.Dokument_Id AND
     Dokument_Version.Dokument_Id = Dokument.Dokument_Id AND
     Dokument_Version.Dokument_Id = ELDAT_CUST_751.Dokument_Id AND
     Dokument_Version.Ist_Aktuell = 'T'