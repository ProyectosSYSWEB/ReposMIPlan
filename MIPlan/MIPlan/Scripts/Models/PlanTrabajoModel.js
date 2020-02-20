
var catalogoContext =
{
    dependenciaslst: [], ListaUnidadResponsableLST: [], ListaEjerciciosLST: [], ListaPlanesLST: [], GridAreasAtencionLST: [], ObtenerModalGridAreasAtencionLST: [],
    GridActividadesLST: [], ObtenerDatosActividadesLST: [], ObtenerProgramasLST: [], GridProgramas: [],
    GridUnidadesRespLST: [], EditarActividadesLST: [], ObtenerDatosUnidadesRespLST: [], ObtenerComboUnidadesModalLST: [],
   
/********************************************************************************************************************************************************/
    ObtenerDependencias: function (callBackResult) {
        var self = this;
        self.dependenciaslst.length = 0;
        //var urlServer = "http://localhost:53805/";
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'Catalogo/ObtenerDependencias',
                success: function (resp) {                    
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {

                            self.dependenciaslst.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });                            
                        }                        
                        if (callBackResult != undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }

                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult != undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDependencias." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ListaUnidadResponsable: function (callBackResult) {
        var self = this;
        self.ListaUnidadResponsableLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaUnidadResponsable',                
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaUnidadResponsableLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion});
                        }
                                         
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }                  
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaUnidadResponsable." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ListaEjercicios: function (callBackResult) {
        var self = this;
        self.ListaEjerciciosLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaEjercicios',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaEjerciciosLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        }

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaEjercicios." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ListaPlanes: function (callBackResult) {
        var self = this;
        self.ListaPlanesLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ListaPlanes',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ListaPlanesLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });
                        } 

                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ListaEjercicios." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GuardarPlan: function (Id_Coordinacion, Status, Ejercicio, Dependencia, Descripcion, Fecha, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GuardarPlan',
                data: { Id_Coordinacion, Status, Ejercicio, Dependencia, Descripcion, Fecha },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarPlan." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GridAreasAtencion: function (buscarPlan, callBackResult) {
        var self = this;
        self.GridAreasAtencionLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GridAreasAtencion',
                data: { buscarPlan },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.GridAreasAtencionLST.push({ Id: resp.Resultado[i].Id, Descripcion: resp.Resultado[i].Descripcion });                            
                       }                        
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GridAreasAtencion." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ObtenerModalGridAreasAtencion: function (Ejercicio, Dependencia, callBackResult) {
        var self = this;
        self.ObtenerModalGridAreasAtencionLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ObtenerModalGridAreasAtencion',
                data: { Ejercicio, Dependencia },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ObtenerModalGridAreasAtencionLST.push({ Id_Plan: resp.Resultado[i].Id_Plan, Id_Area: resp.Resultado[i].Id_Area, Descripcion: resp.Resultado[i].Descripcion });
                        }                     
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerModalGridAreasAtencion." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GuardarAreasAtencion: function (Id_Plan, Id_Area_Atencion, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GuardarAreasAtencion',
                data: { Id_Plan, Id_Area_Atencion },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarAreasAtencion." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    EliminarAreasAtencion: function (Id, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/EliminarAreasAtencion',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarAreasAtencion." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GridActividades: function (idMeta, callBackResult) {
        var self = this;
        self.GridActividadesLST.length = 0;
        self.GridProgramas.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GridActividades',
                data: { idMeta },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.GridActividadesLST.push({ Id: resp.Resultado[i].Id, Desc_Programa: resp.Resultado[i].Desc_Programa, Desc_Accion: resp.Resultado[i].Desc_Accion, Detalles: resp.Resultado[i].Detalles, Fecha_Inicio: resp.Resultado[i].Fecha_Inicio, Fecha_Fin: resp.Resultado[i].Fecha_Fin, Impacto: resp.Resultado[i].Impacto, Prioritaria: resp.Resultado[i].Prioritaria, Status: resp.Resultado[i].Status, Id_Padre: resp.Resultado[i].Id_Padre, Id_Programa: resp.Resultado[i].Id_Programa  });
                            self.GridProgramas.push({ Desc_Programa: resp.Resultado[i].Desc_Programa });
                        }                      
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GridActividades." });
                    }
                }
            });

    },
 /********************************************************************************************************************************************************/
    ObtenerDatosActividades: function (Id, callBackResult) {
        var self = this;
        self.ObtenerDatosActividadesLST.length = 0;        
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ObtenerDatosActividades',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ObtenerDatosActividadesLST.push({ Id: resp.Resultado[i].Id, Id_Programa: resp.Resultado[i].Id_Programa, Accion: resp.Resultado[i].Descripcion, Detalles: resp.Resultado[i].Detalles, Fecha_Inicio: resp.Resultado[i].Fecha_Inicio, Fecha_Fin: resp.Resultado[i].Fecha_Fin, Impacto: resp.Resultado[i].Impacto, Prioritaria: resp.Resultado[i].Prioritaria, Status: resp.Resultado[i].Status, Clave: resp.Resultado[i].Clave, Id_Padre: resp.Resultado[i].Id_Padre});
                        }                       
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDatosActividades." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ObtenerProgramas: function (callBackResult) {
        var self = this;
        self.ObtenerProgramasLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ObtenerProgramas',
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ObtenerProgramasLST.push({ Id: resp.Resultado[i].EtiquetaDos, Programa: resp.Resultado[i].Descripcion });
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerProgramas." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GuardarActividades: function (Meta, Clave, Descripcion, Detalles, Impacto, Status, FechaInicio, FechaFin, Programa, Prioritaria, Id_Padre, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GuardarActividades',
                data: { Meta, Clave, Descripcion, Detalles, Impacto, Status, FechaInicio, FechaFin, Programa, Prioritaria, Id_Padre },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GuardarActividades." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    EditarActividades: function (Id, Programa, Descripcion, Detalles, FechaInicio, FechaFin, Impacto, Prioritaria, Clave, Status, Id_Padre, callBackResult) {    
        console.log(Id, Programa, Descripcion, Detalles, FechaInicio, FechaFin, Impacto, Prioritaria, Clave, Status, Id_Padre);

        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/EditarActividades',
                data: { Id, Programa, Descripcion, Detalles, FechaInicio, FechaFin, Impacto, Prioritaria, Clave, Status, Id_Padre },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarActividades." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    EliminarActividades: function (Id, callBackResult) {        
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/EliminarActividades',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {                       
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });                          
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarActividades." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GridUnidadesResp: function (idActividad, callBackResult) {
        var self = this;
        self.GridUnidadesRespLST.length = 0;        
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GridUnidadesResp',
                data: { idActividad },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.GridUnidadesRespLST.push({ Id: resp.Resultado[i].Id, Id_Actividad: resp.Resultado[i].Id_Actividades, Descripcion: resp.Resultado[i].Descripcion, Contacto: resp.Resultado[i].Contacto, Telefono: resp.Resultado[i].Telefono, Correo: resp.Resultado[i].Correo });                            
                        }                      
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en GridUnidadesResp." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    ObtenerDatosUnidadesResp: function (Id, callBackResult) {
        var self = this;
        self.ObtenerDatosUnidadesRespLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ObtenerDatosUnidadesResp',  
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ObtenerDatosUnidadesRespLST.push({ Id: resp.Resultado[i].Id, Id_Actividad: resp.Resultado[i].Id_Actividades, Descripcion: resp.Resultado[i].Id_Unidad, Contacto: resp.Resultado[i].Contacto, Telefono: resp.Resultado[i].Telefono, Correo: resp.Resultado[i].Correo});
                        }
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerDatosUnidadesResp." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    GuardarUnidadesResp: function (Id_Actividades, Id_Unidad, Contacto, Telefono, Correo, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/GuardarUnidadesResp',
                data: { Id_Actividades, Id_Unidad, Contacto, Telefono, Correo },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al Guardar los datos en GuardarUnidadesResp." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    EditarUnidadesResp: function (Id, Id_Actividades, Id_Unidad, Contacto, Telefono, Correo , callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/EditarUnidadesResp',
                data: { Id, Id_Actividades, Id_Unidad, Contacto, Telefono, Correo },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EditarUnidadesResp." });
                    }
                }
            });

    },
