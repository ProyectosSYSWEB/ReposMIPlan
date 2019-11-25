var catalogoContext =
{    
    dependenciaslst: [],





    unidadesRLst: [],
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
        ObtenerUnidades: function (Dependencia, callBackResult) {
        var self = this;
        self.unidadesRLst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerUnidades',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.unidadesRLst.push({ Id: resp[i].Id, Dependencia: resp[i].Dependencia, Clave: resp[i].Clave, Descripcion: resp[i].Descripcion, Status: resp[i].Status });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerUnidades." });
                    }
                }
            });

    },


};