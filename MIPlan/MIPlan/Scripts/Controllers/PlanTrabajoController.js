
(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);
    /********************************************************************************************************************************************************/
    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {

        var self = this;
        self.buscar = '';


        this.Inicio = function () {
            CargarCombos();                       
        };

        var CargarCombos = function () {
            ObtenerDependencias();
            CargarComboUR();
            CargarComboEjercicios();
            CargarComboPlanes();
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
        var CargarComboUR = function () {
            catalogoContext.ListaUnidadResponsable(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.UnidadesResponsables = catalogoContext.ListaUnidadResponsableLST;                        
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
        var CargarComboEjercicios = function () {
            catalogoContext.ListaEjercicios(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Ejercicios = catalogoContext.ListaEjerciciosLST;
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
     
        var CargarComboPlanes = function () {
            catalogoContext.ListaPlanes(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Planes = catalogoContext.ListaPlanesLST;
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
        var GridAreasAtencion = function () {
            catalogoContext.GridAreasAtencion(self.buscarDependencias, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        self.GridAreasAtencionView = catalogoContext.GridAreasAtencionLST;
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
        var GridActividades = function (idMeta) {
            catalogoContext.GridActividades(idMeta, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridActividadesView = catalogoContext.GridActividadesLST;
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

        var ObtenerDatosActividades = function (Id) {
            catalogoContext.ObtenerDatosActividades(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerDatosActividadesView = catalogoContext.ObtenerDatosActividadesLST;
                        //self.EStatus = self.ObtenerDatosActividadesView[0].Status;
                        self.Prioritaria = self.ObtenerDatosActividadesView[0].Prioritaria;  
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

        var EliminarActividades = function (Id) {
            catalogoContext.EliminarActividades(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        alert("¡Se ha eliminado con exito!");
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

        var ObtenerProgramas = function () {
            catalogoContext.ObtenerProgramas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerProgramasView = catalogoContext.ObtenerProgramasLST;
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


        this.Modal = function (Id) {
            document.getElementById("title").className = "modal-header btn-primary justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Actualizar Actividades";
            document.getElementById("btnModal").className = "btn btn-primary";
            document.getElementById("lblPrograma").className = "text-primary";
            document.getElementById("cmbPrograma").className = "form-control border border-primary";
            document.getElementById("lblAccion").className = "text-primary";
            document.getElementById("inputAccion").className = "form-control border border-primary";
            document.getElementById("lblInicio").className = "text-primary";
            document.getElementById("InicioUpdate").className = "form-control border border-primary";
            document.getElementById("lblFin").className = "text-primary";
            document.getElementById("FinUpdate").className = "form-control border border-primary";
            document.getElementById("lblImpacto").className = "text-primary";
            document.getElementById("inputImpacto").className = "form-control border  border-primary";
            document.getElementById("lblPrioritaria").className = "text-primary";
            document.getElementById("cmbPrioritaria").className = "form-control border  border-primary";
            document.getElementById("lblStatus").className = "text-primary";
            document.getElementById("cmbStatus").className = "form-control border  border-primary";

           
            ObtenerDatosActividades(Id);
            ObtenerProgramas();
        };
        this.Color = function () {
            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Crear Actividades";
            document.getElementById("btnModal").className = "btn btn-success";
            document.getElementById("lblPrograma").className = "text-success";
            document.getElementById("cmbPrograma").className = "form-control border border-success";
            document.getElementById("lblAccion").className = "text-success";
            document.getElementById("inputAccion").className = "form-control border border-success";
            document.getElementById("lblInicio").className = "text-success";
            document.getElementById("InicioUpdate").className = "form-control border border-success";
            document.getElementById("lblFin").className = "text-success";
            document.getElementById("FinUpdate").className = "form-control border border-success";
            document.getElementById("lblImpacto").className = "text-success";
            document.getElementById("inputImpacto").className = "form-control border  border-success";
            document.getElementById("lblPrioritaria").className = "text-success";
            document.getElementById("cmbPrioritaria").className = "form-control border  border-success";
            document.getElementById("lblStatus").className = "text-success";
            document.getElementById("cmbStatus").className = "form-control border  border-success";
            self.EStatus = "A";
            self.Prioritaria = "S";
            ObtenerProgramas();
        };
        /*******************************************************************************************************************************************************/
        this.close = function (form) {
            $('#ModalActividades').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();               
            }
            self.ObtenerDatosActividadesView = null;
            self.EStatus = null;
            self.Prioritaria = null;
        };

        this.reset = function (form) {
            $('#ModalActividades').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            self.ObtenerDatosActividadesView = null;
            self.EStatus = null;
            self.Prioritaria = null;
        };

        this.Meta = function (idMeta) {
            GridActividades(idMeta);
        }

        this.BtnBuscar = function () {
            GridAreasAtencion();            
        }

        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };

        this.ValorDependencia = function () {
            if (self.buscar == "00000" || self.buscar == null) {
                self.buscar = '';
            }
        };   

        this.ValorUnidad = function () {
            alert("Unidades")
        }

        this.Prueba = function () {
            alert("Funciona");
        }
        /*******************************************************************************************************************************************************/

    }]);
})();

