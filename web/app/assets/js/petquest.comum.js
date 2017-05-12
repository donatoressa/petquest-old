(function(){
    "use strict";

    angular.module("petquest.comum", ["ui.bootstrap"]);
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

            var config = {
                method: "OPTIONS",
                url: configRequest.url,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Content-Type": "application/json"
                }
            };

            return $http(config).then(function(retornoPreflight){
                $http(configRequest).then(function(retornoRequest){
                    return retornoRequest;
                });
            });
        }
    }
})();