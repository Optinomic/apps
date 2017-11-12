
# Optinomic Export-Toolbox.

Easy export of survey responses with calculation values.


![bildschirmfoto 2017-11-11 um 13 10 28](https://user-images.githubusercontent.com/2470873/32689283-e595bace-c6e1-11e7-96a9-0a79d4ce1b7a.png)


Implementierte Features:
- [x] Filter
- [x] Einstellungen (Delimiter, Inhaltsblöcke) global übersteuern
- [x] Run über den Button "[ +  HINZUFÜGEN (LIVE-RUN)]"

![bildschirmfoto 2017-11-11 um 13 10 58](https://user-images.githubusercontent.com/2470873/32689285-ef12dbd6-c6e1-11e7-9bf0-fc94aed048c3.png)



=> Falls Filter aktiv sind und die Optionen übersteuert werden, muss allenfalls erneut der Filter [ANWENDEN] erneut gedrückt werden, damit diese Optionen übersteuert werden. 


### Export-Toolbox | CREATE
Die Export-Toolbox verfügt über einen CREATE-Prozess:
1. Datenquelle selektieren  
2. Datenfelder benennen und sortieren
3. Optionen festlegen 
4. Export-Definition JSON-File herunterladen.

Das so erzeugte JSON-File, kann direkt unter "[ +  HINZUFÜGEN (LIVE-RUN)]" ausgeführt, getestet und modifiziert werden.


### Entwickler

In der Export-Definiton können auch Funktionen übergeben werden:
~~~~
{ "name": "feldname", "path": "_function", "function": "return 'TODO';" },
~~~~


#### Technical
Alle Definitionen werden im folgenden Verzeichnis abgelegt:
https://github.com/Optinomic/apps/tree/master/org.optinomic.export.toolbox/definitions

=>  Neu erstellte Export-Definitionen (welche dauerhaft zur Verfügung gestellt werden sollen) einfach in dieses Verzeichnis kopieren und [hier den Import hinzufügen](https://github.com/Optinomic/apps/blob/master/org.optinomic.export.toolbox/elements/view.html#L278-L282).  



# Anschrift

![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)     

*Optinomic GmbH*   
*Haldenstrasse 7*     
*CH - 8942 Oberrieden*     
*+41(0)44 508 26 76*    
*info@optinomic.com*   
*[www.optinomic.com](http://www.optinomic.com)*   

