// Initialize Firebase
var config = {
  apiKey: "AIzaSyA7H_ptnNW1nX3x_mUt_ZdqRSOVR4obPDc",
  authDomain: "tarpsy-2018.firebaseapp.com",
  databaseURL: "https://tarpsy-2018.firebaseio.com",
  projectId: "tarpsy-2018",
  storageBucket: "tarpsy-2018.appspot.com",
  messagingSenderId: "542108232226"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();



function addData(data, collection, id_string, language_check, write) {
  var lower_collection = collection.toLowerCase();
  console.log('Data :: ', lower_collection, data[collection]);

  if (write === true) {

    data[collection].forEach(function (element) {

      var should_write = false;
      if (language_check === true) {
        if (element.SPRACHE === 'D') {
          should_write = true;
        };
      } else {
        should_write = true;
      };

      if (should_write === true) {
        if (id_string !== null) {

          db.collection(lower_collection).doc(element[id_string]).set(element)
            .then(function () {
              console.log("Document successfully written!");
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });

        } else {

          db.collection(lower_collection).add(element)
            .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });

        };
      };

    });

  };


};

function importTARMED() {

  // Done!
  fetch('Exports/LEISTUNG.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG', 'LNR', false, false));

  // Done!
  fetch('Exports/LEISTUNG_TEXT.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_TEXT', 'LNR', true, false));

  // Done!
  fetch('Exports/LEISTUNG_MENGEN_ZEIT.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_MENGEN_ZEIT', 'LNR', false, false));

  // Done!
  fetch('Exports/LEISTUNG_DIGNIQUALI.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_DIGNIQUALI', 'LNR', false, false));

  // Done!
  fetch('Exports/LEISTUNG_HIERARCHIE.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_HIERARCHIE', null, false, false));

  // Done!
  fetch('Exports/LEISTUNG_KOMBINATION.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_KOMBINATION', null, false, false));

  // Done!
  fetch('Exports/LEISTUNG_KUMULATION.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_KUMULATION', null, false, false));

  // Done!
  fetch('Exports/LEISTUNG_GRUPPEN.js')
    .then(response => response.json())
    .then(json => addData(json, 'LEISTUNG_GRUPPEN', 'LNR', false, false));

  // Done!
  fetch('Exports/CT_LEISTUNG_GRUPPEN.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_LEISTUNG_GRUPPEN', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_LEISTUNG_BLOECKE.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_LEISTUNG_BLOECKE', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_LEISTUNG_TYP.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_LEISTUNG_TYP', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_PFLICHT.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_PFLICHT', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_REGEL_EL_ABR.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_REGEL_EL_ABR', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_SEITE.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_SEITE', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_SEX.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_SEX', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_SPARTE.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_SPARTE', 'CODE', true, false));

  // Done!
  fetch('Exports/CT_SPRACHE.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_SPRACHE', 'CODE', false, false));

  // Done!
  fetch('Exports/CT_ZR_EINHEIT.js')
    .then(response => response.json())
    .then(json => addData(json, 'CT_ZR_EINHEIT', 'CODE', true, false));

  // Done
  fetch('Exports/KAPITEL_INTERPRETATION_TEXT.js')
    .then(response => response.json())
    .then(json => addData(json, 'KAPITEL_INTERPRETATION_TEXT', 'KNR', true, false));

  // Done!
  fetch('Exports/KAPITEL_TEXT.js')
    .then(response => response.json())
    .then(json => addData(json, 'KAPITEL_TEXT', 'KNR', true, false));

};

function getTARMED() {
  var leistungRef = db.collection("kapitel_text");
  var query = leistungRef.where("KNR", "==", "02");

  console.log('query', query);


  // ----------------------

  db.collection("kapitel_text").where("KNR", "==", "02")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  // ----------------------


  var leistungDoc = db.collection("kapitel_text").doc("02");

  leistungDoc.get().then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

};


function getTARMEDTarif() {

  db.collection("leistung_text").get().then(function (querySnapshot) {
    console.warn('getTARMEDTarif', querySnapshot);
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
    });
  });

};

function saveFile(content, filename) {
  var blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });
  saveAs(blob, filename);
};

