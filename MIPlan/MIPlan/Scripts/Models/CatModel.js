var catalogoContext =
{    
    catalogoslst: [],
    basicoslst: [],
    basicolst: [],

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
                        self.basicoslst.push({ Id: resp.Resultado[i].Catalogo, DescripcionPadre: resp.Resultado[i].DescripcionPadre, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status });
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


    ObtenerBasico: function (IdBasicos, callBackResult) {
        var self = this;
        self.basicolst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDatosBasico',
                data: { IdBasicos },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.basicolst.push({ Id: resp.Resultado[i].Catalogo, DescripcionPadre: resp.Resultado[i].DescripcionPadre, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status });
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

};