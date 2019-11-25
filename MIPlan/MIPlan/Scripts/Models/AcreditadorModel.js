﻿var catalogoContext =
{
    dependenciaslst: [],
    acreditadoreslst: [],
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
    ObtenerAcreditadores: function (Dependencia, callBackResult) {
        var self = this;
        self.acreditadoreslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridAcreditaciones',
                data: { Dependencia },
                success: function (resp) {
                    for (var i = 0; i < resp.length; i++) {
                        self.acreditadoreslst.push({ Id: resp[i].Id, Dep: resp[i].Dependencia, Car: resp[i].Carrera, Organismo: resp[i].Organismo, Fecha_Inicial: resp[i].Fecha_Inicio, Fecha_Final: resp[i].Fecha_Fin, Status: resp[i].Status, Obs: resp[i].Observaciones });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                }
            });

    },
};