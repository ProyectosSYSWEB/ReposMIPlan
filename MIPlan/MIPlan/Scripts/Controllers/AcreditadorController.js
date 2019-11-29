// <reference path="../Models/AcreditadorModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', []);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        //var self = this;
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
                        //self.cve_dependencia = catalogoContext.dependenciaslst[0].Id;
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
            catalogoContext.ObtenerAcreditadores(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.acreditador = catalogoContext.acreditadoreslst;
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




        this.cargarModal = function (IdAcreditacion) {
            catalogoContext.ObtenerAcreditador(IdAcreditacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = catalogoContext.unidadAcreditacionlst[0].Dep;
                        self.cve_carrera = catalogoContext.unidadAcreditacionlst[0].Car;
                        self.cve_organismo = catalogoContext.unidadAcreditacionlst[0].Organismo;
                        self.cve_fecha_inicio = catalogoContext.unidadAcreditacionlst[0].Fecha_Inicial;
                        self.cve_feha_fin = catalogoContext.unidadAcreditacionlst[0].Fecha_Final;
                        self.cve_status = catalogoContext.unidadAcreditacionlst[0].Status;
                        
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


        //var UnidadUpdate = function () {

        //    console.log("ID Update", self.Acreditacion[0].Clave);
        //    catalogoContext.UnidadAcreditadorUpdate(self.Acreditacion[0].Clave, self.Acreditacion[0].Dependencia, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":
        //                self.unidadUpdate = catalogoContext.unidadadUpdateRlst;
        //                console.log("Updated!", self.unidadadUpdateRlst);
        //                break;
        //            case "notgp":
        //                self.mensaje_gral = resp.message;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });
        //};



        this.ValorDependencia = function () {
            alert(self.cve_dependencia);
        };

        this.UnidadAcreditadorUpdate = function () {
            UnidadUpdate();

        }

        //this.Update = function (Indice) {
        //    Indice = Indice + 1;
        //    console.log(Indice);
        //    cargarModal(Indice);

        //};


        this.BorrarBasico = function (Indice) {
            alert(Indice);
        };

    

    }]);


})();
