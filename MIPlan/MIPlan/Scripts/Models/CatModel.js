var catalogoContext =
{    
    catalogoslst: [],
    basicoslst: [],
    basicolst: [],
    basicoUpdatelst: [],

    ObtenerCatalogoBasicos : function (callBackResult) {
            var self = this;
            self.catalogoslst.length = 0;
            ///var urlServer = "http://localhost:53805/";
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'Catalogo/ObtenerCatalogoBasicos',
                    success: function (resp) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.catalogoslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        } else {
                            callBackResult({ ressult: "notgp", message: resp.MensajeError });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCatalogoBasicos." });
                        }
                    }
                });

    },
     
    ObtenerBasicos: function (IdBasicos,callBackResult) {
        var self = this;
        self.basicoslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridBasicos',
                data: { IdBasicos },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.basicoslst.push({ Id: resp.Resultado[i].Id, DescripcionPadre: resp.Resultado[i].DescripcionPadre, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridBasicos." });
                    }
                }
            });

    },


    ObtenerBasico: function (IdBasico, callBackResult) {
        var self = this;
        self.basicolst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDatosBasico',
                data: { IdBasico },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.basicolst.push({ Tipo: resp.Resultado[i].Tipo, Clave: resp.Resultado[i].Clave, Status: resp.Resultado[i].Status, Descripcion: resp.Resultado[i].Descripcion,   Orden: resp.Resultado[i].Orden });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridBasicos." });
                    }
                }
            });

    },

    BasicoUpdate: function (Id,Tipo, Clave,Descripcion,Orden,Status, callBackResult) {
        var self = this;
        self.basicoUpdatelst.length = 0;
        $.ajax(
            {
                type: 'POST',
                cache: false,
                url: urlServer + 'Catalogo/EditarBasicos',
                data: { Id, Tipo, Clave, Descripcion, Orden, Status},
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarBasicos." });
                    }
                }
            });
    },
    BasicoCreate: function (Tipo, Clave, Descripcion, Orden, Status, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarBasicos',
                data: { Tipo, Clave, Descripcion, Orden, Status },
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarBasicos." });
                    }
                }
            });
    },
    eliminarBasico: function (Id, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarBasicos',
                data: { Id },
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarBasicos." });
                    }
                }
            });
    },
};