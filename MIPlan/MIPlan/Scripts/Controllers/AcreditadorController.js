// <reference path="../Models/AcreditadorModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            //CargarGrid();
            ObtenerOrganismos();
            ObtenerStatusAcreditaciones();

           
        };

        var CargarCombos = function () {
            ObtenerDependencias();
            
        };


        this.CargarCarreras = function () {
            ObtenerCarreras();

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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ObtenerCarreras = function () {
            catalogoContext.ObtenerCarreras(self.cve_dependencia, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.carrera = catalogoContext.carreralst;
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

        var ObtenerOrganismos = function () {
            catalogoContext.ObtenerOrganismos( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.organismo = catalogoContext.organismolst;
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


        var ObtenerStatusAcreditaciones = function () {
            catalogoContext.ObtenerStatusAcreditaciones( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.status = catalogoContext.statuslst;
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
            catalogoContext.ObtenerAcreditadores(self.buscar, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.acreditador = catalogoContext.acreditadoreslst;
                        console.log(self.acreditador);
                        $('#acreditadores').modal('hide');
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
                $('button').tooltip();
            });
        };


        this.ObtenerDatos = function (IdAcreditacion) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Acreditador";
            self.cve_id = IdAcreditacion;
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lbldependencia").className = "text-primary";
            document.getElementById("cmbdependencia").className = "form-control border border-primary";
            document.getElementById("lblcarrera").className = "text-primary";
            document.getElementById("cmbcarrera").className = "form-control border border-primary";
            document.getElementById("lblorganismo").className = "text-primary";
            document.getElementById("cmborganismo").className = "form-control border border-primary";
            document.getElementById("lblfechainicio").className = "text-primary";
            document.getElementById("txtfechainicio").className = "form-control border border-primary";
            document.getElementById("lblfechafin").className = "text-primary";
            document.getElementById("txtfechafin").className = "form-control border border-primary";
            document.getElementById("lblstatus").className = "text-primary";
            document.getElementById("cmbstatus").className = "form-control border border-primary";
            document.getElementById("lblobservacion").className = "text-primary";
            document.getElementById("txtobservacion").className = "form-control border border-primary";

            catalogoContext.ObtenerAcreditador(IdAcreditacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = catalogoContext.unidadAcreditacionlst[0].Dependencia;
                        ObtenerCarreras();
                        self.cve_organismo = catalogoContext.unidadAcreditacionlst[0].Organismo;
                        self.cve_fecha_inicio = catalogoContext.unidadAcreditacionlst[0].Fecha_Inicial;
                        self.cve_fecha_fin = catalogoContext.unidadAcreditacionlst[0].Fecha_Final;
                        self.cve_status = catalogoContext.unidadAcreditacionlst[0].Status;
                        self.cve_observaciones = catalogoContext.unidadAcreditacionlst[0].Observaciones;
                        $('#acreditadores').modal('hide');
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
                self.cve_carrera = catalogoContext.unidadAcreditacionlst[0].Carrera;


            });
        };


        this.Nuevo = function () {
            $('#btnNuevo').show();
            $('#btnActualizar').hide();
            self.Titulo = "Crear Acreditador";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lbldependencia").className = "text-success";
            document.getElementById("cmbdependencia").className = "form-control border border-success";
            document.getElementById("lblcarrera").className = "text-success";
            document.getElementById("cmbcarrera").className = "form-control border border-success";
            document.getElementById("lblorganismo").className = "text-success";
            document.getElementById("cmborganismo").className = "form-control border border-success";
            document.getElementById("lblfechainicio").className = "text-success";
            document.getElementById("txtfechainicio").className = "form-control border border-success";
            document.getElementById("lblfechafin").className = "text-success";
            document.getElementById("txtfechafin").className = "form-control border border-success";
            document.getElementById("lblstatus").className = "text-success";
            document.getElementById("cmbstatus").className = "form-control border border-success";
            document.getElementById("lblobservacion").className = "text-success";
            document.getElementById("txtobservacion").className = "form-control border border-success";
            self.cve_dependencia = "";
            self.cve_carrera = "";
            self.cve_organismo = "";
            self.cve_fecha_inicio = "";
            self.cve_fecha_fin = "";
            self.cve_status = "";
            self.cve_observaciones = "";
        };


   
        var AcreditadorUpdate = function () {
            catalogoContext.AcreditadorUpdate(self.cve_id,self.cve_dependencia, self.cve_carrera, self.cve_organismo, self.cve_fecha_inicio, self.cve_fecha_fin, self.cve_status, self.cve_observaciones, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                       
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han actualizado los datos correctamente!',
                            'success'
                        ) 
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

        this.AcreditadorUpdate = function () { AcreditadorUpdate(); }



        var AcreditadorCreate = function () {

            catalogoContext.AcreditadorCreate(self.cve_dependencia, self.cve_carrera, self.cve_organismo, self.cve_fecha_inicio, self.cve_fecha_fin, self.cve_status, self.cve_observaciones, function (resp) {
                switch (resp.ressult) {
                    case "tgp":                        
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han guardado los datos correctamente!',
                            'success'
                        )
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

this.AcreditadorCreate = function () { AcreditadorCreate(); }



        var AcreditadorDelete = function (IdAcreditacion) {
            catalogoContext.eliminarAcreditador(IdAcreditacion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        console.log("Controller Eliminar ejecutado");
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        console.log("Error Controller");
                        break;
                    default:
                        break;
                }

            });
        };

        this.Eliminar = function (Indice) {
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
                    AcreditadorDelete(Indice);

                    Swal.fire(
                        '¡Eliminado!',
                        'Se ha eliminado con exito.',
                        'success'
                    );
                    CargarGrid();
                }
            })
        };

        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };
        this.DivErrorModal = function () {
            document.getElementById("ErrorModal").style.display = "none";
        };

        this.ValorDependencia = function () {
            CargarGrid();
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
            CargarGrid();
            self.cve_dependencia = null;
            self.cve_carrera = null;
            self.cve_organismo = null;
            self.cve_fecha_inicio = null;
            self.cve_fecha_fin = null;
            self.cve_status = null;
            self.cve_observaciones = null;
            
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
        };


}]);


})();
