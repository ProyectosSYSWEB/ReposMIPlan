var catalogoContext =
{
    dependenciaslst: [], UnidadesPorUsuariolst: [], GridUnidadesDisponiblesLST: [],
    
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

    ObtenerUnidadesPorUsuario: function (callBackResult) {
        var self = this;
        self.UnidadesPorUsuariolst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerUsuarios',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.UnidadesPorUsuariolst.push({ Usuario: resp.Resultado[i].Usuario });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  ObtenerUnidadesPorUsuario." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/

    GridUnidadesDisponibles: function (Usuario, callBackResult) {
        var self = this;
        self.GridUnidadesDisponiblesLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GridUnidadesDisponibles',
                data: { Usuario },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.GridUnidadesDisponiblesLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  GridUnidadesDisponibles." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/








};