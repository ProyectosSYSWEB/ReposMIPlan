// <reference path="../Models/AcreditadorModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            //CargarGrid();
            //ObtenerOrganismos();
            //ObtenerStatusAcreditaciones();


        };

        var CargarCombos = function () {
            ObtenerDependencias();

        };


        this.CargarCarreras = function () {
            ObtenerCarreras();

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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.ObtenerDatos = function () {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Programa Educativo";
            //self.cve_id = ;

            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lbldependencia").className = "text-primary";
            document.getElementById("cmbdependencia").className = "form-control border border-primary";
            document.getElementById("lblnivel").className = "text-primary";
            document.getElementById("txtnivel").className = "form-control border border-primary";
            document.getElementById("lblcarrera").className = "text-primary";
            document.getElementById("cmbcarrera").className = "form-control border border-primary";
            document.getElementById("lblstatus").className = "text-primary";
            document.getElementById("Radio").className = "radio-group form-control border border-primary text-center";


            //catalogoContext.ObtenerBasico(IdBasico, function (resp) {
            //    switch (resp.ressult) {
            //        case "tgp":
            //            self.cve_catalogo = catalogoContext.basicolst[0].Tipo;
            //            self.cve_clave = catalogoContext.basicolst[0].Clave;
            //            self.cve_descripcion = catalogoContext.basicolst[0].Descripcion;
            //            self.cve_orden = catalogoContext.basicolst[0].Orden;
            //            self.cve_status = catalogoContext.basicolst[0].Status;
            //            $('#basicos').modal('hide');
            //            break;
            //        case "notgp":
            //            self.mensaje_gral = resp.message;
            //            document.getElementById("Error").style.display = "block";
            //            document.getElementById("Message").innerHTML = self.mensaje_gral;
            //            break;
            //        default:
            //            break;
            //    }
            //    $scope.$apply();



            ////});
        };


        this.Nuevo = function () {
            $('#btnNuevo').show();
            $('#btnActualizar').hide();
            self.Titulo = "Crear Programa Educativo";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lbldependencia").className = "text-success";
            document.getElementById("cmbdependencia").className = "form-control border border-success";
            document.getElementById("lblnivel").className = "text-success";
            document.getElementById("txtnivel").className = "form-control border border-success";
            document.getElementById("lblcarrera").className = "text-success";
            document.getElementById("cmbcarrera").className = "form-control border border-success";
            document.getElementById("lblstatus").className = "text-success";
            document.getElementById("Radio").className = "radio-group form-control border border-success text-center";
            self.cve_dependencia = "";
            self.cve_nivel = "";
            self.cve_carrera = "";
            self.cve_status = "";
        };


        this.ValorDependencia = function () {
            CargarGrid();
            if (self.buscar == "00000" || self.buscar == null) {
                self.buscar = '';
            }
        };

    }]);


})();

        

        