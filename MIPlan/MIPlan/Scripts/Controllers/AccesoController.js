// <reference path="../Models/AccesoModel.js"/>

(function () {

    var rootApp = angular.module('rootApp', ['MIPlanAccesoWeb', 'MIPlanWeb']);


    var app = angular.module('MIPlanAccesoWeb', []);

    app.controller('MIPlanAccesoController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        let datosUsuario = "";
              
        this.IniciarSesion = () => {
            accesoContext.iniciarSesion(self.Usuario, self.Contrasena, self.Ejercicio, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        window.location.href = urlServer + "Catalogo/Basicos";                        
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });            
        };

        this.cargarMenu = () => {
            accesoContext.CrearMenu(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.SiteMenu = accesoContext.menu;
                        //idHide = self.SiteMenu[0].ID;
                        break;
                    case "errortgp":
                        console.log(resp.message);
                        break;
                    case "notgp":
                        resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                obtenerDatosUsuario();
            });
        };

        var obtenerDatosUsuario = () => {
            accesoContext.ObtenerDatosUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.datosUsuario = accesoContext.datosUsuario;
                        self.Usuario = self.datosUsuario[0].Usuario;
                        self.Correo = self.datosUsuario[0].Correo;
                        break;
                    case "notgp":
                        alert();
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.cerrarSesion = () => {
            accesoContext.CerrarSesion(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        window.location.href = urlServer + "Acceso/Index";    
                        break;
                    case "notgp":
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

    }]);
})();


