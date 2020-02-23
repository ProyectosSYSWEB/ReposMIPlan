
// <reference path="../Models/CatModel.js"/>

(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);

    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';

        this.Inicio = function () {
            ObtenerCatalogoBasicos();
            //CargarGrid();
        };



        var ObtenerCatalogoBasicos = function () {
            catalogoContext.ObtenerCatalogoBasicos(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.catalogos = catalogoContext.catalogoslst;
                        self.cve_catalogo = catalogoContext.catalogoslst.Id;
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
            catalogoContext.ObtenerBasicos(self.catal,function(resp) {
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
                $('button').tooltip();
            });
        };   

        this.ObtenerDatos = function (IdBasico) {
            $('#btnActualizar').show();
            $('#btnNuevo').hide();
            self.Titulo = "Modificar Basico";
            self.cve_id = IdBasico;
            
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


            catalogoContext.ObtenerBasico(IdBasico, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_catalogo = catalogoContext.basicolst[0].Tipo;
                        self.cve_clave = catalogoContext.basicolst[0].Clave;
                        self.cve_descripcion = catalogoContext.basicolst[0].Descripcion;
                        self.cve_orden = catalogoContext.basicolst[0].Orden;
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



            self.cve_status = "";
            var iNumeroMayor = self.basicos[0].Clave;
            for (var i = 0; i < self.basicos.length; i++) {
                if (self.basicos[i].Clave > iNumeroMayor) {
                    iNumeroMayor = self.basicos[i].Clave;
                }
            }
            self.cve_clave = parseInt(iNumeroMayor) + 1;
        };

        



        var BasicoUpdate = function () {
            catalogoContext.BasicoUpdate(self.cve_id, self.cve_catalogo,self.cve_clave, self.cve_descripcion, self.cve_orden,self.cve_status, function (resp) {
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

        this.BasicoUpdate = function () { BasicoUpdate(); }



        var BasicoCreate = function () {

            catalogoContext.BasicoCreate( self.cve_catalogo, self.cve_clave, self.cve_descripcion, self.cve_orden, self.cve_status, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.cve_catalogo = null;
                        self.cve_orden = null;
                        self.cve_clave = null;
                        self.cve_descripcion = null;
                        self.cve_status = null;
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

        this.BasicoCreate = function () { BasicoCreate(); }



        var BasicoDelete = function (Id) {
            catalogoContext.eliminarBasico(Id, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        Swal.fire(
                            '¡Eliminado!',
                            'Se ha eliminado con exito.',
                            'success'
                        );
                      
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

        this.Eliminar = function (Indice) {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar el Resgistro?',
                text: "Se Eliminara Permanentemente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlo'
            }).then((result) => {
                if (result.value) {
                    BasicoDelete(Indice);

                   
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

        this.Valorbasicos = function () {
           
            CargarGrid();
            if (self.buscar == "Todas") {
                self.buscar = '';
            }
        };
        



        this.StatusFun = function () {
            if (self.Status.Status == "Todos") {
                self.Status.Status = '';
            }
        }


        //this.close = function (form) {
        //    $('#basicos').modal('hide');
        //    if (form) {
        //        form.$setPristine();
        //        form.$setUntouched();
        //        CargarGrid();
        //    }
        //    //self.unidad = null;
        //    self.cve_clave = null;
        //    self.cve_status= null;
        //};

        this.reset = function (form) {
            $('#basicos').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            CargarGrid();
            self.cve_catalogo = null;
            self.cve_orden = null;
            self.cve_clave = null;
            self.cve_descripcion = null;
            self.cve_status = null;
        };

    }]);

    this.exportTableToExcel= function (table_basico, filename = '') {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById(table_basico);
        var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename ? filename + '.xls' : 'excel_data.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
    }


})();
