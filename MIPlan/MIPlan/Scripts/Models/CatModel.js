var catalogoContext =
{    
    dependenciaslst: [],
    basicoslst: [],
        //ObtenerDependencias: function (callBackResult) {
        //    var self = this;
        //    self.dependenciaslst.length = 0;
        //    ///var urlServer = "http://localhost:53805/";
        //    $.ajax(
        //        {
        //            type: 'GET',
        //            cache: false,
        //            url: urlServer + 'Catalogo/ObtenerDependencias',

        //            success: function (resp) {
        //                for (var i = 0; i < resp.length; i++) {
        //                    self.dependenciaslst.push({ Id: resp[i].Id, Descripcion: resp[i].Descripcion });
        //                }
        //                if (callBackResult != undefined) {
        //                    callBackResult({ ressult: 'tgp', message: null });
        //                }
        //            },
        //            error: function (ex) {
        //                if (callBackResult != undefined) {
        //                    callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
        //                }
        //            }
        //        });

        //},
        ObtenerBasicos: function (callBackResult) {
        var self = this;
        self.basicoslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridBasicos',
                data: { },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.basicoslst.push({ Catalogo: resp.Resultado[i].Catalogo, Clave: resp.Resultado[i].Clave, Organismo: resp.Resultado[i].Organismo, Status: resp.Resultado[i].Status });
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