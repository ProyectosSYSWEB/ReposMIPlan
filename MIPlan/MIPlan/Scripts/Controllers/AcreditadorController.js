// <reference path="../Models/AcreditadorModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            CargarGrid();
            self.unidad = null;
            ObtenerOrganismos();
            ObtenerStatusAcreditaciones();
           
        };

        var CargarCombos = function () {
            ObtenerDependencias();
            
        };
        //this.Carrera = function () {
        //    CargarCarre();

        //};

        this.CargarCarreras = function () {
            ObtenerCarreras();

        };
        //this.Organismo = function () {
        //    CargarOrga();

        //};
        //this.CargarOrganismos= function () {
        //    ObtenerOrganismos();

        //};

        //this.CargarStatus = function () {
        //    ObtenerStatusAcreditaciones();

        //};


        var ObtenerDependencias = function () {
            catalogoContext.ObtenerDependencias(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.dependencias = catalogoContext.dependenciaslst;
                        //self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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

        var ObtenerCarreras = function () {
            catalogoContext.ObtenerCarreras(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.carrera = catalogoContext.carreralst;
                        //self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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

        var ObtenerOrganismos = function () {
            catalogoContext.ObtenerOrganismos( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.organismo = catalogoContext.organismolst;
                        //self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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


        var ObtenerStatusAcreditaciones = function () {
            catalogoContext.ObtenerStatusAcreditaciones( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.status = catalogoContext.statuslst;
                        //self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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


        this.ObtenerDatos = function (IdAcreditacion) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Acreditador";
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lbldependencia").className = "text-primary";
            document.getElementById("cmbdependencia").className = "form-control border border-primary";
            document.getElementById("lblcarrera").className = "text-primary";
            document.getElementById("cmbcarrera").className = "form-control border border-primary";
            document.getElementById("lblorganismo").className = "text-primary";
            document.getElementById("cmborganismo").className = "form-control border border-primary";
            document.getElementById("lblfechainicio").className = "text-primary";
            document.getElementById("txtfechainicio").className = "form-control border border-primary";
            document.getElementById("lblfechafin").className = "text-primary";
            document.getElementById("txtfechafin").className = "form-control border border-primary";
            document.getElementById("lblstatus").className = "text-primary";
            document.getElementById("cmbstatus").className = "form-control border border-primary";
            document.getElementById("lblobservacion").className = "text-primary";
            document.getElementById("txtobservacion").className = "form-control border border-primary";

            catalogoContext.ObtenerAcreditador(IdAcreditacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = catalogoContext.unidadAcreditacionlst[0].Dependencia;
                        ObtenerCarreras();
                        self.cve_carrera = catalogoContext.unidadAcreditacionlst[0].Carrera;
                        self.cve_organismo = catalogoContext.unidadAcreditacionlst[0].Organismo;
                        self.cve_fecha_inicio = catalogoContext.unidadAcreditacionlst[0].Fecha_Inicial;
                        self.cve_fecha_fin = catalogoContext.unidadAcreditacionlst[0].Fecha_Final;
                        self.cve_status = catalogoContext.unidadAcreditacionlst[0].Status;
                        self.cve_observaciones = catalogoContext.unidadAcreditacionlst[0].Observaciones;

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
            self.Titulo = "Agregar Acreditador";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lbldependencia").className = "text-success";
            document.getElementById("cmbdependencia").className = "form-control border border-success";
            document.getElementById("lblcarrera").className = "text-success";
            document.getElementById("cmbcarrera").className = "form-control border border-success";
            document.getElementById("lblorganismo").className = "text-success";
            document.getElementById("cmborganismo").className = "form-control border border-success";
            document.getElementById("lblfechainicio").className = "text-success";
            document.getElementById("txtfechainicio").className = "form-control border border-success";
            document.getElementById("lblfechafin").className = "text-success";
            document.getElementById("txtfechafin").className = "form-control border border-success";
            document.getElementById("lblstatus").className = "text-success";
            document.getElementById("cmbstatus").className = "form-control border border-success";
            document.getElementById("lblobservacion").className = "text-success";
            document.getElementById("txtobservacion").className = "form-control border border-success";
            self.cve_dependencia = "";
            self.cve_carrera = "";
            self.cve_organismo = "";
            self.cve_fecha_inicio = "";
            self.cve_fecha_fin = "";
            self.cve_status = "";
            self.cve_observaciones = "";
        };



        //var UnidadUpdate = function () {
        //    catalogoContext.AcreditadorUpdate(self.cve_id[0].Id,self.cve_dependencia[0].Dependencia, self.cve_carrera[0].Carrera, self.cve_organismo[0].Organismo, self.cve_fecha_inicio[0].Fecha_Inicial, self.cve_feha_fin[0].FechaFinal, self.cve_status[0].Status, self.cve_observaciones[0].Observaciones,, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":
        //                //  self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
        //                alert("¡Se han actualizado los datos correctamente!");
        //                break;
        //            case "notgp":
        //                self.mensaje_gral = resp.message;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });
        //};

        //this.AcreditadorUpdate = function () { UnidadUpdate(); }



        var UnidadCreate = function () {

            catalogoContext.AcreditadorCreate(self.cve_dependencia[0].Dependencia, self.cve_carrera[0].Carrera, self.cve_organismo[0].Organismo, self.cve_fecha_inicio[0].Fecha_Inicial, self.cve_feha_fin[0].FechaFinal, self.cve_status[0].Status, self.cve_observaciones[0].Observaciones, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        //  self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
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

        this.AcreditadorCreate = function () { UnidadCreate(); }



        var AcreditadorDelete = function (IdAcreditacion) {
            catalogoContext.eliminarAcreditador(IdAcreditacion, function (resp) {
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

        this.Eliminar = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Registro?");
            if (opcion == true) {
                AcreditadorDelete(Indice);
                alert("¡Se ha elimnado con exito!");
                CargarGrid();
            } else {
                alert("No se ha eliminado el registro");
            }
        };


        this.ValorDependencia = function () {
            this.ValorDependencia = function () {
                if (self.buscar == "00000") {
                    self.buscar = '';
                }
            };
        };



        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }

        



}]);


})();
