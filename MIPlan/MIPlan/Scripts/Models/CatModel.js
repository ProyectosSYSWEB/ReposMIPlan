var catalogoContext =
{    
    dependenciaslst: [],
    basicoslst: [],
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
                        for (var i = 0; i < resp.length; i++) {
                            self.dependenciaslst.push({ Id: resp[i].Id, Descripcion: resp[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                        }
                    }
                });

        },
        ObtenerBasicos: function (Dependencia, callBackResult) {
        var self = this;
        self.basicoslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridBasicos',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.basicoslst.push({ Identificador: resp[i].Id, TipoBasico: resp[i].Tipo, Cve: resp[i].Clave, Estatus: resp[i].Status, Desc: resp[i].Descripcion, Valor: resp[i].Valor, Orden: resp[i].Orden});
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


};