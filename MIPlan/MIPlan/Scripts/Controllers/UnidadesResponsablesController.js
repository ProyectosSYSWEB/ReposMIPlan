(function () {
    var app = angular.module('MIPlanWeb', []);

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

        this.Modal = function (Indice) { cargarModal(Indice); };

/********************************************************************************************************************************************************/
        var UnidadUpdate = function () {            
            
            
            catalogoContext.UnidadResponsableUpdate(self.unidad[0].Id, self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
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

        this.UnidadResponsableUpdate = function () { UnidadUpdate(); }

/********************************************************************************************************************************************************/
        var UnidadCreate = function () {
            
            catalogoContext.UnidadResponsableCreate(self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
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

