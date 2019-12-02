// <reference path="../Models/AreasAtencionModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);


    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        var abc = "";

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
            catalogoContext.ObtenerAreasAtencion(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.areasatencion = catalogoContext.areaslst;
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


        this.ObtDatos = function (IdAreaAtencion) {
            
            catalogoContext.ObtenerAreas(IdAreaAtencion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = catalogoContext.areasRlst[0].Dependencia;
                        self.cve_clave = catalogoContext.areasRlst[0].Cve;
                        self.cve_desc = catalogoContext.areasRlst[0].Desc;
                        self.cve_status = catalogoContext.areasRlst[0].Estatus;
                        self.cve_cat = catalogoContext.areasRlst[0].Cat;
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

        var eliminarAreaAtencion = function (IdArea) {
            catalogoContext.eliminarArea(IdArea, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        console.log("Controller Eliminar ejecutado");
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        console.log("Error Controller");
                        break;
                    default:
                        break;
                }

            });
        };

        this.EliminarAreaAtencion = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                eliminarAreaAtencion(Indice);
                alert("¡Se ha elimnado con exito!");
                CargarGrid();
            } else {
                alert("No se ha eliminado el registro");
            }
        };


        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };


        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };



    }]);



})();