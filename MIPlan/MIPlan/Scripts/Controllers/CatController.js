
// <reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            ObtenerCatalogoBasicos();
            CargarGrid();
        };

        //var CargarCombos = function () {
          
        //}; 


        var ObtenerCatalogoBasicos = function () {
            catalogoContext.ObtenerCatalogoBasicos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.catalogos = catalogoContext.catalogoslst;
                        //self.error1 = catalogoContext.catalogoslst[0].Id;
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
            catalogoContext.ObtenerBasicos(self.buscar,function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.basicos = catalogoContext.basicoslst;
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

        this.ObtenerDatos = function (/*IdBasicos*/) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Basico";
            //self.cve_id = IdBasicos;
            
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lblcatalogo").className = "text-primary";
            document.getElementById("cmbcatalogo").className = "form-control border border-primary";
            document.getElementById("lblorganismo").className = "text-primary";
            document.getElementById("cmborganismo").className = "form-control border border-primary";
            document.getElementById("lblClave").className = "text-primary";
            document.getElementById("txtClave").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("txtDescripcion").className = "form-control border border-primary";
            document.getElementById("lblstatus").className = "text-primary";
            document.getElementById("cmbstatus").className = "form-control border border-primary";


            //catalogoContext.ObtenerAcreditador(IdBasicos, function (resp) {
            //    switch (resp.ressult) {
            //        case "tgp":
            //            self.cve_dependencia = catalogoContext.unidadAcreditacionlst[0].Dependencia;
            //            ObtenerCarreras();
            //            self.cve_organismo = catalogoContext.unidadAcreditacionlst[0].Organismo;
            //            self.cve_fecha_inicio = catalogoContext.unidadAcreditacionlst[0].Fecha_Inicial;
            //            self.cve_fecha_fin = catalogoContext.unidadAcreditacionlst[0].Fecha_Final;
            //            self.cve_status = catalogoContext.unidadAcreditacionlst[0].Status;
            //            self.cve_observaciones = catalogoContext.unidadAcreditacionlst[0].Observaciones;
            //            $('#acreditadores').modal('hide');
            //            break;
            //        case "notgp":
            //            self.mensaje_gral = resp.message;
            //            document.getElementById("Error").style.display = "block";
            //            document.getElementById("Message").innerHTML = self.mensaje_gral;
            //            break;
            //        default:
            //            break;
            //    }
            //    $scope.$apply();
               


            //});
        };


        this.Nuevo = function () {
            $('#btnNuevo').show();
            $('#btnActualizar').hide();
            self.Titulo = "Crear Basico";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lblcatalogo").className = "text-success";
            document.getElementById("cmbcatalogo").className = "form-control border border-success";
            document.getElementById("lblorganismo").className = "text-success";
            document.getElementById("cmborganismo").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("txtClave").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("txtDescripcion").className = "form-control border border-success";
            document.getElementById("lblstatus").className = "text-success";
            document.getElementById("cmbstatus").className = "form-control border border-success";
           
            //self.cve_dependencia = "";
            //self.cve_carrera = "";
            //self.cve_organismo = "";
            //self.cve_fecha_inicio = "";
            //self.cve_fecha_fin = "";
            //self.cve_status = "";
            //self.cve_observaciones = "";
        };



        //var AcreditadorUpdate = function () {
        //    catalogoContext.AcreditadorUpdate(self.cve_id, self.cve_dependencia, self.cve_carrera, self.cve_organismo, self.cve_fecha_inicio, self.cve_fecha_fin, self.cve_status, self.cve_observaciones, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":

        //                alert("¡Se han actualizado los datos correctamente!");
        //                CargarGrid();
        //                break;
        //            case "notgp":

        //                self.mensaje_gral = resp.message;
        //                document.getElementById("Error").style.display = "block";
        //                document.getElementById("Message").innerHTML = self.mensaje_gral;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });
        //};

        //this.AcreditadorUpdate = function () { AcreditadorUpdate(); }



        //var AcreditadorCreate = function () {

        //    catalogoContext.AcreditadorCreate(self.cve_dependencia, self.cve_carrera, self.cve_organismo, self.cve_fecha_inicio, self.cve_fecha_fin, self.cve_status, self.cve_observaciones, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":

        //                alert("¡Se ha creado la unidad correctamente!");
        //                CargarGrid();

        //                break;
        //            case "notgp":

        //                self.mensaje_gral = resp.message;
        //                document.getElementById("Error").style.display = "block";
        //                document.getElementById("Message").innerHTML = self.mensaje_gral;
        //                break;
        //            default:
        //                break;
        //        }
        //        $scope.$apply();
        //    });
        //};

        //this.AcreditadorCreate = function () { AcreditadorCreate(); }



        //var AcreditadorDelete = function (IdAcreditacion) {
        //    catalogoContext.eliminarAcreditador(IdAcreditacion, function (resp) {
        //        switch (resp.ressult) {
        //            case "tgp":

        //                console.log("Controller Eliminar ejecutado");
        //                break;
        //            case "notgp":
        //                self.mensaje_gral = resp.message;
        //                document.getElementById("Error").style.display = "block";
        //                document.getElementById("Message").innerHTML = self.mensaje_gral;
        //                console.log("Error Controller");
        //                break;
        //            default:
        //                break;
        //        }

        //    });
        //};

        //this.Eliminar = function (Indice) {
        //    var opcion = confirm("¿Seguro que desea Eliminar el Registro?");
        //    if (opcion == true) {
        //        AcreditadorDelete(Indice);
        //        alert("¡Se ha eliminado con exito!");
        //        CargarGrid();
        //    } else {
        //        alert("No se ha eliminado el registro");
        //    }
        //};

        //this.DivError = function () {
        //    document.getElementById("Error").style.display = "none";
        //};
        //this.DivErrorModal = function () {
        //    document.getElementById("ErrorModal").style.display = "none";
        //};

        this.Valorbasicos= function () {
            CargarGrid();
            if (self.buscar == "00000" || self.buscar == null) {
                self.buscar = '';
            }
        };


        //this.StatusFun = function () {
        //    if (self.Status.Status == "Todos") {
        //        self.Status.Status = '';
        //    }
        //}


        //this.reset = function (form) {
        //    CargarGrid();
        //    self.cve_dependencia = null;
        //    self.cve_carrera = null;
        //    self.cve_organismo = null;
        //    self.cve_fecha_inicio = null;
        //    self.cve_fecha_fin = null;
        //    self.cve_status = null;
        //    self.cve_observaciones = null;

        //    if (form) {
        //        form.$setPristine();
        //        form.$setUntouched();
        //    }
        //};


    }]);


})();
