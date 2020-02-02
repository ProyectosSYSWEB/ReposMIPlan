
(function () {
    var app = angular.module('MIPlanWeb', ['ngPagination']);
    /********************************************************************************************************************************************************/
    app.controller('MIPlanController', ['$scope', '$compile', function ($scope, $compile) {

        var self = this;
        self.buscar = '';


        this.Inicio = function () {
            CargarCombos();
        };

        var CargarCombos = function () {
            ObtenerDependencias();       
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
                        document.getElementById("Message").innerHTML = self.mensaje_gral + " ObtenerDependencias";
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };
        /*******************************************************************************************************************************************************/

    }]);
})();

