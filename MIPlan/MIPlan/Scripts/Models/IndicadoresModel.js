var catalogoContext =
{
    categorialst: [],

    ObtenerCategorias: function (callBackResult) {
        var self = this;
        self.categorialst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerCategorias',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.categorialst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        } else {
                            callBackResult({ ressult: "notgp", message: resp.MensajeError });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });

                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCategorias." });
                    }
                }
            });

    },
};