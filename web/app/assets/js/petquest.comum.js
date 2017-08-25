(function(){
    "use strict";

    angular.module("petquest.comum", ["ui.bootstrap"]);
})();
(function () {

    "use strict";

    angular.module("petquest.comum").directive("menu", function () {
        return {
            restrict: "E",
            template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
            transclude: true,
            scope: {
                visible: "=",
                alignment: "@"
            }
        };
    });

    angular.module("petquest.comum").directive("menuItem", function () {
        return {
            restrict: "E",
            template: "<div ng-click='navigate()' ng-transclude></div>",
            transclude: true,
            scope: {
                hash: "@"
            },
            link: function ($scope) {
                $scope.navigate = function () {
                    window.location.hash = $scope.hash;
                };
            }
        };
    });


})();
(function(){
    "use strict";

    angular.module("petquest.comum").factory("interpretador", interpretador);

    interpretador.$inject = ["$http"];

    function interpretador($http){
        return {
            executarRequisicao: executarRequisicao
        };

        function executarRequisicao(configRequest){

            var configPreflight = {
                url: configRequest.url,
                method: "OPTIONS",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Content-Type": "application/json"
                }
            };

            return $http(configPreflight).then(function(retornoPreflight){
                $http(configRequest).then(function(retornoRequest){
                    return retornoRequest;
                });
            });
        }
    }
})();