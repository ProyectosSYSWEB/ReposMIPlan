// <reference path="../Models/AccesoModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
              
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

    }]);
})();
