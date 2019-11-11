﻿// <reference path="../global.js"/>
var catalogoContext =
{    
    dependenciaslst: [],
        ObtenerDependencias: function (callBackResult) {
            var self = this;
            self.dependenciaslst.length = 0;
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


};