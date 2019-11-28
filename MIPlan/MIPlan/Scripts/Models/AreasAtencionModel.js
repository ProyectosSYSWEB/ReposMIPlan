var catalogoContext =
{
    dependenciaslst: [],
    areaslst: [],
    areasUplst: [],
    areasRlst: [],

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

    ObtenerAreasAtencion: function (Dependencia, callBackResult) {
        var self = this;
        self.areaslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridAreasAtencion',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.areaslst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Cve: resp.Resultado[i].Clave, Desc: resp.Resultado[i].Descripcion, Estatus: resp.Resultado[i].Status, Cat: resp.Resultado[i].Categoria });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                    else {
                        callBackResult({ ressult: "nottgp", message: resp.MensajeError})
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                }
            });
    },


    ObtenerAreas: function (IdAreaAtencion, callBackResult) {
        var self = this;
        self.areasRlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerAreasAtencion',
                data: { IdAreaAtencion },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.areasRlst.push({ Dependencia: resp.Resultado[i].Dependecia, Cve: resp.Resultado[i].Clave, Desc: resp.Resultado[i].Descripcion, Estatus: resp.Resultado[i].Status, Cat: resp.Resultado[i].Categoria });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerAreasAtencion." });
                    }
                }
            });

    },
};