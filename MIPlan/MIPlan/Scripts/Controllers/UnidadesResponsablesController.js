
//<reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

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

        var CargarGrid = function () {
            catalogoContext.ObtenerUnidades(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.unidades = catalogoContext.unidadesRlst;
                        console.log(self.unidades);
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


        var UnidadUpdate = function () {            
            
            console.log("ID Update", self.unidad[0].Clave);
            catalogoContext.UnidadResponsableUpdate(self.unidad[0].Clave, self.unidad[0].Dependencia, self.unidad[0].Clave, self.unidad[0].Descripcion, self.unidad[0].Status, self.unidad[0].Coordinador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                      //  self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
                        console.log("Updated!");
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



        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };

        this.UnidadResponsableUpdate = function () {
            UnidadUpdate();
            
        }

        this.Update = function (Indice) {
          
            console.log(Indice);
            cargarModal(Indice);
            
        };


        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };



    }]);



})();

