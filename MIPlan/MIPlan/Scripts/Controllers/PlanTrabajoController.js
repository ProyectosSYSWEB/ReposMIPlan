
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " ObtenerDependencias";
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " CargarComboUR";
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " CargarComboEjercicios";
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " CargarComboPlanes";
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
                        self.Descripcion = "";
                        console.log(self.GridAreasAtencionView );
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " GridAreasAtencion";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        this.ModalAreasDeAtencion = function () {
            ObtenerModalGridAreasAtencion();
            self.DescripcionAA = "";
        }
        var ObtenerModalGridAreasAtencion = function () {
            catalogoContext.ObtenerModalGridAreasAtencion(self.buscarEjercicios, self.buscarDependencias, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerModalGridAreasAtencionView = catalogoContext.ObtenerModalGridAreasAtencionLST;
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + "  ObtenerModalGridAreasAtencion";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        this.SaveAA = function () {
            GuardarAreasAtencion();
        }
        this.getIdAA = function (Id_Plan, Id_Area_Atencion, Descripcion) {
            self.Id_Plan = Id_Plan;
            self.Id_Area_Atencion = Id_Area_Atencion;
            self.DescripcionAA = Descripcion;
        }
        var GuardarAreasAtencion = function () {           
            catalogoContext.GuardarAreasAtencion(
                self.Id_Plan, self.Id_Area_Atencion,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            GridAreasAtencion();
                            alert("¡Se han Guardado los datos correctamente!");
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            document.getElementById("Error").style.display = "block";
                            document.getElementById("Message").innerHTML = self.mensaje_gral + " GuardarAreasAtencion";
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });

        };
        /********************************************************************************************************************************************************/
        this.DeleteAA = function (Id) {            
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                EliminarAreasAtencion(Id);
                alert("¡Se ha eliminado con exito!");
                GridAreasAtencion();

            } else {
                alert("No se ha eliminado el registro");
            }
        };        
        var EliminarAreasAtencion = function (Id) {
            catalogoContext.EliminarAreasAtencion(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        GridAreasAtencion();
                        break;
                    case "notgp":

                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                //$scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        var GridActividades = function (idMeta) {
            catalogoContext.GridActividades(idMeta, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                       
                        self.GridActividadesView = catalogoContext.GridActividadesLST;

                        self.GridProgramas = catalogoContext.GridProgramas;
                        self.GridProgramas = self.GridProgramas.filter((valorActual, indiceActual, arreglo) => {
                            return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
                        });  
                       
                        if (self.GridActividadesView.length == 0) {
                            self.NoActv = "¡No Existen registros para esta área de atención!";
                        } else {
                            self.NoActv = "";
                        }

                        self.DescActividad = "";
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " GridActividades";
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
                        self.Prioritaria = self.ObtenerDatosActividadesView[0].Prioritaria;
                        self.EStatus = self.ObtenerDatosActividadesView[0].Status;
                        self.ObtenerDatosActividadesView[0].Id_Programa = self.ObtenerDatosActividadesView[0].Id_Programa + "";
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " ObtenerDatosActividades";
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " ObtenerProgramas";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        var GuardarActividades = function () {
            catalogoContext.GuardarActividades(
                self.IDMETA,
                self.ObtenerDatosActividadesView[0].Clave,
                self.ObtenerDatosActividadesView[0].Accion,
                self.ObtenerDatosActividadesView[0].Impacto,
                self.EStatus,
                self.ObtenerDatosActividadesView[0].Fecha_Inicio,
                self.ObtenerDatosActividadesView[0].Fecha_Fin,
                self.ObtenerDatosActividadesView[0].Id_Programa,
                self.Prioritaria, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            alert("¡Se han guardado los datos correctamente!");
                            self.ObtenerDatosActividadesView = null;
                            GridActividades(self.IDMETA);
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            document.getElementById("Error").style.display = "block";
                            document.getElementById("Message").innerHTML = self.mensaje_gral + " GuardarActividades";
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
        };
        /********************************************************************************************************************************************************/
        var EditarActividades = function () {
            catalogoContext.EditarActividades(
                self.ObtenerDatosActividadesView[0].Id,
                self.ObtenerDatosActividadesView[0].Id_Programa,
                self.ObtenerDatosActividadesView[0].Accion,
                self.ObtenerDatosActividadesView[0].Fecha_Inicio,
                self.ObtenerDatosActividadesView[0].Fecha_Fin,
                self.ObtenerDatosActividadesView[0].Impacto,
                self.Prioritaria,
                self.ObtenerDatosActividadesView[0].Clave,
                self.EStatus, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            alert("¡Se han actualizado los datos correctamente!");
                            self.ObtenerDatosActividadesView = null;
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            document.getElementById("Error").style.display = "block";
                            document.getElementById("Message").innerHTML = self.mensaje_gral + " EditarActividades";
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
        };
        /********************************************************************************************************************************************************/
        var EliminarActividad = function (Id) {
            catalogoContext.EliminarActividades(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        break;
                    case "notgp":

                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                //$scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        var GridUnidadesResp = function (idActividad) {
            catalogoContext.GridUnidadesResp(idActividad , function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        self.GridUnidadesRespView = catalogoContext.GridUnidadesRespLST;


                        if (self.GridUnidadesRespView.length == 0) {
                            self.NoUR = "¡No Existen registros para esta Actividad!";
                        } else {
                            self.NoUR = "";
                        }
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " GridUnidadesResp";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };        
        /********************************************************************************************************************************************************/
        this.GridUR = function () {
            ObtenerGridUnidadesModal();
            self.DescripcionUR = "";
        }
        var ObtenerGridUnidadesModal = function () {
            catalogoContext.ObtenerGridUnidadesModal(self.buscarDependencias, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerGridUnidadesModalView = catalogoContext.ObtenerGridUnidadesModalLST;
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + "  ObtenerGridUnidadesModal";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/
        var ObtenerDatosUnidadesResp = function (Id) {
            catalogoContext.ObtenerDatosUnidadesResp(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerDatosUnidadesRespView = catalogoContext.ObtenerDatosUnidadesRespLST;                        
                        self.EStatus = self.ObtenerDatosUnidadesRespView[0].Status;
                        self.Coordinador = self.ObtenerDatosUnidadesRespView[0].Coordinador;  
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " ObtenerDatosUnidadesResp";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/       
        this.SaveUR = function () {
            GuardarUnidadesResp();
        }
        this.getId = function (Id, Descripcion) {
            self.idU = Id;
            self.DescripcionUR = Descripcion;
        }
        var GuardarUnidadesResp = function () {

            catalogoContext.GuardarUnidadesResp( 
                self.idActividad,
                self.idU,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            GridUnidadesResp(self.idActividad);
                            alert("¡Se han Guardado los datos correctamente!");                             
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            document.getElementById("Error").style.display = "block";
                            document.getElementById("Message").innerHTML = self.mensaje_gral + " GuardarUnidadesResp";
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });

        };
        /********************************************************************************************************************************************************/
        var EditarUnidadesResp = function () {           
            catalogoContext.EditarUnidadesResp(
                self.ObtenerDatosUnidadesRespView[0].Id,
                self.ObtenerDatosUnidadesRespView[0].Dependencia,
                self.ObtenerDatosUnidadesRespView[0].Clave,
                self.ObtenerDatosUnidadesRespView[0].Descripcion,
                self.EStatus,
                self.ObtenerDatosUnidadesRespView[0].Coordinador,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            alert("¡Se han actualizado los datos correctamente!");
                            self.ObtenerDatosUnidadesRespView = null;
                            break;
                        case "notgp":
                            self.mensaje_gral = resp.message;
                            document.getElementById("Error").style.display = "block";
                            document.getElementById("Message").innerHTML = self.mensaje_gral + " EditarUnidadesResp";
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
        };
        /********************************************************************************************************************************************************/
        var EliminarUnidadesResp = function (Id) {         
            catalogoContext.EliminarUnidadResponsable(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        break;
                    case "notgp":

                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                //$scope.$apply();
            });
        };
        /********************************************************************************************************************************************************/  
        this.ModalACTV = function (Id) {                        
                    document.getElementById("title").className = "modal-header btn-primary justify-content-center";
                    document.getElementById("exampleModalLabel").innerHTML = "Actualizar Actividades";
                    document.getElementById("btnModal").className = "btn btn-primary";
                    document.getElementById("lblPrograma").className = "text-primary";
                    document.getElementById("cmbPrograma").className = "form-control border border-primary";
                    document.getElementById("lblClave").className = "text-primary";
                    document.getElementById("inputClave").className = "form-control border border-primary";
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
        this.ModalUR = function (Id) {                   
                    document.getElementById("titleUR").className = "modal-header btn-primary justify-content-center";
                    document.getElementById("exampleModalLabelUR").innerHTML = "Actualizar Unidad Responsable";
                    document.getElementById("btnModalUR").className = "btn btn-primary";
                    document.getElementById("lblDependencia").className = "text-primary";
                    document.getElementById("cmbDependencia").className = "form-control border border-primary";
                    document.getElementById("lblClaveUR").className = "text-primary";
                    document.getElementById("inputClaveUR").className = "form-control border border-primary";
                    document.getElementById("lblDescripcion").className = "text-primary";
                    document.getElementById("inputDescripcion").className = "form-control border  border-primary";
                    document.getElementById("lblStatusUR").className = "text-primary";
                    document.getElementById("cmbStatusUR").className = "form-control border  border-primary";
                    document.getElementById("lblCoordinacion").className = "text-primary";
                    document.getElementById("Radio").className = "radio-group form-control border border-primary text-center";
                    ObtenerDatosUnidadesResp(Id);
        };
        this.ColorATCV = function () {

            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("exampleModalLabel").innerHTML = "Crear Actividades";
            document.getElementById("btnModal").className = "btn btn-success";
            document.getElementById("lblPrograma").className = "text-success";
            document.getElementById("cmbPrograma").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("inputClave").className = "form-control border border-success";
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
            self.EStatus = "P";
            self.Prioritaria = "S";
            ObtenerProgramas();
        };
        /*******************************************************************************************************************************************************/

        this.ActividadesCrud = function (ID) {
            if (ID) { 
                EditarActividades();
            } else {               
                GuardarActividades();
            }
        };
        this.EliminnarA = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                EliminarActividad(Indice);
                alert("¡Se ha eliminado con exito!");
                GridActividades(self.IDMETA);

            } else {
                alert("No se ha eliminado el registro");
            }
        };
        this.getUR = function (Id, Descripcion) {
            GridUnidadesResp(Id);
            self.DescActividad = Descripcion;
            self.idActividad = Id;
        }
        this.EditUR = function () {            
                EditarUnidadesResp();        
        }   
        this.EliminarUR = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                EliminarUnidadesResp(Indice);
                alert("¡Se ha eliminado con exito!");
                GridUnidadesResp(self.idActividad);

            } else {
                alert("No se ha eliminado el registro");
            }
        };
        this.close = function (form) {
            $('#ModalActividades').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();               
            }
          

            $('#ModalUnidadesResp').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();                
            }

            $('#ModalAddUR').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }

            $('#ModalAreasDeAtencion').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }

            self.ObtenerDatosActividadesView = null;            
            self.Prioritaria = null;
            self.ObtenerDatosUnidadesRespView = null;            
            self.EStatus = null;
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
            GridActividades(self.IDMETA);
   
        };

        this.resetUR = function (form) {
            $('#ModalUnidadesResp').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            self.ObtenerDatosUnidadesRespView = null;
            self.EStatus = null;          
            GridUnidadesResp(self.idActividad);
        };


        this.Meta = function (idMeta, Descripcion) {
            GridActividades(idMeta);
            self.IDMETA = idMeta;
            self.Descripcion = Descripcion;
        }
        this.URS = function (Descripcion) {            
            self.Descripcion = Descripcion;
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

