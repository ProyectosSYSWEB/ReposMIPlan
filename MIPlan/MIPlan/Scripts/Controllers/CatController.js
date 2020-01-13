
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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };   

        var CargarGrid = function () {
            catalogoContext.ObtenerBasicos(self.buscar,function(resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.basicos = catalogoContext.basicoslst;
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

        this.ObtenerDatos = function (IdBasicos) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Basico";
            self.cve_id = IdBasicos;
            
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lblcatalogo").className = "text-primary";
            document.getElementById("cmbcatalogo").className = "form-control border border-primary";
            document.getElementById("lblorden").className = "text-primary";
            document.getElementById("txtorden").className = "form-control border border-primary";
            document.getElementById("lblClave").className = "text-primary";
            document.getElementById("txtClave").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("txtDescripcion").className = "form-control border border-primary";
            document.getElementById("lblstatus").className = "text-primary";
            document.getElementById("Radio").className = "radio-group form-control border border-primary text-center";


            catalogoContext.ObtenerBasico(IdBasicos, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_catalogo = catalogoContext.basicolst[0].Id;
                        self.cve_orden = catalogoContext.basicolst[0].DescripcionPadre;
                        self.cve_clave = catalogoContext.basicolst[0].Clave;
                        self.cve_descripcion = catalogoContext.basicolst[0].Descripcion;
                        self.cve_status = catalogoContext.basicolst[0].Status;
                        $('#basicos').modal('hide');
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


        this.Nuevo = function () {
            $('#btnNuevo').show();
            $('#btnActualizar').hide();
            self.Titulo = "Crear Basico";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lblcatalogo").className = "text-success";
            document.getElementById("cmbcatalogo").className = "form-control border border-success";
            document.getElementById("lblorden").className = "text-success";
            document.getElementById("txtorden").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("txtClave").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("txtDescripcion").className = "form-control border border-success";
            document.getElementById("lblstatus").className = "text-success";
            document.getElementById("Radio").className = "radio-group form-control border border-success text-center";
           
            self.cve_catalogo = "";
            self.cve_orden = "";
            self.cve_clave = "";
            self.cve_descripcion = "";
            self.cve_status = "";
           

            self.cve_status = "A";
            var iNumeroMayor = self.basico[0].Cve;
            for (var i = 0; i < self.basico.length; i++) {
                if (self.basico[i].Cve > iNumeroMayor) {
                    iNumeroMayor = self.basico[i].Cve;
                }
            }
            self.cve_clave = parseInt(iNumeroMayor) + 1;
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

        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };
        this.DivErrorModal = function () {
            document.getElementById("ErrorModal").style.display = "none";
        };

        this.Valorbasicos= function () {
            CargarGrid();
            if (self.buscar == null) {
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
