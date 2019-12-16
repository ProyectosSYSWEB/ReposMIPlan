var catalogoContext =
{
    carreralst: [],
    organismolst: [],
    statuslst: [],
    dependenciaslst: [],
    acreditadoreslst: [],
    unidadadRlst:[],
    unidadAcreditacionlst: [],
    acreditadorUpdatelst: [],
    //subtipo_comprobacioneslst: [],

    ObtenerDependencias: function (callBackResult) {
        var self = this;
        self.dependenciaslst.length = 0;
        //var urlServers = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDependencias',
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.dependenciaslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                    }
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                }
            });

    },

    ObtenerCarreras: function (Dependencia, callBackResult) {
        var self = this;
        self.carreralst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerCarreras',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.carreralst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion, Carrera: resp.Resultado[i].Carrera });
                    }
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCarreras." });
                    }
                }
            });

    },

    ObtenerOrganismos: function (callBackResult) {
        var self = this;
        self.organismolst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerOrganismos',
                
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.organismolst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion});
                    }
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerOrganismos." });
                    }
                }
            });

    },


    ObtenerStatusAcreditaciones: function (callBackResult) {
        var self = this;
        self.statuslst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerStatusAcreditaciones',
               
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.statuslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                    }
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerStatusAcreditaciones." });
                    }
                }
            });

    },
    ObtenerAcreditadores: function (Dependencia, callBackResult) {
        var self = this;
        self.acreditadoreslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridAcreditaciones',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.acreditadoreslst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Carrera: resp.Resultado[i].Carrera, Organismo: resp.Resultado[i].Organismo, Fecha_Inicial: resp.Resultado[i].FechaInicial, Fecha_Final: resp.Resultado[i].FechaFinal, Status: resp.Resultado[i].Status, Observaciones: resp.Resultado[i].Observaciones });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else{
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridAcreditaciones." });
                    }
                }
            });

    },
    ObtenerAcreditador: function (IdAcreditacion, callBackResult) {
        var self = this;
        self.unidadAcreditacionlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerAcreditaciones',
                data: { IdAcreditacion },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.unidadAcreditacionlst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Carrera: resp.Resultado[i].Carrera, Organismo: resp.Resultado[i].Organismo, Fecha_Inicial: resp.Resultado[i].FechaInicial, Fecha_Final: resp.Resultado[i].FechaFinal, Status: resp.Resultado[i].Status, Observaciones: resp.Resultado[i].Observaciones });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerAcreditaciones." });
                    }
                }
            });

    },

    AcreditadorUpdate: function (id, dependencia, carrera, organismo, fechaIni, fechaFin, status, observaciones, callBackResult) {
        var self = this;
        self.acreditadorUpdatelst.length = 0;
        $.ajax(
            {
                type: 'POST',
                cache: false,
                url: urlServer + 'Catalogo/EditarAcreditaciones',
                data: { id, dependencia, carrera, organismo, fechaIni,  fechaFin,  status,  observaciones },
                success: function (resp) {
                    if (resp.Error == false) {

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError})
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarAcreditaciones." });
                    }
                }
            });
    },

    AcreditadorCreate: function (dependencia, carrera, organismo, fechaIni, fechaFin, status, observaciones, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarAcreditaciones',
                data: { dependencia, carrera, organismo, fechaIni, fechaFin, status, observaciones },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarAcreditaciones." });
                    }
                }
            });
    },


    eliminarAcreditador: function (IdAcreditacion, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarAcreditacion',
                data: { IdAcreditacion },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarAcreditacion." });
                    }
                }
            });
    },
};