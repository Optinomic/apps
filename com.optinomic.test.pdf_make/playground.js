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
        "text": "Überschrift",
        "style": "h3"
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
