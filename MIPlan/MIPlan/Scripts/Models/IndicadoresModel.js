var catalogoContext =
{
    categorialst: [],
    etiquetalst: [],
    subtipolst: [],
    indicadoresRlst: [],
    indicadoreslst: [],

    ObtenerCategorias: function (callBackResult) {
        var self = this;
        self.categorialst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerCategorias',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.categorialst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        } else {
                            callBackResult({ ressult: "notgp", message: resp.MensajeError });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });

                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCategorias." });
                    }
                }
            });

    },

    ObtenerIndicador: function (Categoria, callBackResult) {
        var self = this;
        self.indicadoreslst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerGridIndicadores',
                data: { Categoria },
                success: function (resp) {
                    console.log(resp);
                    for (var i = 0; i < resp.Resultado.length; i++) {
                        self.indicadoreslst.push({ Id: resp.Resultado[i].Id, Cat: resp.Resultado[i].Categoria, Sub: resp.Resultado[i].Subtipo, Desc: resp.Resultado[i].Descripcion, Et1: resp.Resultado[i].Etiqueta_1, Et2: resp.Resultado[i].Etiqueta_2, Seg: resp.Resultado[i].Evolutivo });
                    }
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                    else {
                        callBackResult({ ressult: "nottgp", message: resp.MensajeError })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridIndicadores." });
                    }
                }
            });
    },

    ObtenerEtiquetas: function (callBackResult) {
        var self = this;
        self.etiquetalst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerEtiqueta',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.etiquetalst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        } else {
                            callBackResult({ ressult: "notgp", message: resp.MensajeError });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });

                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerEtiqueta." });
                    }
                }
            });

    },

    ObtenerSubtipos: function (callBackResult) {
        var self = this;
        self.subtipolst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerSubtipo',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.subtipolst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        } else {
                            callBackResult({ ressult: "notgp", message: resp.MensajeError });
                        }
                    }
                    else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });

                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerCategorias." });
                    }
                }
            });

    },

    ObtenerIndicadores: function (Indicador, callBackResult) {
        var self = this;
        self.indicadoresRlst.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDatosIndicador',
                data: { Indicador },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.indicadoresRlst.push({ Cat: resp.Resultado[i].Categoria, Sub: resp.Resultado[i].Subtipo, Desc: resp.Resultado[i].Descripcion, Et1: resp.Resultado[i].Etiqueta_1, Et2: resp.Resultado[i].Etiqueta_2, Seg: resp.Resultado[i].Evolutivo });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError })
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDatosIndicador." });
                    }
                }
            });

    },
};