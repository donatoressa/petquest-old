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