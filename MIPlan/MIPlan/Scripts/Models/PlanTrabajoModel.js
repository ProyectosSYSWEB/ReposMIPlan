console.log("Funciona Model");
var catalogoContext =
{
    dependenciaslst: [],
    ListaUnidadResponsableLST: [], 
    ListaEjerciciosLST: [],
    ListaPlanesLST:[],
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
    ListaUnidadResponsable: function (callBackResult) {
        var self = this;
        self.ListaUnidadResponsableLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaUnidadResponsable',                
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaUnidadResponsableLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion});
                        }
                                         
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }                  
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaUnidadResponsable." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ListaEjercicios: function (callBackResult) {
        var self = this;
        self.ListaEjerciciosLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaEjercicios',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaEjerciciosLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }3

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaEjercicios." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ListaPlanes: function (callBackResult) {
        var self = this;
        self.ListaPlanesLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaPlanes',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaPlanesLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        } 3

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaEjercicios." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/

/********************************************************************************************************************************************************/
  
};