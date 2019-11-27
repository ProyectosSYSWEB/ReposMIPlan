
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        

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
                        self.cve_dependencia = catalogoContext.dependenciaslst.Id;
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
            catalogoContext.ObtenerUnidades(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidades = catalogoContext.unidadesRlst;   
                        console.log(self.unidades);
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

        var cargarModal = function (Indice) {
            catalogoContext.ObtenerUnidad(Indice, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidad = catalogoContext.unidadadRlst;
                        console.log(self.unidad);
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

        this.Update = function (Indice) {
            Indice = Indice + 1;
            cargarModal(Indice);
        };


        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };



    }]);



})();

