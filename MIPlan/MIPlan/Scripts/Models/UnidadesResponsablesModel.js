var catalogoContext =
{
    dependenciaslst: [],
    unidadesRlst: [],
    unidadadRlst: [],
    unidadadUpdateRlst: [],
/********************************************************************************************************************************************************/
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
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.dependenciaslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });                            
                        }                        
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError })
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
        ObtenerUnidades: function (callBackResult) {
        var self = this;
        self.unidadesRlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerUnidades',                
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.unidadesRlst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Coordinador: resp.Resultado[i].Coordinador });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerUnidades." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ObtenerUnidad: function (Idunidad, callBackResult) {
        var self = this;        
        self.unidadadRlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerUnidadesResponsables',
                data: { Idunidad },
                success: function (resp) {
                    if (resp.Error == false) { 
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.unidadadRlst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependecia, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Coordinador: resp.Resultado[i].Coordinador });                            
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerUnidadesResponsables." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    UnidadResponsableUpdate: function (Id, Dependencia, Clave, Descripcion, Status, Coordinador, callBackResult) {
        var self = this;
        self.unidadadUpdateRlst.length = 0;
        $.ajax(
            {
                type: 'POST',
                cache: false,
                url: urlServer + 'Catalogo/EditarUnidadesResponsables',
                data: {Id, Dependencia, Clave, Descripcion, Status, Coordinador },
                success: function (resp) {
                    if (resp.Error == false) {
                      
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: res })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarUnidadesResponsables." });
                    }
                }
            });
    },
/********************************************************************************************************************************************************/
    UnidadResponsableCreate: function ( dependencia, clave, descripcion, status, coordinador, callBackResult) {        
        $.ajax( 
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/GuardarUnidadesResponsables',
                data: { dependencia, clave, descripcion, status, coordinador, },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: res })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarUnidadesResponsables." });
                    }
                }
            });
    },
/********************************************************************************************************************************************************/
    eliminarUnidad: function (IdUnidad, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/EliminarUnidadResponsable',
                data: { IdUnidad },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: res })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarUnidadResponsable." });
                    }
                }
            });
    },
};