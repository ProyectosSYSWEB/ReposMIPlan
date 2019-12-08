(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);    
/********************************************************************************************************************************************************/
    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {        
        var self = this;        
        self.buscar = '';
        

        this.Inicio = function () {
            CargarCombos();
            CargarGrid();                                         
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
            catalogoContext.ObtenerUnidades( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidades = catalogoContext.unidadesRlst;                          
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
        var cargarModal = function (Idunidad) {
            catalogoContext.ObtenerUnidad(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidad = catalogoContext.unidadadRlst;
                        self.EStatus = self.unidad[0].Status;
                        self.Clave = self.unidad[0].Clave;                       
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
            document.getElementById("Radio").className = "radio-group form-control border border-primary text-center";  
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
            document.getElementById("Radio").className = "radio-group form-control border border-success text-center";          

            self.EStatus = "A";           
            var iNumeroMayor = self.unidades[0].Clave;
            for (var i = 0; i < self.unidades.length; i++) {
                if (self.unidades[i].Clave > iNumeroMayor) {
                    iNumeroMayor = self.unidades[i].Clave;                  
                } 
            }
            self.Clave = parseInt(iNumeroMayor) + 1;
        };

/********************************************************************************************************************************************************/
        var UnidadUpdate = function () {                                   
            catalogoContext.UnidadResponsableUpdate(self.unidad[0].Id, self.unidad[0].Dependencia, self.Clave, self.unidad[0].Descripcion, self.EStatus, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                                    
                        alert("¡Se han actualizado los datos correctamente!");
                        CargarGrid();
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

        this.UnidadResponsableUpdateCreate = function (ID) {     
            if (ID && self.unidad != null) {
                UnidadUpdate();
            } else if (self.unidad != null && self.unidad[0].Dependencia != null && self.Clave != null && self.unidad[0].Descripcion != null && self.EStatus != null && self.unidad[0].Coordinador != null) {
                UnidadCreate();
            } else {
                document.getElementById("ErrorModal").style.display = "block";
                document.getElementById("MessageModal").innerHTML = "¡Favor de llenar todos los campos!";
            }                 
        }

/********************************************************************************************************************************************************/
        var UnidadCreate = function () {           
            catalogoContext.UnidadResponsableCreate(self.unidad[0].Dependencia, self.Clave, self.unidad[0].Descripcion, self.EStatus, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                                   
                        alert("¡Se ha creado la unidad correctamente!");        
                        CargarGrid();
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
        this.UnidadResponsableCreate = function () { UnidadCreate(); }

/********************************************************************************************************************************************************/            
        var eliminarUnidadResponsable = function (Idunidad) {
            catalogoContext.eliminarUnidad(Idunidad, function (resp) {
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
        this.DivError = function () {
            document.getElementById("Error").style.display = "none";           
        };
        this.DivErrorModal = function () {
            document.getElementById("ErrorModal").style.display = "none";
        };
        
        this.ValorDependencia = function () {                            
            if (self.buscar == "00000" || self.buscar == null) {
                self.buscar = '';
            }
        };
        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }


        this.reset = function (form) {   
            $('#UnidadesResponsablesModal').modal('hide');               
            if (form) {
                form.$setPristine();
                form.$setUntouched();                
            }     
            CargarGrid();       
            self.unidad = null;
            self.Clave = null;
            self.EStatus = null; 
        };
        
/*******************************************************************************************************************************************************/
      
    }]);
})();

