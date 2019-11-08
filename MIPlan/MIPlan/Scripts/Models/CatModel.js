/// <reference path="../global.js"/>
var catalogoContext =
{
    login: [],
    infBasicos: [],
    listaBasicos: function (callBackResult) {
            var self = this;
            self.infDoctos.length = 0;
            $.ajax(
                {
                    type: 'GET',
                    cache: false,
                    url: urlServer + 'Catalogo/ListaBasicos',
                    success: function (resp) {
                        for (var i = 0; i < resp.length; i++) {
                            self.infBasicos.push({ Identificador: resp[i].Id, Desc: resp[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    },
                    error: function (ex) {
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListarEscuelas." });
                        }
                    }
                });

        },


};