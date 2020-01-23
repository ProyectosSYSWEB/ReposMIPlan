var accesoContext = {
    listaDatosUsuario: [],
    menu: [],
    submenu : [],

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
    },

    CrearMenu: function (callBackResult) {
        var self = this;
        self.menu.length = 0;
        self.submenu.length = 0;
        $.ajax(
            {
                type: "POST",
                cache: false,
                url: urlServer + "Acceso/ObtenerMenu",
                success: function (resp) {
                    if (Array.isArray(resp))
                        var isArreglo = true;
                    else if (resp === false)
                    {
                        callBackResult({ ressult: "notgp", message: resp });
                    }
                    else
                        var comp = resp.substr(0, 8);
                    if (isArreglo) {
                        for (var i = 0; i < resp.length; i++) {
                            let caracteristica = "";
                            let clase = "";
                            let clase2 = "";
                            if (resp[i].ID === 15769)
                                caracteristica = '_blank"';
                            if (resp[i].SubMenu.length === 0) {
                                clase = 'nav-item';
                                clase2 = 'nav-link';
                            }
                            else {
                                clase = 'nav-item dropdown';
                                clase2 = 'nav-link dropdown-toggle';
                            }
                            self.menu.push({ ID: resp[i].ID, NOMBRE: resp[i].NOMBRE, SubMenu: resp[i].SubMenu, caracteristica, Clase: clase, Clase2: clase2 });
                        }
                        callBackResult({ ressult: "tgp", message: null });
                    }
                    else if (comp === "Error256") {
                        callBackResult({ ressult: "errortgp", message: resp });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al crear el menu" });
                    }
                }
            });
    }
};