/********************************************************************************************************************************************************/
    EliminarUnidadResponsable: function (Id, callBackResult) {
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/EliminarUnidadResponsable',
                data: { Id },
                success: function (resp) {
                    if (resp.Error == false) {
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en EliminarUnidadResponsable." });
                    }
                }
            });
    },
/********************************************************************************************************************************************************/
    ObtenerComboUnidadesModal: function (dependencia, callBackResult) {
        var self = this;
        self.ObtenerComboUnidadesModalLST.length = 0;
        $.ajax(
            {
                type: 'GET',
                cache: false,
                url: urlServer + 'PlanTrabajo/ObtenerComboUnidadesModal',
                data: { dependencia },
                success: function (resp) {
                    if (resp.Error == false) {
                        for (var i = 0; i < resp.Resultado.length; i++) {
                            self.ObtenerComboUnidadesModalLST.push({ Id: resp.Resultado[i].Id, Dependencia: resp.Resultado[i].Dependencia, Clave: resp.Resultado[i].Clave, Descripcion: resp.Resultado[i].Descripcion, Status: resp.Resultado[i].Status, Coordinador: resp.Resultado[i].Coordinador });
                        }                        
                        if (callBackResult !== undefined) {
                            callBackResult({ ressult: 'tgp', message: null });
                        }
                    } else {
                        callBackResult({ ressult: "notgp", message: resp.MensajeError });
                    }
                },
                error: function (ex) {
                    if (callBackResult !== undefined) {
                        callBackResult({ ressult: "notgp", message: "Ocurrio un error al obtener los datos en ObtenerGridUnidadesModal." });
                    }
                }
            });

    },
};