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
            console.log("It's Works", self.Usuario);
            GridUnidadesDisponibles();
        };
        var GridUnidadesDisponibles = function () {
            catalogoContext.GridUnidadesDisponibles(self.Usuario, function (resp) {
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
            });
        };

        //ObjPolizaDet.Cargo = TotCargo;
        //ObjPolizaDet.Abono = TotAbono;           


        //        if (Session["PolizaDet"] == null)
        //        {
        //            ListPDet = new List<Poliza_Detalle>();
        //            ListPDet.Add(ObjPolizaDet);
        //        }
        //        else
        //        {
        //            ListPDet = (List<Poliza_Detalle>)Session["PolizaDet"];
        //            ListPDet.Add(ObjPolizaDet);
        //        }

        //        Session["PolizaDet"] = ListPDet;
        //        CargarGridDetalle(ListPDet);
/********************************************************************************************************************************************************/

        this.getIdUD = function (Id, Descripcion) {
            self.rightId = Id;
            self.DescripcionUD = Descripcion;
        }
        self.NewGridUnidadesDisponibles = [];
        this.right = function () {
            self.NewGridUnidadesDisponibles.push({ Id: self.rightId, Descripcion: self.DescripcionUD });
        }        
        this.getIdUDNew = function (Id, Descripcion) {
         
            self.DescripcionUD = Descripcion;
        }

    }]);
})();
