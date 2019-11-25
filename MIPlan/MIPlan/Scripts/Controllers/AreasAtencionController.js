// <reference path="../Models/AreasAtencionModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);


    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        var abc = "";

        this.Inicio = function () {
            CargarCombos();
        };

        var CargarCombos = function () {
            ObtenerDependencias();
        };


        var ObtenerDependencias = function () {
            catalogoContext.ObtenerDependencias(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = catalogoContext.dependenciaslst;
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };

        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };



    }]);



})();