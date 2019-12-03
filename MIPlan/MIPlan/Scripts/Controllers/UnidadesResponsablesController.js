﻿(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);
/********************************************************************************************************************************************************/
    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {

        var self = this;
        self.buscar = '';
        

        this.Inicio = function () {
            CargarCombos();
            CargarGrid();         
            self.unidad = null;
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
            catalogoContext.ObtenerUnidades( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidades = catalogoContext.unidadesRlst;                        
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
            catalogoContext.ObtenerUnidad(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidad = catalogoContext.unidadadRlst;
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

        this.Modal = function (Indice) {
            document.getElementById("title").className = "modal-header btn-primary justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Actualizar Unidad Responsable";
            document.getElementById("btnModal").className = "btn btn-primary";
            document.getElementById("lblDependencia").className = "text-primary";
            document.getElementById("cmbDependencia").className = "form-control border border-primary";
            document.getElementById("lblClave").className = "text-primary";
            document.getElementById("inputClave").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("inputDescripcion").className = "form-control border  border-primary";
            document.getElementById("lblStatus").className = "text-primary";
            document.getElementById("cmbStatus").className = "form-control border  border-primary";
            document.getElementById("lblCoordinacion").className = "text-primary";
            document.getElementById("inputCoordincacion").className = "form-control border border-primary";
            cargarModal(Indice);
        };
        this.Color = function () {            
            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Crear Unidad Responsable";
            document.getElementById("btnModal").className = "btn btn-success";
            document.getElementById("lblDependencia").className = "text-success";
            document.getElementById("cmbDependencia").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("inputClave").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("inputDescripcion").className = "form-control border  border-success";
            document.getElementById("lblStatus").className = "text-success";
            document.getElementById("cmbStatus").className = "form-control border  border-success";
            document.getElementById("lblCoordinacion").className = "text-success";
            document.getElementById("inputCoordincacion").className = "form-control border border-success";          
        };

/********************************************************************************************************************************************************/
        var UnidadUpdate = function () {            
            
            
            catalogoContext.UnidadResponsableUpdate(self.unidad[0].Id, self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        CargarGrid();
                        self.unidad = null;
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

        this.UnidadResponsableUpdateCreate = function (ID) {     
            if (ID) {
                UnidadUpdate();
            } else {
                UnidadCreate();           
            }                 
        }

/********************************************************************************************************************************************************/
        var UnidadCreate = function () {
            console.log(self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador);
            catalogoContext.UnidadResponsableCreate(self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":           
                        CargarGrid();
                        self.unidad = null;
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
        this.UnidadResponsableCreate = function () { UnidadCreate(); }

/********************************************************************************************************************************************************/            
        var eliminarUnidadResponsable = function (Idunidad) {
            catalogoContext.eliminarUnidad(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                                                                        
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;                        
                        break;
                    default:
                        break;
                }
                
            });
        };
     
        this.EliminnarUR = function (Indice) { 
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {                
                eliminarUnidadResponsable(Indice);                  
                alert("¡Se ha elimnado con exito!");
                CargarGrid();
            } else {
                alert("No se ha eliminado el registro");
            }
        };
/*******************************************************************************************************************************************************/
        this.ValorDependencia = function () {
            if (self.buscar == "00000") {
                self.buscar = '';
            }
        };
        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }
/*******************************************************************************************************************************************************/
      
    }]);
})();

