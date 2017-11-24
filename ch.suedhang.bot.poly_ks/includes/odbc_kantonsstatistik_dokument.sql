SELECT
    DocDBA.Dokument.PaId,
    DocDBA.Dokument.FaId,
    DocADMIN.ELDAT_CUST_1151.*
 
FROM
    DocAdmin.ELDAT_CUST_1151, 
    DocDba.Dokument, 
    DocDba.Dokument_Version
WHERE
    ELDAT_CUST_1151.Dokument_Id = Dokument_Version.Dokument_Id AND
    ELDAT_CUST_1151.Version_Id = Dokument_Version.Version_Id AND
    ELDAT_CUST_1151.Struktur_Element_Id = 1115 AND
    Dokument.Dokument_Id = Dokument_Version.Dokument_Id AND
    Dokument_Version.Dokument_Id = Dokument.Dokument_Id AND
    Dokument_Version.Dokument_Id = ELDAT_CUST_1151.Dokument_Id AND
    Dokument_Version.Ist_Aktuell = 'T' 