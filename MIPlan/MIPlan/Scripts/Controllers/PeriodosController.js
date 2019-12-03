
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

/********************************************************************************************************************************************************/

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
                        $("#tablaDatos").dataTable().fnDestroy();
                        $('#tablaDatos').DataTable({
                            data: self.periodos,
                            pageLength: 5,
                            "searching": true,
                            "lengthChange": false,
                            columns: [
                                { data: "Dependencia" },
                                { data: "Periodo" },
                                { data: "Descripcion" },
                                { data: "Status" },
                                { data: "Ejercicio" },
                                { data: "Inicio" },
                                { data: "Fin" },
                                {
                                    "data": "Id",
                                    render: function (data, type, row, meta) {
                                        return '<button type="button" class="btn" style="width:50px" data-toggle="modal" data-target="#ModalPeriodo" data-backdrop="static" data-keyboard="false" data-toggle="tooltip" data-html="true" title="Actualizar" ng-click="ctrl.Modal(&quot;' + row.Id + '&quot;)"><i class="fa fa-pencil" aria-hidden="true" ></i></button> <button type="button" id="delete-button" class="btn btn-danger" style="width:50px" data-toggle="tooltip" data-html="true" title="Eliminar" ng-click="ctrl.EliminnarPeriodo(&quot;' + row.Id + '&quot;)" style="width:50px"><i class="fa fa-eraser" aria-hidden="true" ></i></button> <button type="button" class="btn btn-warning" style="width:50px" ng-click="ctrl.BorrarComision(&quot;' + row.Id + '&quot;)" style="width:50px"><i class="fa fa-print" aria-hidden="true" ></i></button>';
                                        //if (self.cve_tipo_modal == "1")
                                        //    return '<button type="button" class="btn" style="width:50px" ng-click="ctrl.IrComision(&quot;' + data + '&quot;)">< i class="fa fa-pencil" aria - hidden="true" ></i ></button >';
                                        //else
                                        //    return '<button type="button" class="btn btn-success" data-dismiss="modal" ng-click="ctrl.AgregarOcupante(&quot;' + data + '&quot;,&quot;' + row.Tipo + '&quot;,&quot;' + row.Nombre + '&quot;,&quot;' + row.IdEmp + '&quot;,&quot;' + row.Plaza + '&quot;)">Agregar</button>';
                                    }
                                }
                            ]
                            ,
                            rowCallback: function (row) {
                                if (!row.compiled) {
                                    $compile(angular.element(row))($scope);
                                    row.compiled = true;
                                }
                            }
                        });
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
                                                       
            catalogoContext.periodoUpdate(self.periodo[0].Id, self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.periodo[0].Status, self.periodo[0].Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin ,function (resp) {
                switch (resp.ressult) {
                    case "tgp":       
                        CargarGrid();
                        self.periodo = null;
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

        this.periodoUpdate = function (ID) {
            if (ID) {
                periodoUpdateF();
            } else {
                periodoCreateF();
            }
            
        }

        /********************************************************************************************************************************************************/
        var periodoCreateF = function () {
                                                                                                                                                                                
            catalogoContext.GuardarPerdiodos(self.periodo[0].Dependencia, self.periodo[0].Periodo, self.periodo[0].Descripcion, self.periodo[0].Status, self.periodo[0].Ejercicio, self.periodo[0].Inicio, self.periodo[0].Fin , function (resp) {
                switch (resp.ressult) {
                    case "tgp":         
                        CargarGrid();
                        self.periodo = null;
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

       // this.periodoeCreate = function () { periodoCreateF(); }
        /********************************************************************************************************************************************************/
        var EliminnarPeriodoF = function (IdPeriodo) {
            catalogoContext.eliminarPeriodo(IdPeriodo, function (resp) {
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
