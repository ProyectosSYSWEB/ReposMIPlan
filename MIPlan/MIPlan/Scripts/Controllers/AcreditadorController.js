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
            //CargarCarrera();
        };

        var CargarCombos = function () {
            ObtenerDependencias();
            
        };
        this.Carrera = function () {
            CargarCarre();

        };
        var CargarCarre = function () {
            ObtenerCarreras();

        };
       
        //this.UnidadAcreditadorUpdate = function () {
        //    UnidadUpdate();

        //}

        //this.BorrarBasico = function (Indice) {
        //    alert(Indice);
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
            catalogoContext.ObtenerCarreras(function (resp) {
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


        var cargarModal = function (IdAcreditacion) {
            catalogoContext.ObtenerAcreditador(IdAcreditacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidad = catalogoContext.unidadAcreditacionlst;
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


        //this.cargarModal = function (IdAcreditacion) {
        //    catalogoContext.ObtenerAcreditador(IdAcreditacion, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":
        //                self.cve_dependencia = catalogoContext.unidadAcreditacionlst[0].Dependencia;
        //                self.cve_carrera = catalogoContext.unidadAcreditacionlst[0].Carrera;
        //                self.cve_organismo = catalogoContext.unidadAcreditacionlst[0].Organismo;
        //                self.cve_fecha_inicio = catalogoContext.unidadAcreditacionlst[0].Fecha_Inicial;
        //                self.cve_feha_fin = catalogoContext.unidadAcreditacionlst[0].Fecha_Final;
        //                self.cve_status = catalogoContext.unidadAcreditacionlst[0].Status;
        //                self.cve_observacion = catalogoContext.unidadAcreditacionlst[0].Observacion;

                        
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



        var UnidadUpdate = function () {
            catalogoContext.AcreditadorUpdate(self.unidad[0].Id, self.unidad[0].Dependencia, self.unidad[0].Carrera, self.unidad[0].Organismo, self.unidad[0].Fecha_Inicial, self.unidad[0].Fecha_Final, self.unidad[0].Status, self.unidad[0].Observacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        //  self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
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

        this.AcreditadorUpdate = function () { UnidadUpdate(); }



        var UnidadCreate = function () {

            catalogoContext.AcreditadorCreate(self.unidad[0].Dependencia, self.unidad[0].Carrera, self.unidad[0].Organismo, self.unidad[0].FechaInicial, self.unidad[0].FechaFinal, self.unidad[0].Status , self.unidad[0].Observaciones,function (resp) {
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
            alert(self.cve_dependencia);
        };



}]);


})();
