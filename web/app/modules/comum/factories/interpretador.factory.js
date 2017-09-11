(function () {
    "use strict";

    angular.module("petquest.comum").factory("interpretador", interpretador);

    interpretador.$inject = ["$http", "appSettings"];

    function interpretador($http, appSettings) {
        return {
            executarRequisicao: executarRequisicao
        };

        function executarRequisicao(configRequest) {

            var config = {
                url: appSettings.comunicacao.apis + "/" + configRequest.api,
                method: configRequest.method,
                data: configRequest.data
            };
            return $http(config).then(function (retornoRequest) {
                return retornoRequest;
            });
        }
    }
})();