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
            GridUnidadesDisponibles();
        };
        var GridUnidadesDisponibles = function (lado) {
            if (self.rightId == null) {
                self.rightId = 0;
                self.DescripcionUD = "";
                lado = 2;
            }

            catalogoContext.GridUnidadesDisponibles(self.rightId, self.DescripcionUD, self.Usuario, lado, function (resp) {
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
                //$scope.$apply();          
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
            for (var i = 0; i < self.GridUnidadesDisponiblesView.length; i++) {
                self.rightId = self.GridUnidadesDisponiblesView[i].Id;
                self.DescripcionUD = self.GridUnidadesDisponiblesView[i].Descripcion;                
                ladoL = 0;
                AgregarUnidadGrid(ladoL);                
            }
            for (var i = 0; i < self.GridUnidadesDisponiblesView.length; i++) {
                self.rightId = self.GridUnidadesDisponiblesView[i].Id;                
                ladoL = 0;
                GridUnidadesDisponibles(ladoL);
            }
           

        }

        this.AllLeft = function () {            
            self.GridUnidadesDisponiblesView = self.AgregarUnidadGrid;

            //self.AgregarUnidadGrid.length = 0;
        }
    /********************************************************************************************************************************************************/
        var AgregarUnidadGrid = function (lado) {            
            catalogoContext.AgregarUnidadGrid(
                self.rightId, self.DescripcionUD, self.Usuario, lado,
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
                //$scope.$apply();
            });
        };

       

    }]);
})();
