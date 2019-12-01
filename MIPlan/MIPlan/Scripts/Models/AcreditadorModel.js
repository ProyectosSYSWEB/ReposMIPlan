var catalogoContext =
{
    carreralst: [],
    dependenciaslst: [],
    acreditadoreslst: [],
    unidadesRlst: [],
    unidadAcreditacionlst: [],
    //subtipo_comprobacioneslst: [],
    ObtenerDependencias: function (callBackResult) {
        var self = this;
        self.dependenciaslst.length = 0;
        //var urlServer = "http://localhost:53805/";
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

    ObtenerCarrera: function (callBackResult) {
        var self = this;
        self.carreralst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerCarreras',
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.carreralst.push({ Carrera: resp.Resultado[i].Carrera });
                    }
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCarreas." });
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
                        self.acreditadoreslst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Carrera: resp.Resultado[i].Carrera, Organismo: resp.Resultado[i].Organismo, Fecha_Inicial: resp.Resultado[i].FechaInicial, Fecha_Final: resp.Resultado[i].FechaFinal, Status: resp.Resultado[i].Status, Observacion: resp.Resultado[i].Observaciones });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
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
                            self.unidadAcreditacionlst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Carrera: resp.Resultado[i].Carrera, Organismo: resp.Resultado[i].Organismo, Fecha_Inicial: resp.Resultado[i].FechaInicial, Fecha_Final: resp.Resultado[i].FechaFinal, Status: resp.Resultado[i].Status, Observacion: resp.Resultado[i].Observaciones });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: res })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerAcreditadores." });
                    }
                }
            });

    },
    AcreditadorCreate: function (Dependencia,Carrera,Organismo,FechaInicial,FechaFinal,Status,Observaciones, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarAcreditaciones',
                data: { Dependencia, Carrera, Organismo, FechaInicial, FechaFinal, Status, Observaciones, },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: res })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarUnidadesResponsables." });
                    }
                }
            });
    },
};