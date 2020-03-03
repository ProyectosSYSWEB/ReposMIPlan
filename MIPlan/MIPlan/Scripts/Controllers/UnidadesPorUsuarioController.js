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
                GridUnidadesDisponibles();
            }, 900);             
        };
        var GridUnidadesDisponibles = function () {          
            catalogoContext.GridUnidadesDisponibles(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridUnidadesDisponiblesView = catalogoContext.GridUnidadesDisponiblesLST;
                        if (self.GridUnidadesDisponiblesView.length >0) {
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
            GridUnidadesAsignadas();            
        }
        var GridUnidadesAsignadas = function () {
            catalogoContext.GridUnidadesAsignadas(self.Usuario.Usuario, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.GridUnidadesAsignadasView = catalogoContext.GridUnidadesAsignadasLST;                       
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
        this.getIdUA = function (Id, Descripcion) {
            self.Id = Id;            
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
        };

    }]);
})();

