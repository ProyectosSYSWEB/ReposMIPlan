// <reference path="../Models/AcreditadorModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        //var self = this;

        this.Inicio = function () {
            CargarCombos();
            CargarGrid();
        };

        var CargarCombos = function () {
            ObtenerDependencias();
        };


        var ObtenerDependencias = function () {
            catalogoContext.ObtenerDependencias(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = catalogoContext.dependenciaslst;
                        self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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

        var CargarGrid = function () {
            catalogoContext.ObtenerAcreditadores(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.acreditador = catalogoContext.acreditadoreslst;
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

        this.BorrarAcreditador = function (Indice) {
            alert(Indice);
        };



    }]);



})();



