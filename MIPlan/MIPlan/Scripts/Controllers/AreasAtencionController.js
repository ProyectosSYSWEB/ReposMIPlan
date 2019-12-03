﻿// <reference path="../Models/AreasAtencionModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', [/*'ngPagination'*/]);


    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            CargarGrid();
            ObtenerCategorias();
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

        var ObtenerCategorias = function () {
            catalogoContext.ObtenerCategorias(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.categoria = catalogoContext.categorialst;
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

        this.CargarCategorias = function () {
            ObtenerCategorias();

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
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Área de Atención";
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lblDependencia").className = "text-primary";
            document.getElementById("cmdDependencia").className = "form-control border border-primary";
            document.getElementById("lblClave").className = "text-primary";
            document.getElementById("txtClave").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("txtDescripcion").className = "form-control border border-primary";
            document.getElementById("lblStatus").className = "text-primary";
            document.getElementById("cmdstatus").className = "form-control border border-primary";
            document.getElementById("lblCategoria").className = "text-primary";
            document.getElementById("cmdcat").className = "form-control border border-primary";

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

        this.Nuevo = function () {
            $('#btnNuevo').show();
            $('#btnActualizar').hide();
            self.Titulo = "Crear Área de Atención";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lblDependencia").className = "text-success";
            document.getElementById("cmdDependencia").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("txtClave").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("txtDescripcion").className = "form-control border border-success";
            document.getElementById("lblStatus").className = "text-success";
            document.getElementById("cmdstatus").className = "form-control border border-success";
            document.getElementById("lblCategoria").className = "text-success";
            document.getElementById("cmdcat").className = "form-control border border-success";
            self.cve_dependencia = "";
            self.cve_clave = "";
            self.cve_desc = "";
            self.cve_status = "";
            self.cve_cat = "";
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

        var areasUpdate = function () {
            catalogoContext.AreasAtencionUpdate(self.cve_id[0].Id, self.cve_dependencia[0].Dependencia, self.cve_clave[0].Clave, self.cve_desc[0].Descripcion, self.cve_status[0].Status, self.cve_cat[0].Categoria, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("¡Se han actualizado los datos correctamente!");
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

        this.AreasAtencionUpdate = function () {
            areasUpdate();
        };

        var AreaCreate = function () {

            catalogoContext.AreasAtencionCreate(self.cve_dependencia[0].Dependencia, self.cve_clave[0].Clave, self.cve_desc[0].Descripcion, self.cve_status[0].Status, self.cve_cat[0].Categoria, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("¡Se ha creado la unidad correctamente!");
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

        this.AreasAtencionCreate = function () { AreaCreate(); }


        this.ValorDependencia = function () {
            this.ValorDependencia = function () {
                if (self.buscar == "00000") {
                    self.buscar = '';
                }
            };
        };


        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };

        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }



    }]);



})();