function buildTARMEDKapitel() {

  var sources = [{
      "url": "Exports/KAPITEL_TEXT.js",
      "root": "KAPITEL_TEXT",
      "language_filter": true
    },
    {
      "url": "Exports/LEISTUNG_HIERARCHIE.js",
      "root": "LEISTUNG_HIERARCHIE",
      "language_filter": false
    },
    {
      "url": "Exports/KAPITEL_INTERPRETATION_TEXT.js",
      "root": "KAPITEL_INTERPRETATION_TEXT",
      "language_filter": true
    },
    {
      "url": "Exports/LEISTUNG.js",
      "root": "LEISTUNG",
      "language_filter": false
    },
    {
      "url": "Exports/LEISTUNG_TEXT.js",
      "root": "LEISTUNG_TEXT",
      "language_filter": true
    },
    {
      "url": "Exports/CT_LEISTUNG_TYP.js",
      "root": "CT_LEISTUNG_TYP",
      "language_filter": true
    },
    {
      "url": "Exports/CT_PFLICHT.js",
      "root": "CT_PFLICHT",
      "language_filter": true
    },
    {
      "url": "Exports/CT_SPARTE.js",
      "root": "CT_SPARTE",
      "language_filter": true
    },
    {
      "url": "Exports/LEISTUNG_MENGEN_ZEIT.js",
      "root": "LEISTUNG_MENGEN_ZEIT",
      "language_filter": false
    },
    {
      "url": "Exports/CT_REGEL_EL_ABR.js",
      "root": "CT_REGEL_EL_ABR",
      "language_filter": true
    },
    {
      "url": "Exports/CT_ZR_EINHEIT.js",
      "root": "CT_ZR_EINHEIT",
      "language_filter": true
    },
    {
      "url": "Exports/CT_ANAESTHESIE.js",
      "root": "CT_ANAESTHESIE",
      "language_filter": true
    },
    {
      "url": "Exports/LEISTUNG_DIGNIQUALI.js",
      "root": "LEISTUNG_DIGNIQUALI",
      "language_filter": false
    },
    {
      "url": "Exports/CT_DIGNI_QUALI.js",
      "root": "CT_DIGNI_QUALI",
      "language_filter": true
    }


  ];

  var data = {};

  var save_data_object = function (json, source) {

    if (source.language_filter) {

      data[source.root] = {};
      data[source.root].D = [];
      data[source.root].F = [];
      data[source.root].I = [];

      json[source.root].forEach(function (element) {
        if (element.SPRACHE === "D") {
          data[source.root].D.push(element);
        };
        if (element.SPRACHE === "F") {
          data[source.root].F.push(element);
        };
        if (element.SPRACHE === "I") {
          data[source.root].I.push(element);
        };
      });

    } else {
      data[source.root] = json[source.root];
    };
  };

  var checkGUELTIG = function (date_string) {
    var checkyear = 2018;
    if (parseInt(date_string.substr(date_string.length - 4)) >= checkyear) {
      return true;
    } else {
      return false;
    };

    console.log('date_string', );
  };

  var buildTree = function (data, language) {
    var tree_name = "TARMED_" + language;
    var root_name = "";
    var write_00 = false;
    var write_01 = false;
    var write_files = true;
    var tree = {};
    var titles = {};
    var title = "";


    console.log('===> 1.) buildTree', data, language);

    // -----------------------------------
    // Generelle Interpretation
    // -----------------------------------
    root_name = "00"
    titles = {
      "D": "Generelle Interpretation",
      "F": "Interprétations Générales",
      "I": "Interpretazioni generali"
    };
    title = titles[language];

    // Overwrite the same in Object
    var children = {};
    data.KAPITEL_INTERPRETATION_TEXT[language].forEach(function (element) {
      if (element.KNR === "I") {
        var mynumber = element.KAP_INTERPRET_NR;
        if (parseInt(element.KAP_INTERPRET_NR) < 10) {
          mynumber = "0" + element.KAP_INTERPRET_NR;
        };

        var name = element.KAP_INTERPRET_NR;
        if (parseInt(element.KAP_INTERPRET_NR) < 10) {
          name = "0" + name;
        };

        var content = {
          "name": name + " | " + element.KAP_INTERPRET_TITEL,
          "interpret_titel": element.KAP_INTERPRET_TITEL,
          "interpret_text": element.KAP_INTERPRET_TEXT
        };
        children[element.KAP_INTERPRET_NR] = content;
      };
    });

    // Build Array of Object
    var children_array = [];
    for (var property in children) {
      if (children.hasOwnProperty(property)) {
        // do stuff
        children_array.push(children[property]);

      }
    };

    tree[root_name] = {
      "name": title,
      "language": language,
      "children": children_array
    };



    if (write_00) {

      db.collection(tree_name).doc("00").set(tree[root_name])
        .then(function () {
          console.log(tree_name + " Document 00 successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    };


    // -----------------------------------
    // Kapitel
    // -----------------------------------
    root_name = "01"
    titles = {
      "D": "Kapitel",
      "F": "Chapitres",
      "I": "Capitoli"
    };
    title = titles[language];



    function writeTree(tree, str, val) {
      var items_nr = str.split(".");
      var default_obj = {};

      var items = [];
      items_nr.forEach(function (element, elementID) {
        items.push(parseInt(element));
      });

      function findKNR(tree_array, KNR) {
        var return_value = -1;
        tree_array.forEach(function (tree, ID) {
          if (parseInt(tree.knr.substr(tree.knr.length - 2)) === KNR) {
            return_value = ID;
          };
        });
        return return_value;
      }

      items.forEach(function (element, elementID) {
        // console.log(element, elementID);

        if (elementID !== items.length - 1) {

          // if (elementID === 0) {
          //   tree.children[items["0"]] = tree.children[items["0"]] || default_obj;
          // };
          // 
          // if (elementID === 1) {
          //   tree.children[items["0"]].children[items["1"]] = tree.children[items["0"]].children[items["1"]] || default_obj;
          // };
          // 
          // if (elementID === 2) {
          //   tree.children[items["0"]].children[items["1"]].children[items["2"]] = tree.children[items["0"]].children[items["1"]].children[items["2"]] || default_obj;
          // };
          // 
          // if (elementID === 3) {
          //   tree.children[items["0"]].children[items["1"]].children[items["2"]].children[items["3"]] = tree.children[items["0"]].children[items["1"]].children[items["2"]].children[items["3"]] || default_obj;
          // };

        } else {

          // console.warn('?', elementID, tree, items, val);
          if (elementID === 0) {
            tree.splice(items["0"], 0, val);
          };

          if (elementID === 1) {

            var index_01 = findKNR(tree, items["0"]);
            tree[index_01].children.push(val);
            // 
            // tree[items["0"]].children.splice(items["1"], 0, val);
          };

          if (elementID === 2) {
            var index_01 = findKNR(tree, items["0"]);
            var index_02 = findKNR(tree[index_01].children, items["1"]);
            // console.error('tree ???', index_01, index_02, tree[index_01].children, items["1"]);
            tree[index_01].children[index_02].children.push(val);
          };

          if (elementID === 3) {
            var index_01 = findKNR(tree, items["0"]);
            var index_02 = findKNR(tree[index_01].children, items["1"]);
            var index_03 = findKNR(tree[index_01].children[index_02].children, items["2"]);
            // console.error('tree ???', index_01, index_02, index_03);
            tree[index_01].children[index_02].children[index_03].children.push(val);
          };

          if (elementID === 4) {
            var index_01 = findKNR(tree, items["0"]);
            var index_02 = findKNR(tree[index_01].children, items["1"]);
            var index_03 = findKNR(tree[index_01].children[index_02].children, items["2"]);
            var index_04 = findKNR(tree[index_01].children[index_02].children[index_03].children, items["3"]);
            //console.error('tree ???', index_01, index_02, index_03,val);
            tree[index_01].children[index_02].children[index_03].children[index_04].children.push(val);
          };

          if (elementID === 5) {
            console.error(' !!! NEEEEEEVER !!!!');
          };

        };
      });

      return tree;
    }

    function addLeistung(k, leistung) {
      var kapitel = k.slice(0);
      var KNRitems = leistung.KNR.split(".");

      function findKNR(tree_array, KNR) {
        var return_value = -1;
        tree_array.forEach(function (tree, ID) {
          if (tree.knr.substr(tree.knr.length - 2) === KNR) {
            return_value = ID;
          };
        });
        return return_value;
      }

      function enhanceLEISTUNG(leistung, typ) {
        leistung.LEISTUNG = true;


        leistung.LEISTUNG_TYP_TEXT = "";
        data.CT_LEISTUNG_TYP[language].forEach(function (lt, ltID) {
          if (lt.CODE === typ) {
            leistung.LEISTUNG_TYP_TEXT = lt.TEXT;
          };
        });

        leistung.PFLICHT = "";
        data.CT_PFLICHT[language].forEach(function (pfl) {
          if (pfl.CODE === leistung.K_PFL) {
            leistung.PFLICHT = pfl.TEXT;
          };
        });

        leistung.LEISTUNG_TEXT = "";
        leistung.LEISTUNG_MED_INTERPRET = "";
        leistung.LEISTUNG_TECH_INTERPRET = "";
        data.LEISTUNG_TEXT[language].forEach(function (l, ltID) {
          if ((l.LNR === leistung.LNR) && (checkGUELTIG(l.GUELTIG_BIS))) {
            leistung.LEISTUNG_TEXT = l.BEZ_255;
            leistung.LEISTUNG_MED_INTERPRET = l.MED_INTERPRET;
            leistung.LEISTUNG_TECH_INTERPRET = l.TECH_INTERPRET;
          };
        });

        leistung.SPARTE_TEXT = "";
        data.CT_SPARTE[language].forEach(function (i, iID) {
          if ((i.CODE === leistung.SPARTE) && (checkGUELTIG(i.GUELTIG_BIS))) {
            leistung.SPARTE_TEXT = i.TEXT;
          };
        });

        leistung.ANAESTHESIE_TEXT = "";
        if (leistung.ANAESTHESIE !== "") {
          data.CT_ANAESTHESIE[language].forEach(function (i, iID) {
            if ((i.CODE === leistung.ANAESTHESIE) && (checkGUELTIG(i.GUELTIG_BIS))) {
              leistung.ANAESTHESIE_TEXT = i.TEXT;
            };
          });
        };

        leistung.QL_DIGNITAET = [];
        data.LEISTUNG_DIGNIQUALI.forEach(function (i, iID) {
          if ((i.LNR === leistung.LNR) && (checkGUELTIG(i.GUELTIG_BIS))) {

            data.LEISTUNG_DIGNIQUALI.forEach(function (i, iID) {
              if ((i.LNR === leistung.LNR) && (checkGUELTIG(i.GUELTIG_BIS))) {

                // Check if already there
                var search_digni_quali = true;
                leistung.QL_DIGNITAET.forEach(function (q, qID) {
                  if (q.QL_DIGNITAET === i.QL_DIGNITAET) {
                    search_digni_quali = false;
                  };
                });

                if (search_digni_quali) {
                  data.CT_DIGNI_QUALI[language].forEach(function (q, qID) {
                    if ((i.QL_DIGNITAET === q.QL_DIGNITAET) && (checkGUELTIG(i.GUELTIG_BIS))) {
                      leistung.QL_DIGNITAET.push(q);
                    };
                  });
                };

              };
            });

          };
        });


        leistung.REGEL = "-";
        data.LEISTUNG_MENGEN_ZEIT.forEach(function (i, iID) {
          if ((i.LNR === leistung.LNR) && (checkGUELTIG(i.GUELTIG_BIS))) {

            data.CT_REGEL_EL_ABR[language].forEach(function (r, rID) {
              if ((i.REGEL_EL_ABR === r.CODE) && (checkGUELTIG(i.GUELTIG_BIS))) {
                i.REGEL_TEXT = r.TEXT;
              };
            });

            data.CT_ZR_EINHEIT[language].forEach(function (z, zID) {
              if ((i.ZR_EINHEIT === z.CODE) && (checkGUELTIG(i.GUELTIG_BIS))) {

                if (parseInt(i.ZR_ANZAHL) > 1) {
                  i.ZR_EINHEIT_TEXT = z.TEXT_MEHRZAHL;
                } else {
                  i.ZR_EINHEIT_TEXT = z.TEXT_EINZAHL;
                };

                leistung.REGEL = i.OPERATOR + " " + i.MENGE;
                if (i.PRO_NACH === "P") {
                  leistung.REGEL = leistung.REGEL + " mal pro "
                } else {
                  leistung.REGEL = leistung.REGEL + " mal nach "
                };

                if (parseInt(i.ZR_ANZAHL) > 1) {
                  leistung.REGEL = leistung.REGEL + i.ZR_ANZAHL + " ";
                };
                leistung.REGEL = leistung.REGEL + i.ZR_EINHEIT_TEXT;

              };
            });
          };
        });

        return leistung;
      }

      // console.warn(kapitel, leistung, KNRitems);

      var diveKapitel = kapitel;
      KNRitems.forEach(function (knr, knrID) {
        var ID = findKNR(diveKapitel, knr);
        diveKapitel = diveKapitel[ID].children;
        // console.log('FIND -> DIVE', ID, diveKapitel);
      });



      diveKapitel.push(enhanceLEISTUNG(leistung, leistung.LEISTUNG_TYP));

      // console.log('- addLeistung', kapitel, leistung);
      return kapitel;
    };

    var kapitel = [];
    data.KAPITEL_TEXT[language].forEach(function (element) {


      if ((element.KNR !== "I") && (checkGUELTIG(element.GUELTIG_BIS))) {
        var data = {
          "knr": element.KNR,
          "name": element.BEZ_255,
          "children": []
        };
        // kapitel = expand(element.KNR, {});
        kapitel = writeTree(kapitel, element.KNR, data);
      };
    });


    // -----------------------------------
    // Listung -> Kapitel
    // -----------------------------------

    data.LEISTUNG.forEach(function (l, lID) {
      if (checkGUELTIG(l.GUELTIG_BIS)) {
        kapitel = addLeistung(kapitel, l);
      };
    });


    // kapitel = addLeistung(kapitel, l);

    // -----------------------------------
    // Finished
    // -----------------------------------
    tree[root_name] = {
      "name": title,
      "language": language,
      "children": kapitel
    };

    if (write_01) {

      console.log('START WRITING!', tree_name, tree[root_name]);

      tree["01"].children.forEach(function (k) {
        db.collection(tree_name).doc(k.knr).set(JSON.parse(JSON.stringify(k)))
          .then(function () {
            console.log(tree_name + " Document  k_" + k.knr + " successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      });



    };

    console.warn('===> 2.) buildTree', tree);


    if (write_files) {
      // 

      var inhalt = {
        "children": [{
          "name": "TARMED | V35 | 01.09",
          "language": language,
          "children": []
        }]
      };

      inhalt.children["0"].children.push(tree["00"]);


      var kapitel = {
        "name": tree["01"].name,
        "language": language,
        "children": []
      }


      tree["01"].children.forEach(function (k, kID) {
        var content = {
          "array_id": kID,
          "knr": k.knr,
          "name": k.knr + " | " + k.name,
          "children": [{
            "name": "Loading..."
          }]
        };
        kapitel.children.push(content);
      });

      inhalt.children["0"].children.push(kapitel);

      console.log('inhalt', inhalt);

      // saveFile(JSON.stringify(inhalt), tree_name + "_I");


    };


  };

  // separate function to make code more clear
  const grabContent = source => fetch(source.url)
    .then(res => res.json())
    .then(json => save_data_object(json, source))

  Promise
    .all(sources.map(grabContent))
    .then(() => buildTree(data, "D"))



};


var readTree = function (language) {
  var tree_name = "TARMED_" + language;
  var docRef = db.collection(tree_name).doc("00");


  // Read Root
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.warn("Document data:", doc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

  // Read Childrens
  docRef.collection("children").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  });
};




// getTARMEDTarif();
// getTARMED();
// importTARMED();
buildTARMEDKapitel();
// readTree("D")