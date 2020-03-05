(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination', 'ngAnimate']);
    /********************************************************************************************************************************************************/
    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {
        var self = this;
        self.buscar = '';


        this.Inicio = function () {
            CargarCombos();  
            self.DescripcionUD = "";
        };

        var CargarCombos = function () {           
            ObtenerDependencias();      
            ObtenerUsuarios();
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
                        document.getElementById("Error").style.display = "block";
                        document.getElementById("Message").innerHTML = self.mensaje_gral;
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
/********************************************************************************************************************************************************/
        var ObtenerUsuarios = function () {
            catalogoContext.ObtenerUsuarios(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Usuarios = catalogoContext.ObtenerUsuarioslst;
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
        /********************************************************************************************************************************************************/
        this.ValorUsuario = function () {      
            document.getElementById("loading").style.opacity = 100;           
            setTimeout(function () {
                self.DescripcionUD = "";
                GridUnidadesAsignadas();    
            }, 600);             
        };
        var GridUnidadesAsignadas = function () {
            catalogoContext.GridUnidadesAsignadas(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridUnidadesAsignadasView = catalogoContext.GridUnidadesAsignadasLST;
                        if (self.GridUnidadesAsignadasView.length > 0 || self.GridUnidadesAsignadasView.length == 0) {
                            document.getElementById("loading").style.opacity = 0;
                        }                      
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
        this.AddUA = function () {
            self.DescripcionUA = "";                                  
            document.getElementById("loading2").style.opacity = 100;
            setTimeout(function () {
                GridUnidadesDisponibles(); 
            }, 600);   
        }
        var GridUnidadesDisponibles = function () {
            catalogoContext.GridUnidadesDisponibles(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridUnidadesDisponiblesView = catalogoContext.GridUnidadesDisponiblesLST;   
                        if (self.GridUnidadesDisponiblesView.length > 0 || self.GridUnidadesDisponiblesView.length == 0) {
                            document.getElementById("loading2").style.opacity = 0;
                        }        
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
      
    /********************************************************************************************************************************************************/
        this.SaveUA = function () {          
            GuardarUnidadesAsignadas();
        }
        var GuardarUnidadesAsignadas = function () {
            catalogoContext.GuardarUnidadesAsignadas(self.IdUA, self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                      
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han guardado los datos correctamente!',
                            'success'
                        )
                        GridUnidadesDisponibles();
                        GridUnidadesAsignadas();
                        self.IdUA = null;
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
        /********************************************************************************************************************************************************/
        this.SaveAllUA = function () {            
            Swal.fire({
                title: '¿Seguro que Desea Todos Los Resgistros?',
                text: "Se agregarán todas las unidades disponibles",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Agregarlos'
            }).then((result) => {
                if (result.value)
                {
                    document.getElementById("loading").style.opacity = 100;
                    document.getElementById("loading2").style.opacity = 100;
                    GuardarTodasUD();
                  
                }
            })
        }
        var GuardarTodasUD = function () {
            catalogoContext.GuardarTodasUD(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        Swal.fire(
                            '¡Listo!',
                            '¡Se han guardado los datos correctamente!',
                            'success'
                        )       
                        GridUnidadesDisponibles();
                        GridUnidadesAsignadas();
                        self.IdUA = null;
                        self.IdUD = null;
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
        /********************************************************************************************************************************************************/
        this.DelAllUA = function () {
            Swal.fire({
                title: '¿Seguro que Desea Eliminar Los Resgistros Para el Usuario Actual?',
                text: "Se eliminaran todas las unidades disponibles",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Cancelar',
                confirmButtonText: 'Si, Quiero Eliminarlos'
            }).then((result) => {
                if (result.value) {
                    document.getElementById("loading").style.opacity = 100;
                    document.getElementById("loading2").style.opacity = 100;
                    EliminarTodasUnidadAignada();

                }
            })
        }
        var EliminarTodasUnidadAignada = function () {
            catalogoContext.EliminarTodasUnidadAignada(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":

                        Swal.fire(
                            '¡Listo!',
                            '¡Se han eliminado los datos correctamente!',
                            'success'
                        )                
                        GridUnidadesDisponibles();
                        GridUnidadesAsignadas();
                        self.IdUA = null;
                        self.IdUD = null;
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
        /********************************************************************************************************************************************************/
        var EliminarUnidadAignada = function () {
            catalogoContext.EliminarUnidadAignada(self.IdUD, self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        Swal.fire(
                            '¡Eliminado!',
                            'Se ha eliminado con exito.',
                            'success'
                        );
                        GridUnidadesDisponibles();
                        GridUnidadesAsignadas();
                        self.IdUD = null;
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

        this.EliminnarUA = function () {
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
                    EliminarUnidadAignada();
                }
            })
        };
/********************************************************************************************************************************************************/
        this.getIdUA = function (Id, Descripcion) {
            self.IdUA = Id;            
            self.DescripcionUA = Descripcion;
        }
        this.getIdUDNew = function (Id, Descripcion) {
            self.IdUD = Id;
            self.DescripcionUD = Descripcion;
        }
        this.DivError = function () {
            document.getElementById("Error").style.display = "none";
        };

        this.close = function (form) {
            $('#ModalUA').modal('hide');
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }     
            self.Id = null;
            self.DescripcionUA = null;
        };       
    }]);
})();

