var catalogoContext =
{
    dependenciaslst: [],
    periodoslst: [],
    periodolst: [],
  
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
/*[{"Id":1,"Dependencia":"41101","Periodo":"2019-01","Descripcion":"1er Trimestre 2019","Status":"A","Ejercicio":"A","Inicio":"2019","Fin":"01/01/2019 07:31:45 p. m."}*/
    ObtenerGridPeriodos: function (callBackResult) {
        var self = this;
        self.periodoslst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridPeriodos',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.periodolst.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Periodo: resp.Resultado[i].Periodo, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Ejercicio: resp.Resultado[i].Ejercicio, Inicio: resp.Resultado[i].Inicio, Fin: resp.Resultado[i].Fin });
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
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridPeriodos." });
                    }
                }
            });
    },
/********************************************************************************************************************************************************/
    ObtenerPerdiodos: function (Idunidad, callBackResult) {
        var self = this;
        self.unidadadRlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerPerdiodos',
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
};