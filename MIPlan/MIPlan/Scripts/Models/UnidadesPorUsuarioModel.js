var catalogoContext =
{
    dependenciaslst: [], ObtenerUsuarioslst: [], GridUnidadesDisponiblesLST: [], AgregarUnidadGridLST: [], GridUnidadesAsignadasLST:[],
    
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

    ObtenerUsuarios: function (callBackResult) {
        var self = this;
        self.ObtenerUsuarioslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerUsuarios',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.ObtenerUsuarioslst.push({ Usuario: resp.Resultado[i].Usuario });
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

    GridUnidadesDisponibles: function (NombreUsuario, callBackResult) {
        var self = this;
        self.GridUnidadesDisponiblesLST.length = 0;
        $.ajax(
            {
                type: 'GET',                
                cache: false,
                url: urlServer + 'Catalogo/GridUnidadesDisponibles',
                data: { NombreUsuario },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.GridUnidadesDisponiblesLST.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Coordinador: resp.Resultado[i].Coordinador });
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
    GridUnidadesAsignadas: function (NombreUsuario, callBackResult) {
        var self = this;
        self.GridUnidadesAsignadasLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GridUnidadesAsignadas',
                data: { NombreUsuario },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {                           
                            self.GridUnidadesAsignadasLST.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Coordinador: resp.Resultado[i].Coordinador });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  GridUnidadesAsignadas." });
                    }
                }
            });

    },
   
/********************************************************************************************************************************************************/


    GuardarUnidadesAsignadas: function (Id, Usuario, callBackResult) {      
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarUnidadesAsignadas',
                data: { Id, Usuario },
                success: function (resp) {
                    if (resp.Error == false) {
                      
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  GuardarUnidadesAsignadas." });
                    }
                }
            });

    },

    /********************************************************************************************************************************************************/


    GuardarTodasUD: function ( Usuario, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarTodasUD',
                data: { Usuario },
                success: function (resp) {
                    if (resp.Error == false) {

                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  GuardarTodasUD." });
                    }
                }
            });

    },

/********************************************************************************************************************************************************/

    EliminarUnidadAignada: function (IdUnidad, Usuario, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarUnidadAignada',
                data: { IdUnidad, Usuario },
                success: function (resp) {
                    if (resp.Error == false) {

                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  EliminarUnidadAignada." });
                    }
                }
            });

    },

/********************************************************************************************************************************************************/
    EliminarTodasUnidadAignada: function (Usuario, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarTodasUnidadAignada',
                data: { Usuario },
                success: function (resp) {
                    if (resp.Error == false) {

                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en  EliminarTodasUnidadAignada." });
                    }
                }
            });

    },

/********************************************************************************************************************************************************/
};