
(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);
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
        this.PlanMaestroModal = function () {
            self.EStatus = "A";
        }

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
            catalogoContext.GridAreasAtencion(self.buscarPlan, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                               
                        self.GridAreasAtencionView = catalogoContext.GridAreasAtencionLST;
                        self.Descripcion = "";      
                        if (self.GridAreasAtencionView.length == 0) {
                            document.getElementById("AAAlert").style.display = "block";                      
                            self.NoPlan = "¡No Existen registros para el Plan Seleccionado!";
                        } else {
                            document.getElementById("AAAlert").style.display = "none";
                            self.NoPlan = "";
                        }
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
        this.SavePlan = function () {  
            GuardarPlan();
        }
    
        var GuardarPlan = function () {
            catalogoContext.GuardarPlan(
                self.ObtenerDatosPlanView[0].Id_Coordinacion,
                self.EStatus,
                self.ObtenerDatosPlanView[0].Ejercicio,
                self.ObtenerDatosPlanView[0].Dependencia,                
                self.ObtenerDatosPlanView[0].Descripcion,
                self.ObtenerDatosPlanView[0].Fecha,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han guardado los datos correctamente!',
                                'success'
                            )
                            self.ObtenerDatosPlanView = null;
                            self.EStatus = null;
                            CargarComboPlanes();
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
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han guardado los datos correctamente!',
                                'success'
                            )
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
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    EliminarAreasAtencion(Id);
                    
                    Swal.fire(
                        '¡Eliminado!',
                        'Se ha eliminado con exito.',
                        'success'
                    );
                    GridAreasAtencion();
                }
            })
        };        
       
        var EliminarAreasAtencion = function (Id) {
            catalogoContext.EliminarAreasAtencion(Id, function (resp) {
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
                            document.getElementById("ACTAlert").style.display = "block";     
                            self.NoActv = "¡No Existen registros para esta área de atención!";
                        } else {
                            document.getElementById("ACTAlert").style.display = "none";
                            self.NoActv = "";
                        }

                        self.DescActividad = "";
                        self.itemDetails = "";
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
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han guardado los datos correctamente!',
                                'success'
                            )
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
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han actualizado los datos correctamente!',
                                'success'
                            )
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
        this.EliminnarA = function (Indice) {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    EliminarActividad(Indice);

                    Swal.fire(
                        '¡Eliminado!',
                        'Se ha eliminado con exito.',
                        'success'
                    );
                    GridActividades(self.IDMETA);
                }
            })
        };
      
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
                        console.log("Controller",self.GridUnidadesRespView);
                        if (self.GridUnidadesRespView.length == 0) {
                            document.getElementById("URAlert").style.display = "block";     
                            self.NoUR = "¡No Existen registros para esta Actividad!";
                        } else {
                            document.getElementById("URAlert").style.display = "none";  
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
            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("TituloURM").innerHTML = "Crear Responsables";
            document.getElementById("btnModal").className = "btn btn-success";
            document.getElementById("lblURM").className = "text-success";
            document.getElementById("SelectURM").className = "form-control border border-success";
            document.getElementById("lblContacto").className = "text-success";
            document.getElementById("inputContacto").className = "form-control border border-success";
            document.getElementById("lblTelefono").className = "text-success";
            document.getElementById("inputTelefono").className = "form-control border border-success";
            document.getElementById("lblCorreo").className = "text-success";
            document.getElementById("inputCorreo").className = "form-control border border-success";

            ObtenerComboUnidadesModal();
            self.DescripcionUR = "";
            
        }
        var ObtenerComboUnidadesModal = function () {
            catalogoContext.ObtenerComboUnidadesModal(self.buscarDependencias, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.ObtenerComboUnidadesModalView = catalogoContext.ObtenerComboUnidadesModalLST;
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

        /********************************************************************************************************************************************************/       
        this.SaveUR = function (Id) {
            if (Id) {
                EditarUnidadesResp(Id);                
            } else {
                GuardarUnidadesResp();                
            }
        }
        var GuardarUnidadesResp = function () {

            catalogoContext.GuardarUnidadesResp( 
                self.idActividad,
                self.ObtenerDatosUnidadesModalView[0].Descripcion,
                self.ObtenerDatosUnidadesModalView[0].Contacto,
                self.ObtenerDatosUnidadesModalView[0].Telefono,
                self.ObtenerDatosUnidadesModalView[0].Correo,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            GridUnidadesResp(self.idActividad);                 
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han Guardado los datos correctamente!',
                                'success'
                            )
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
        var EditarUnidadesResp = function (Id) {
            catalogoContext.EditarUnidadesResp(
                Id,
                self.idActividad,
                self.ObtenerDatosUnidadesModalView[0].Descripcion,
                self.ObtenerDatosUnidadesModalView[0].Contacto,
                self.ObtenerDatosUnidadesModalView[0].Telefono,
                self.ObtenerDatosUnidadesModalView[0].Correo,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            GridUnidadesResp(self.idActividad);
                            Swal.fire(
                                '¡Listo!',
                                '¡Se han actualizado los datos correctamente!',
                                'success'
                            )
                            self.ObtenerDatosUnidadesModalView = null;
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
        
        this.UpdateResp = function (Id) {
            document.getElementById("title").className = "modal-header btn-primary justify-content-center";
            document.getElementById("TituloURM").innerHTML = "Actualizar Responsables";
            document.getElementById("btnModal").className = "btn btn-primary";
            document.getElementById("lblURM").className = "text-primary";
            document.getElementById("SelectURM").className = "form-control border border-primary";
            document.getElementById("lblContacto").className = "text-primary";
            document.getElementById("inputContacto").className = "form-control border border-primary";
            document.getElementById("lblTelefono").className = "text-primary";
            document.getElementById("inputTelefono").className = "form-control border border-primary";
            document.getElementById("lblCorreo").className = "text-primary";
            document.getElementById("inputCorreo").className = "form-control border border-primary";
            ObtenerComboUnidadesModal();
            ObtenerDatosUnidadesResp(Id);
        }
        var ObtenerDatosUnidadesResp = function (Id) {
            catalogoContext.ObtenerDatosUnidadesResp(Id,
                function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.ObtenerDatosUnidadesModalView = catalogoContext.ObtenerDatosUnidadesRespLST;
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

        this.EliminarUR = function (Indice) {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    EliminarUnidadesResp(Indice);

                    Swal.fire(
                        '¡Eliminado!',
                        'Se ha eliminado con exito.',
                        'success'
                    );
                    GridUnidadesResp(self.idActividad);
                }
            })
        };
    
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
                     document.getElementById("TituloACTV").innerHTML = "Actualizar Actividades";
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
        this.ColorATCV = function () {

            document.getElementById("title").className = "modal-header btn-success justify-content-center";
            document.getElementById("TituloACTV").innerHTML = "Crear Actividades";
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
     
        this.getUR = function (Id, Descripcion) {
            GridUnidadesResp(Id);
            self.DescActividad = Descripcion;
            self.idActividad = Id;
        }
 
        this.close = function (form) {
            $('#ModalActividades').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();               
            }
         
            $('#ModalAreasDeAtencion').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $('#ModalAddUR').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $('#ModalPlanMastro').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            self.ObtenerDatosActividadesView = null;            
            self.Prioritaria = null;            
            self.ObtenerDatosUnidadesModalView = null;
            self.EStatus = null;
            self.idU = null;
            self.ObtenerDatosPlanView = null;
            self.EStatus = null;
        };
        this.reset = function (form) {
            $('#ModalActividades').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $('#ModalAddUR').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
  
            self.ObtenerDatosActividadesView = null;
            self.EStatus = null;
            self.Prioritaria = null;
            $('#ModalPlanMastro').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }     
        };    
       this.Meta = function (idMeta, Descripcion) {
            GridActividades(idMeta);
            self.IDMETA = idMeta;
            self.Descripcion = Descripcion;
           self.GridUnidadesRespView = null;
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
            console.log("Unidades", self.buscarUnidad)
        }

        /*******************************************************************************************************************************************************/

    }]);
})();

