var catalogoContext =
{
    dependenciaslst: [],
    periodoslst: [],
    periodolst: [],
    unidadadUpdateRlst: [],
    /********************************************************************************************************************************************************/
    ObtenerDependencias: function (callBackResult) {
        var self = this;
        self.dependenciaslst.length = 0;        
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDependencias',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.dependenciaslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

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
    /********************************************************************************************************************************************************/
    ObtenerGridPeriodos: function (callBackResult) {
        var self = this;
        self.periodoslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridPeriodos',       
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.periodoslst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Periodo: resp.Resultado[i].Periodo, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Ejercicio: resp.Resultado[i].Ejercicio, Inicio: resp.Resultado[i].Inicio, Fin: resp.Resultado[i].Fin });
                        }
                        
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridPeriodos." });
                    }
                }
            });

    },
    /********************************************************************************************************************************************************/
    ObtenerPeriodo: function (Id, callBackResult) {
        var self = this;
        self.periodolst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerPeriodos',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.periodolst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Periodo: resp.Resultado[i].Periodo, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Ejercicio: resp.Resultado[i].Ejercicio, Inicio: resp.Resultado[i].Inicio, Fin: resp.Resultado[i].Fin });
                        }

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerPerdiodos." });
                    }
                }
            });

    },
    /********************************************************************************************************************************************************/
    periodoUpdate: function (id, dependencia, periodo, descripcion, status, ejercicio, inicio, fin, callBackResult) {
        var self = this;
        self.unidadadUpdateRlst.length = 0;
        $.ajax(
            {
                type: 'POST',
                cache: false,
                url: urlServer + 'Catalogo/EditarPerdiodos',
                data: { id, dependencia, periodo, descripcion, status, ejercicio, inicio, fin },
                success: function (resp) {
                    if (resp.Error == false) {

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarUnidadesResponsables." });
                    }
                }
            });
    },
    /********************************************************************************************************************************************************/
    GuardarPerdiodos: function (dependencia, periodo, descripcion, status, ejercicio, inicio, fin, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarPerdiodos',
                data: { dependencia, periodo, descripcion, status, ejercicio, inicio, fin },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarUnidadesResponsables." });
                    }
                }
            });
    },
    /********************************************************************************************************************************************************/
    eliminarPeriodo: function (Id, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarPeriodo',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarPeriodo." });
                    }
                }
            });
    },
};