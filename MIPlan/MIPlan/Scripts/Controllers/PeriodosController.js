
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';


        this.Inicio = function () {
            CargarCombos();
            CargarGrid();
            //self.unidad = null;
        };

        var CargarCombos = function () {
            ObtenerDependencias();
        };

        /********************************************************************************************************************************************************/
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
    /********************************************************************************************************************************************************/
        var CargarGrid = function () {
            catalogoContext.ObtenerGridPeriodos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodos = catalogoContext.periodoslst;
                        console.log(self.periodos);
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
/********************************************************************************************************************************************************/
        var cargarModal = function (Idunidad) {
            catalogoContext.ObtenerPerdiodos(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodo = catalogoContext.periodolst;
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

        this.Modal = function (Indice) { cargarModal(Indice); };
/********************************************************************************************************************************************************/
        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };

        this.BorrarImpViatico = function () {
            alert('Funciona');
        };
        /*******************************************************************************************************************************************************/

    }]);
})();
