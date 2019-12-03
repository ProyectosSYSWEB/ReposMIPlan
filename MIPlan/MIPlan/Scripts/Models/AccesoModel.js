var accesoContext = {
    listaDatosUsuario :[],

    iniciarSesion: function (usuario, contrasena, ejercicio, callBackResult) {
        var self = this;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Acceso/IniciarSesion',
                data: { usuario, contrasena, ejercicio},
                success: function (resp) {
                    if (resp.Error === false) {
                        for (let i = 0; i < resp.Resultado.length; i++) {
                            self.listaDatosUsuario.push({ Usuario: resp.Resultado[i].Usuario, Ejercicio: resp.Resultado[i].Ejercicio });
                        }
                        callBackResult({ ressult: 'tgp', message: null });
                    }
                    else if (resp.Error === true) {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                    else if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                }
            });
    }
};