SELECT
  PA.PID id_pid,
  FA.FID id_fid,
  


  CASE BELEGUNG.STATISTIK_KANTON_AUSTRITTSART
    WHEN 'regulärer Austritt' THEN 1
    ELSE 90 
  END AUSTRITT_TYP,

  CASE 
    WHEN BELEGUNG.STATISTIK_KANTON_AUSTRITTSART LIKE 'regulärer Austritt' THEN 1
    ELSE 90 
  END AUSTRITT_TYP_2,

  BELEGUNG.STATISTIK_KANTON_AUSTRITTSART



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



