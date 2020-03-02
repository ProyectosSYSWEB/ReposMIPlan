var catalogoContext =
{
    dependenciaslst: [], UnidadesPorUsuariolst: [], GridUnidadesDisponiblesLST: [], AgregarUnidadGridLST: [],
    
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

    GridUnidadesDisponibles: function (Id, Descripcion, NombreUsuario, lado, callBackResult) {
        var self = this;
        self.GridUnidadesDisponiblesLST.length = 0;
        $.ajax(
            {
                type: 'GET',                
                cache: false,
                url: urlServer + 'Catalogo/GridUnidadesDisponibles',
                data: { Id, Descripcion, NombreUsuario, lado },
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

    AgregarUnidadGrid: function (Id, Descripcion, Usuario, lado, callBackResult) {
        var self = this;
        self.AgregarUnidadGridLST.length = 0;
        $.ajax(
            {
                type: 'GET',               
                cache: false,
                url: urlServer + 'Catalogo/AgregarUnidadGrid',
                data: { Id, Descripcion, Usuario, lado },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.AgregarUnidadGridLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  AgregarUnidadGrid." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/






};