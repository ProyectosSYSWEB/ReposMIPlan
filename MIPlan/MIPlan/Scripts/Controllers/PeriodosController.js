﻿
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);

/********************************************************************************************************************************************************/

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            //CargarGrid();
            self.periodo = null;
            self.EStatus = null;   
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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
    /********************************************************************************************************************************************************/
        var CargarGrid = function () {            
            catalogoContext.ObtenerGridPeriodos(self.depen,function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodos = catalogoContext.periodoslst;                                                 
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
                $('button').tooltip();
            });
        };
      
/********************************************************************************************************************************************************/
        var cargarModal = function (Idunidad) {
            catalogoContext.ObtenerPeriodo(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodo = catalogoContext.periodolst;   
                        self.EStatus = self.periodo[0].Status;
                        self.Ejercicio = self.periodo[0].Ejercicio;  
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

        this.Modal = function (Indice) {            
            document.getElementById("title").className = "modal-header btn-primary justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Actualizar Periodo";
            document.getElementById("btnModal").className = "btn btn-primary";
            document.getElementById("lblDependencia").className = "text-primary";
            document.getElementById("cmbDependencia").className = "form-control border border-primary";
            document.getElementById("lblPeriodo").className = "text-primary";
            document.getElementById("inputPeriodo").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("inputDescripcion").className = "form-control border  border-primary";
            document.getElementById("lblStatus").className = "text-primary";
            document.getElementById("cmbStatus").className = "form-control border  border-primary";
            document.getElementById("lblEjercicio").className = "text-primary";
            document.getElementById("inputEjercicio").className = "form-control border  border-primary";
            document.getElementById("lblInicio").className = "text-primary";
            document.getElementById("InicioUpdate").className = "form-control border border-primary";
            document.getElementById("lblFin").className = "text-primary";
            document.getElementById("FinUpdate").className = "form-control border border-primary";
            cargarModal(Indice);
        };
        this.Color = function () {               
            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Crear Periodo";
            document.getElementById("btnModal").className = "btn btn-success";
            document.getElementById("lblDependencia").className = "text-success";
            document.getElementById("cmbDependencia").className = "form-control border border-success";
            document.getElementById("lblPeriodo").className = "text-success";
            document.getElementById("inputPeriodo").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("inputDescripcion").className = "form-control border  border-success";
            document.getElementById("lblStatus").className = "text-success";
            document.getElementById("cmbStatus").className = "form-control border  border-success";
            document.getElementById("lblEjercicio").className = "text-success";
            document.getElementById("inputEjercicio").className = "form-control border  border-success";
            document.getElementById("lblInicio").className = "text-success";
            document.getElementById("InicioUpdate").className = "form-control border border-success";
            document.getElementById("lblFin").className = "text-success";
            document.getElementById("FinUpdate").className = "form-control border border-success";      
            self.EStatus = "A";    
            self.Ejercicio = (new Date).getFullYear();
        };
/********************************************************************************************************************************************************/
        var periodoUpdateF = function () {
                                                       
            catalogoContext.periodoUpdate(self.periodo[0].Id, self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.EStatus, self.Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin ,function (resp) {
                switch (resp.ressult) {
                    case "tgp":       
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han actualizado los datos correctamente!',
                            'success'
                        ) 
                        CargarGrid();
                        self.periodo = null;                                           
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

        this.periodoUpdate = function (ID) {
            if (ID) {
                periodoUpdateF();
            } else {
                periodoCreateF();
            }
        };

        /********************************************************************************************************************************************************/
        var periodoCreateF = function () {                                                                                                                                                                                
            catalogoContext.GuardarPerdiodos(self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.EStatus, self.Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin , function (resp) {
                switch (resp.ressult) {
                    case "tgp":         
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han guardado los datos correctamente!',
                            'success'
                        )
                        CargarGrid();
                        self.periodo = null;                       
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

       // this.periodoeCreate = function () { periodoCreateF(); }
        /********************************************************************************************************************************************************/
        var EliminnarPeriodoF = function (IdPeriodo) {
            catalogoContext.eliminarPeriodo(IdPeriodo, function (resp) {
                switch (resp.ressult) {
                    case "tgp": 
                        Swal.fire(
                            '¡Eliminado!',
                            'Se ha eliminado con exito.',
                            'success'
                        );
                        CargarGrid();   
                        break;
                    case "notgp":
                        Swal.fire(
                            'Oooops :(',
                            '¡Fallo al reaizar esta acción!',
                            'error'
                        );
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;                     
                        break;
                    default:
                        break;
                }                
            });
        };

        this.EliminnarPeriodo = function (Indice) {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    EliminnarPeriodoF(Indice);                  
                }
            })
        };
        /*******************************************************************************************************************************************************/
        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };
        this.DivErrorModal = function () {
            document.getElementById("ErrorModal").style.display = "none";
        };

        this.ValorDependencia = function () {     
            CargarGrid();
            if (self.buscar == "00000" || self.buscar == null) {
                self.buscar = '';
            }            
        };

        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }

        this.close = function (form) {
            $('#ModalPeriodo').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
                CargarGrid();
            }
            self.unidad = null;
            self.Clave = null;
            self.EStatus = null;
        };

        this.reset = function (form) {
            $('#ModalPeriodo').modal('hide');           
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }        
            self.periodo = null;
            self.EStatus = null;
        };
        /*******************************************************************************************************************************************************/

    }]);
})();
