console.log("Funciona Model");
var catalogoContext =
{
    dependenciaslst: [],
    ListaUnidadResponsableLST: [], 
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
                            self.ListaUnidadResponsableLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
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
   
/********************************************************************************************************************************************************/

/********************************************************************************************************************************************************/
  
};