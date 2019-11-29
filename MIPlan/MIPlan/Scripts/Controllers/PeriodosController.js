
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';


        this.Inicio = function () {
            CargarCombos();
            CargarGrid();
            self.periodo = null;
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
            catalogoContext.ObtenerGridPeriodos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodos = catalogoContext.periodoslst;

                        console.log("controller",self.periodos);
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
            catalogoContext.ObtenerPeriodo(Idunidad, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.periodo = catalogoContext.periodolst;                      
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
        var periodoUpdateF = function () {
                                                        /*id,                 dependencia,                 periodo,                descripcion,                  status,                 ejercicio,                 inicio,                 fin,*/
            catalogoContext.periodoUpdate(self.periodo[0].Id, self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.periodo[0].Status, self.periodo[0].Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin ,function (resp) {
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

        this.periodoUpdate = function () { periodoUpdateF(); }

        /********************************************************************************************************************************************************/
        var periodoCreateF = function () {
                                                                                                                                                                                
            catalogoContext.GuardarPerdiodos(self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.periodo[0].Status, self.periodo[0].Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin , function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        //  self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
                        alert("¡Se ha creado el periodo correctamente!");
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

        this.periodoeCreate = function () { periodoCreateF(); }
        /********************************************************************************************************************************************************/
        var EliminnarPeriodoF = function (IdPeriodo) {
            catalogoContext.eliminarPeriodo(IdPeriodo, function (resp) {
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

        this.EliminnarPeriodo = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                EliminnarPeriodoF(Indice);
                alert("¡Se ha elimnado con exito!");
                CargarGrid();    
            } else {
                alert("No se ha eliminado el registro");
            }
        };
        /*******************************************************************************************************************************************************/

        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };
        /*******************************************************************************************************************************************************/

    }]);
})();
