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
            ObtenerUnidadesPorUsuario();
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
        var ObtenerUnidadesPorUsuario = function () {
            catalogoContext.ObtenerUnidadesPorUsuario(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.Usuarios = catalogoContext.UnidadesPorUsuariolst;
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
               var lado = 999
                GridUnidadesDisponibles(lado);
            }, 1000);
             
        };
        var GridUnidadesDisponibles = function (lado) {
            if (self.rightId == null) {
                self.rightId = 0;
                self.DescripcionUD = "";                
            }            
            catalogoContext.GridUnidadesDisponibles(self.rightId, self.DescripcionUD, self.Usuario.Usuario, lado, function (resp) {
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
            });
        };       
/********************************************************************************************************************************************************/

        this.getIdUD = function (Id, Descripcion) {            
            self.rightId = Id
            self.DescripcionUD = Descripcion;
            self.ladoR = 0;
        }        
        this.getIdUDNew = function (Id, Descripcion) {
            self.rightId = Id
            self.DescripcionUD = Descripcion;
            self.ladoL = 1;
        }
    /********************************************************************************************************************************************************/
        this.right = function () {       
            AgregarUnidadGrid(self.ladoR);
            GridUnidadesDisponibles(self.ladoR);
        }        
        this.left = function () {          
                AgregarUnidadGrid(self.ladoL);
                GridUnidadesDisponibles(self.ladoL);       
        }
        this.AllRight =  function () {                
            ladoR = 2;
            ladoL = 2;
            AgregarUnidadGrid(ladoR);
            GridUnidadesDisponibles(ladoL);     
            
        }

        this.AllLeft = function () {            
            ladoR = 3;
            ladoL = 3;
            AgregarUnidadGrid(ladoR);
            GridUnidadesDisponibles(ladoL);     
        }
    /********************************************************************************************************************************************************/
        var AgregarUnidadGrid = function (lado) {    
            if (self.rightId == null) {
                self.rightId = 0;
                self.DescripcionUD = "";                
            }
            catalogoContext.AgregarUnidadGrid(
                self.rightId, self.DescripcionUD, self.Usuario.Usuario, lado,
                function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.AgregarUnidadGrid = catalogoContext.AgregarUnidadGridLST;
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

       

    }]);
})();


//for (var i = 0; i < self.GridUnidadesDisponiblesView.length; i++) {
//    self.rightId = self.GridUnidadesDisponiblesView[i].Id;
//    self.DescripcionUD = self.GridUnidadesDisponiblesView[i].Descripcion;
//    ladoL = 0;
//    AgregarUnidadGrid(ladoL);
//}
//for (var i = 0; i < self.GridUnidadesDisponiblesView.length; i++) {
//    self.rightId = self.GridUnidadesDisponiblesView[i].Id;
//    ladoL = 0;
//    GridUnidadesDisponibles(ladoL);
//}