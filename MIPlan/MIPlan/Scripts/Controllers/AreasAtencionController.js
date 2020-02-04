// <reference path="../Models/AreasAtencionModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);


    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            CargarCombos();
            ObtenerCategorias();
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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
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

        var CargarGrid = function () {
            catalogoContext.ObtenerAreasAtencion(self.buscar, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.areasatencion = catalogoContext.areaslst;
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

        this.ObtDatos = function (IdAreaAtencion) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Área de Atención";
            self.cve_id = IdAreaAtencion;
            document.getElementById("Titulo").className = "modal-header btn-primary justify-content-center";
            document.getElementById("lblDependencia").className = "text-primary";
            document.getElementById("cmdDependencia").className = "form-control border border-primary";
            document.getElementById("lblClave").className = "text-primary";
            document.getElementById("txtClave").className = "form-control border border-primary";
            document.getElementById("lblDescripcion").className = "text-primary";
            document.getElementById("txtDescripcion").className = "form-control border border-primary";
            document.getElementById("lblStatus").className = "text-primary";
            document.getElementById("cmdstatus").className = "form-control border border-primary";
            document.getElementById("lblCategoria").className = "text-primary";
            document.getElementById("cmdcat").className = "form-control border border-primary";

            catalogoContext.ObtenerAreas(IdAreaAtencion, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = catalogoContext.areasRlst[0].Dependencia;
                        self.cve_clave = catalogoContext.areasRlst[0].Cve;
                        self.cve_desc = catalogoContext.areasRlst[0].Desc;
                        self.cve_status = catalogoContext.areasRlst[0].Estatus;
                        self.cve_cat = catalogoContext.areasRlst[0].Cat;
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
            self.Titulo = "Crear Área de Atención";
            document.getElementById("Titulo").className = "modal-header btn-success justify-content-center";
            document.getElementById("lblDependencia").className = "text-success";
            document.getElementById("cmdDependencia").className = "form-control border border-success";
            document.getElementById("lblClave").className = "text-success";
            document.getElementById("txtClave").className = "form-control border border-success";
            document.getElementById("lblDescripcion").className = "text-success";
            document.getElementById("txtDescripcion").className = "form-control border border-success";
            document.getElementById("lblStatus").className = "text-success";
            document.getElementById("cmdstatus").className = "form-control border border-success";
            document.getElementById("lblCategoria").className = "text-success";
            document.getElementById("cmdcat").className = "form-control border border-success";
            self.cve_dependencia = "";
            self.cve_clave = "";
            self.cve_desc = "";
            self.cve_status = "";
            self.cve_cat = "";

            self.cve_status = "A";           
            var iNumeroMayor = self.areasatencion[0].Cve;
            for (var i = 0; i < self.areasatencion.length; i++) {
                if (self.areasatencion[i].Cve > iNumeroMayor) {
                    iNumeroMayor = self.areasatencion[i].Cve;                  
                } 
            }
            self.cve_clave = parseInt(iNumeroMayor) + 1;
        };

        var eliminarAreaAtencion = function (IdArea) {
            catalogoContext.eliminarArea(IdArea, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        console.log("Controller Eliminar ejecutado");
                        break;
                    case "notgp":
                        self.mensaje_gral = resp.message;
                        console.log("Error Controller");
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }

            });
        };

        this.EliminarAreaAtencion = function (Indice) {
            var opcion = confirm("¿Seguro que desea Eliminar el Resgistro?");
            if (opcion == true) {
                eliminarAreaAtencion(Indice);
                alert("¡Se ha elimnado con exito!");
                CargarGrid();
            } else {
                alert("No se ha eliminado el registro");
            }
        };

        var areasUpdate = function () {
            catalogoContext.AreasAtencionUpdate(self.cve_id, self.cve_dependencia, self.cve_clave, self.cve_desc, self.cve_status, self.cve_cat, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = null;
                        self.cve_clave = null;
                        self.cve_desc = null;
                        self.cve_status = null;
                        self.cve_cat = null;
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

        this.AreasAtencionUpdate = function () {
            areasUpdate();
        };

        var AreaCreate = function () {

            catalogoContext.AreasAtencionCreate(self.cve_dependencia, self.cve_clave, self.cve_desc, self.cve_status, self.cve_cat, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_dependencia = null;
                        self.cve_clave = null;
                        self.cve_desc = null;
                        self.cve_status = null;
                        self.cve_cat = null;
                        alert("¡Se ha creado el área correctamente!");
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

        this.AreasAtencionCreate = function () {
            AreaCreate();
        }

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
            if (self.Estatus.Estatus == "Todos") {
                self.Estatus.Estatus = '';
            }
        }

        this.reset = function (form) {
            $('#areasatencion').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            CargarGrid();
            self.cve_dependencia = null;
            self.cve_clave = null;
            self.cve_desc = null;
            self.cve_status = null;
            self.cve_cat = null;
        };

        this.PdfReportAreas = function (Dependencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'Catalogo/ReporteAreasAtencionPdf';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var blob = new Blob([this.response], { type: 'application/pdf' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
            }
            xhr.send("Dependencia=" + Dependencia);
        };

        this.ExcelReportAreas = function (Dependencia) {
            var xhr = new XMLHttpRequest();
            var ruta = urlServer + 'Catalogo/ReporteAreasAtencionExcel';
            xhr.responseType = 'blob';
            xhr.open("POST", ruta, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    var blob = new Blob([this.response], { type: 'application/xls' });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    window.open(link, "", "width=600,height=800");
                }
            }
            xhr.send("Dependencia=" + Dependencia);
        };
    }]);
})();