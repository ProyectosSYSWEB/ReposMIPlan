// <reference path="../Models/IndicadoresModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);


    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            ObtenerCategorias();
            ObtenerEtiqueta();
            ObtenerSubtipo();
        };

        var ObtenerCategorias = function () {
            catalogoContext.ObtenerCategorias(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.categoria = catalogoContext.categorialst;
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

        this.CargarCategorias = function () {
            ObtenerCategorias();

        };

        var ObtenerEtiqueta = function () {
            catalogoContext.ObtenerEtiquetas(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.etiqueta = catalogoContext.etiquetalst;
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

        this.CargarEtiquetas = function () {
            ObtenerEtiqueta();

        };

        var ObtenerSubtipo = function () {
            catalogoContext.ObtenerSubtipos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.subtipo = catalogoContext.subtipolst;
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

        this.CargarSubtipos = function () {
            ObtenerSubtipo();

        };

        var CargarGrid = function () {
            catalogoContext.ObtenerIndicador(self.buscar, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        
                        self.indicadores = catalogoContext.indicadoreslst;
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

        this.ObtDatos = function (Indicador) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Indicador";
            self.cve_id = Indicador;
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lblCategoria").className = "text-primary";
            document.getElementById("cmdCategoria").className = "form-control border border-primary";
            document.getElementById("lblSubtipo").className = "text-primary";
            document.getElementById("cmdSubtipo").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("txtDescripcion").className = "form-control border border-primary";
            document.getElementById("lblEtiqueta1").className = "text-primary";
            document.getElementById("cmdEtiqueta1").className = "form-control border border-primary";
            document.getElementById("lblEtiqueta2").className = "text-primary";
            document.getElementById("cmdEtiqueta2").className = "form-control border border-primary";
            document.getElementById("lblSeguimiento").className = "text-primary";
            document.getElementById("Radio").className = "radio-group form-control border border-primary text-center";

            catalogoContext.ObtenerIndicadores(Indicador, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_cat = catalogoContext.indicadoresRlst[0].Cat;
                        self.cve_sub = catalogoContext.indicadoresRlst[0].Sub;
                        self.cve_desc = catalogoContext.indicadoresRlst[0].Desc;
                        self.cve_et1 = catalogoContext.indicadoresRlst[0].Et1;
                        self.cve_et2 = catalogoContext.indicadoresRlst[0].Et2;
                        self.cve_seg = catalogoContext.indicadoresRlst[0].Seg;
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
            self.Titulo = "Crear Indicador";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lblCategoria").className = "text-success";
            document.getElementById("cmdCategoria").className = "form-control border border-success";
            document.getElementById("lblSubtipo").className = "text-success";
            document.getElementById("cmdSubtipo").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("txtDescripcion").className = "form-control border border-success";
            document.getElementById("lblEtiqueta1").className = "text-success";
            document.getElementById("cmdEtiqueta1").className = "form-control border border-success";
            document.getElementById("lblEtiqueta2").className = "text-success";
            document.getElementById("cmdEtiqueta2").className = "form-control border border-success";
            document.getElementById("lblSeguimiento").className = "text-success";
            document.getElementById("Radio").className = "radio-group form-control border border-success text-center";
            self.cve_cat = "";
            self.cve_sub = "";
            self.cve_desc = "";
            self.cve_et1 = "";
            self.cve_et2 = "";
            self.cve_seg = "";
        };

        var indicadorUpdate = function () {
            catalogoContext.IndicadoresUpdate(self.cve_id, self.cve_cat, self.cve_desc, self.cve_sub, self.cve_et1, self.cve_et2, self.cve_seg, function (resp) {
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

        this.IndicadorUp = function () {
            indicadorUpdate();
        };

        var IndicadorCreate = function () {

            catalogoContext.IndicadoresCreate(self.cve_cat, self.cve_desc, self.cve_sub, self.cve_et1, self.cve_et2, self.cve_seg, function (resp) {
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

        this.IndicadorCreat = function () {
            IndicadorCreate();
        }

        var eliminarIndicadores = function (Id) {
            catalogoContext.eliminarIndicador(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        Swal.fire(
                            '¡Eliminado!',
                            'Se ha eliminado con exito.',
                            'success'
                        );
                        CargarGrid();
                        break;
                    case "notgp":
                        Swal.fire(
                            'Oooops :(',
                            '¡Fallo al reaizar esta acción!',
                            'error'
                        );
                        self.mensaje_gral = resp.message;
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }

            });
        };

        this.EliminarIndicadores = function (Indice) {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'waring',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    eliminarIndicadores(Indice);
                }
            })
        };

        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };

        this.DivErrorModal = function () {
            document.getElementById("ErrorModal").style.display = "none";
        };
        

        this.ValorCategoria = function () {
            console.log(self.buscar);
            CargarGrid();
            if (self.buscar == null) {
                self.buscar = '';
            }
        };

        this.SubtipoFun = function () {
            if (self.SubtipoBusqueda == null) {
                self.SubtipoBusqueda = '';
            }
        }

        this.reset = function (form) {
            $('#indicadores').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }         
            self.cve_cat = null;
            self.cve_sub = null;
            self.cve_desc = null;
            self.cve_et1 = null;
            self.cve_et2 = null;
            self.cve_seg = null;
        };

    }]);

})();