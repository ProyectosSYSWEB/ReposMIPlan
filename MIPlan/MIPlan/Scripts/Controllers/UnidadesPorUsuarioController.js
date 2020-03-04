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
                GridUnidadesAsignadas();    
            }, 900);             
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
            GridUnidadesDisponibles();                    
        }
        var GridUnidadesDisponibles = function () {
            catalogoContext.GridUnidadesDisponibles(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridUnidadesDisponiblesView = catalogoContext.GridUnidadesDisponiblesLST;                       
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
        this.SaveUA = function (Id) {          
            GuardarUnidadesAsignadas(Id);
        }
        var GuardarUnidadesAsignadas = function (Id) {         
            catalogoContext.GuardarUnidadesAsignadas(Id ,self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                      
                        Swal.fire(
                            '¡Listo!',
                            '¡Se han guardado los datos correctamente!',
                            'success'
                        )
                        GridUnidadesDisponibles();
                        GridUnidadesAsignadas();

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
                if (result.value) {
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
                        GridUnidadesAsignadas();
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
                        GridUnidadesAsignadas();
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
        var EliminarUnidadAignada = function (Idunidad) {
            catalogoContext.EliminarUnidadAignada(Idunidad, self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        Swal.fire(
                            '¡Eliminado!',
                            'Se ha eliminado con exito.',
                            'success'
                        );
                        GridUnidadesAsignadas();
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

        this.EliminnarUA = function (Indice) {
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
                    EliminarUnidadAignada(Indice);
                }
            })
        };
/********************************************************************************************************************************************************/
        this.getIdUA = function (Id, Descripcion) {
            //xself.Id = Id;            
            self.DescripcionUA = Descripcion;
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

