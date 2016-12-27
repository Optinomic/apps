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
        "alignment": 'left',
        "columnGap": 12,
        "columns": [{
            "width": 192,
            "stack": [{
                "text": "Normstichprobe",
                "style": "h3"
            }, {
                "text": "Die Z-Werte wurden aufgrund der voliegenden Normstichprobe berechnet.",
                "style": "caption"
            }]
        }, {
            "stack": [{
                "text": "Klinikstichprobe",
                "style": "h3"
            }, {
                "alignment": 'left',
                "margin": [0, 0, 0, 3],
                "columnGap": 6,
                "columns": [{
                    "width": 18,
                    "stack": [{
                        "text": [{
                            "text": "*",
                            "color": "#7986CB",
                            "fontSize": 11,
                            "style": "p"
                        }, {
                            "text": "1",
                            "fontSize": 11,
                            "color": "#3F51B5",
                            "style": "p"
                        }]
                    }]
                }, {
                    "width": "*",
                    "stack": [{
                        "text": "Beschreibung der Stichprobe der sehr lange ausfallen kann und somit auf mehreren Zeilen (N=234)",
                        "style": "caption"
                    }]
                }]
            }, {
                "alignment": 'left',
                "margin": [0, 0, 0, 3],
                "columnGap": 6,
                "columns": [{
                    "width": 18,
                    "stack": [{
                        "text": [{
                            "text": "*",
                            "color": "#7986CB",
                            "fontSize": 11,
                            "style": "p"
                        }, {
                            "text": "2",
                            "fontSize": 11,
                            "color": "#3F51B5",
                            "style": "p"
                        }]
                    }]
                }, {
                    "stack": [{
                        "text": "Beschreibung der Stichprobe",
                        "style": "caption"
                    }]
                }]
            }]
        }]
    }, {
        "text": "keepTogether",
        "style": "h1"
    }, {
        "table": {
            "dontBreakRows": true,
            "headerRows": 0,
            "body": [
                [{
                    "stack": [{
                        "text": "keepTogether - all Content here!",
                        "style": "p"
                    }]
                }]
            ]
        },
        layout: 'noBorders'
    }, {
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
            "stack": [{
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
                    "type": "rect",
                    "x": 26.66,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 80,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 186.66,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 186.66,
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
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "ellipse",
                    "x": 93.33,
                    "y": 15,
                    "color": "#3F51B5",
                    "fillOpacity": 0.5,
                    "r1": 12,
                    "r2": 12
                }]
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
                    "type": "rect",
                    "x": 26.66,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 80,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 186.66,
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
                }]
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
                    "type": "rect",
                    "x": 26.66,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 80,
                    "y": 0,
                    "w": 26.66,
                    "h": 30,
                    "lineColor": "#E0E0E0"
                }, {
                    "type": "rect",
                    "x": 186.66,
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
                    "type": "ellipse",
                    "x": 146.66,
                    "y": 15,
                    "color": "#FFFFFF",
                    "fillOpacity": 0.5,
                    "r1": 13,
                    "r2": 13
                }]
            }, {
                "width": 240,
                "alignment": "center",
                "stack": [{
                    "alignment": "left",
                    "columnGap": 6,
                    "margin": [0, 3, 0, 0],
                    "columns": [{
                        "width": "auto",
                        "columns": [{
                            "width": 10,
                            "canvas": [{
                                "type": "ellipse",
                                "x": 9,
                                "y": 7,
                                "color": "#3F51B5",
                                "fillOpacity": 0.5,
                                "r1": 5,
                                "r2": 5
                            }]
                        }, {
                            "width": "*",
                            "alignment": "left",
                            "text": "Eintritt\nDatum",
                            "style": "caption"
                        }]
                    }, {
                        "width": "auto",
                        "columns": [{
                            "width": 10,
                            "canvas": [{
                                "type": "rect",
                                "x": 4,
                                "y": 2,
                                "w": 10,
                                "h": 10,
                                "color": "#3F51B5",
                                "lineColor": "#E0E0E0"
                            }, {
                                "type": "ellipse",
                                "x": 9,
                                "y": 7,
                                "color": "#FFFFFF",
                                "fillOpacity": 0.5,
                                "r1": 4,
                                "r2": 4
                            }]
                        }, {
                            "width": "*",
                            "alignment": "left",
                            "text": "Anderer\nDatum",
                            "style": "caption"
                        }]
                    }, {
                        "width": "auto",
                        "columns": [{
                            "width": 10,
                            "canvas": [{
                                "type": "rect",
                                "x": 4,
                                "y": 2,
                                "w": 10,
                                "h": 10,
                                "color": "#3F51B5",
                                "lineColor": "#E0E0E0"
                            }]
                        }, {
                            "width": "*",
                            "alignment": "left",
                            "text": "Austritt\nDatum",
                            "style": "caption"
                        }]
                    }]
                }]
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
        "text": "Z-Score",
        "style": "h2"
    }, {
        "stack": [{
            "text": "Überschrift",
            "margin": [0, 6, 0, 0],
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
                        { "width": "auto", "text": "Datum", "alignment": "right" }, {
                            "alignment": "right",
                            "text": [{
                                "text": "*",
                                "color": "#7986CB",
                                "fontSize": 11,
                                "style": "p"
                            }, {
                                "text": "1",
                                "fontSize": 11,
                                "color": "#3F51B5",
                                "style": "p"
                            }]
                        }
                    ],
                    "fontSize": 10,
                    "color": "#212121",
                    "margin": [0, 3, 0, 1]
                }, {
                    "width": 240,
                    "alignment": "center",
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
        "id": "keepTogether"
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
            "margin": [0, 0, 0, 0]
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
            "fontSize": 12,
            "margin": [0, 0, 0, 6]
        }
    }
}
