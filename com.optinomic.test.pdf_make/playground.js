// http://pdfmake.org/playground.html
// playground requires you to assign document definition to a variable called dd

var dd = {
    "pageSize": "A4",
    "pageOrientation": "portrait",
    "info": {
        "title": "Optinomic | Druckvorlage",
        "author": "d.klinik",
        "subject": "d.patient",
        "keywords": "d.patient" + ", " + "d.klinik" + ", Optinomic"
    },
    "header": {
        "columns": [
            { "text": "d.patient", "alignment": "left", "style": "header" },
            { "text": "d.klinik", "alignment": "right", "style": "header" }
        ]
    },
    "footer": function(currentPage, pageCount) {
        var obj = {
            "columns": [
                { "text": "$scope.d.current_doc.name", "alignment": "left", "style": "footer" },
                { "text": "Seite " + currentPage.toString() + "/" + pageCount.toString(), "alignment": "right", "style": "footer" }
            ]
        };
        return obj;
    },
    "content": [{
        "text": "Stanine",
        "style": "h2"
    }, {
        "text": "Frauen, 31 - 50 Jahre",
        "alignment": "center",
        "margin": [0, 6, 0, 3],
        "color": "#212121",
        "style": "caption"
    }, {
        "alignment": "left",
        "columnGap": 12,
        "columns": [{
            "width": "*",
            "alignment": "left",
            "columnGap": 0,
            "columns": [{
                "text": "Wenig",
                "alignment": "left",
                "margin": [0, 0, 0, 0],
                "style": "h3"
            }, {
                "text": "%\nStanine",
                "fontSize": 9,
                "alignment": "right",
                "style": "caption"
            }]
        }, {
            "width": 240,
            "alignment": "center",
            "columns": [{
                "text": [{
                    "text": "4\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "1",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "7\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "2",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "12\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "3",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "17\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "4",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "20\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "5",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "alignment": "center",
                "text": [{
                    "text": "17\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "6",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "12\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "7",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "7\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "8",
                    "alignment": "center",
                    "style": "p"
                }]
            }, {
                "text": [{
                    "text": "4\n",
                    "alignment": "center",
                    "fontSize": 9,
                    "style": "caption"
                }, {
                    "text": "9",
                    "alignment": "center",
                    "style": "p"
                }]
            }]
        }, {
            "width": "*",
            "alignment": "left",
            "columnGap": 0,
            "columns": [{
                "text": "%\nStanine",
                "fontSize": 9,
                "alignment": "left",
                "style": "caption"
            }, {
                "text": "Viel/Ausgeprägt",
                "margin": [0, 0, 0, 0],
                "alignment": "right",
                "style": "h3"
            }]
        }]
    }, {
        "alignment": "left",
        "columnGap": 12,
        "columns": [{
            "width": "*",
            "alignment": "right",
            "text": "Dies ist die Beschreibung: Selbstzweifel und Fokus auf Negatives",
            "margin": [0, 0, 0, 0],
            "color": "#212121",
            "style": "caption"
        }, {
            "width": 240,
            "alignment": "center",
            "canvas": [{
                "type": "rect",
                "x": 0,
                "y": 0,
                "w": 240,
                "h": 30,
                "lineColor": "#E0E0E0"
            }, {
                "type": "polyline",
                "lineWidth": 1,
                "closePath": true,
                "color": "#C5CAE9",
                "lineColor": "#3F51B5",
                "points": [{ x: 26.66, y: 0 }, { x: 53.33, y: 0 }, { x: 26.66, y: 30 }]
            }, {
                "type": "rect",
                "x": 26.66,
                "y": 0,
                "w": 26.66,
                "h": 30,
                "lineColor": "#E0E0E0"
            }, {
                "type": "ellipse",
                "x": 93.33,
                "y": 15,
                "color": "#3F51B5",
                "fillOpacity": 0.5,
                "r1": 12,
                "r2": 12
            }, {
                "type": "rect",
                "x": 80,
                "y": 0,
                "w": 26.66,
                "h": 30,
                "lineColor": "#E0E0E0"
            }, {
                "type": "rect",
                "x": 133.33,
                "y": 0,
                "w": 26.66,
                "h": 30,
                "color": "#3F51B5",
                "lineColor": "#E0E0E0"
            }, {
                "type": "rect",
                "x": 186.66,
                "y": 0,
                "w": 26.66,
                "h": 30,
                "lineColor": "#E0E0E0"
            }]
        }, {
            "width": "*",
            "alignment": "left",
            "text": "Dies ist die Beschreibung: Stressbewältigung durch positives Denken",
            "margin": [0, 0, 0, 0],
            "color": "#212121",
            "style": "caption"
        }]
    }, {
        "text": "Überschrift",
        "style": "h2"
    }, {
        "text": "Dies ist ein Standardtext",
        "style": "text"
    }, {
        "alignment": "left",
        "columns": [{
            "width": 110,
            "fontSize": 10,
            "alignment": "right",
            "text": "LINKS: Dies ist ein Standardtext",
            "margin": [0, 14, 0, 0]
        }, {
            "width": "auto",
            "stack": [{
                "columns": [
                    { "text": "Eintritt", "alignment": "left" },
                    { "text": "Datum", "alignment": "right" }
                ],
                "fontSize": 10,
                "color": "#212121",
                "margin": [0, 3, 0, 1]
            }, {
                canvas: [{
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 280,
                    h: 30,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "rect",
                    x: 80,
                    y: 0,
                    w: 80,
                    h: 30,
                    "lineColor": "#E0E0E0",
                    "color": "#EEEEEE"
                }, {
                    type: "line",
                    x1: 46.66,
                    y1: 0,
                    x2: 46.66,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "line",
                    x1: 93.33,
                    y1: 0,
                    x2: 93.33,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "line",
                    x1: 140,
                    y1: 0,
                    x2: 140,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#424242"
                }, {
                    type: "line",
                    x1: 0,
                    y1: 25,
                    x2: 0,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 46.66,
                    y1: 25,
                    x2: 46.66,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 93.33,
                    y1: 25,
                    x2: 93.33,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 140,
                    y1: 25,
                    x2: 140,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#424242"
                }, {
                    type: "line",
                    x1: 40,
                    y1: 15,
                    x2: 140,
                    y2: 15,
                    lineWidth: 15,
                    "lineColor": "#3F51B5"
                }]
            }, {
                "columns": [
                    { "text": "Eintritt", "alignment": "left" },
                    { "text": "Datum", "alignment": "right" }
                ],
                "fontSize": 10,
                "color": "#212121",
                "margin": [0, 3, 0, 1]
            }, {
                "canvas": [{
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 280,
                    h: 30,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "rect",
                    x: 80,
                    y: 0,
                    w: 80,
                    h: 30,
                    "lineColor": "#E0E0E0",
                    "color": "#EEEEEE"
                }, {
                    type: "line",
                    x1: 46.66,
                    y1: 0,
                    x2: 46.66,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "line",
                    x1: 93.33,
                    y1: 0,
                    x2: 93.33,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#E0E0E0"
                }, {
                    type: "line",
                    x1: 140,
                    y1: 0,
                    x2: 140,
                    y2: 30,
                    lineWidth: 1,
                    "lineColor": "#424242"
                }, {
                    type: "line",
                    x1: 0,
                    y1: 25,
                    x2: 0,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 46.66,
                    y1: 25,
                    x2: 46.66,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 93.33,
                    y1: 25,
                    x2: 93.33,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#9E9E9E"
                }, {
                    type: "line",
                    x1: 140,
                    y1: 25,
                    x2: 140,
                    y2: 35,
                    lineWidth: 1,
                    "lineColor": "#424242"
                }, {
                    type: "line",
                    x1: 40,
                    y1: 15,
                    x2: 140,
                    y2: 15,
                    lineWidth: 15,
                    "lineColor": "#3F51B5"
                }]
            }, {
                "columns": [
                    { "text": "-3", "alignment": "left" },
                    { "text": "-2", "alignment": "left" },
                    { "text": "-1", "alignment": "left" },
                    { "text": "0", "alignment": "center" },
                    { "text": "1", "alignment": "right" },
                    { "text": "2", "alignment": "right" },
                    { "text": "3", "alignment": "right" }
                ],
                "fontSize": 9,
                "color": "#757575"
            }]
        }, {
            "width": 110,
            "fontSize": 10,
            "alignment": "left",
            "text": "RECHTS: Dies ist ein Standardtext für die Beschreibung, diese kann auch sehr lange sein.",
            "margin": [0, 14, 0, 0]
        }],
        "columnGap": 12,
        "margin": [0, 0, 0, 6]
    }],
    "styles": {
        "header": {
            "fontSize": 11,
            "bold": false,
            "color": "#9E9E9E",
            "margin": [40, 20, 40, 40]
        },
        "footer": {
            "fontSize": 11,
            "bold": false,
            "color": "#9E9E9E",
            "margin": [40, 0, 40, 40]
        },
        "title": {
            "fontSize": 36,
            "bold": false,
            "color": "#616161",
            "alignment": "left",
            "margin": [0, 40, 0, 0]
        },
        "caption": {
            "fontSize": 11,
            "bold": false,
            "color": "#9E9E9E",
            "alignment": "left",
            "margin": [3, 0, 0, 0]
        },
        "h1": {
            "fontSize": 18,
            "bold": false,
            "color": "#424242",
            "alignment": "left",
            "margin": [0, 40, 0, 24]
        },
        "h2": {
            "fontSize": 15,
            "bold": false,
            "color": "#212121",
            "alignment": "left",
            "margin": [0, 20, 0, 12]
        },
        "h3": {
            "bold": true,
            "color": "#212121",
            "alignment": "left",
            "margin": [0, 0, 0, 6]
        },
        "p": {
            "color": "#212121",
            "alignment": "left",
            "margin": [0, 0, 0, 6]
        }
    }
}
