(function () {
    "use strict";

    angular.module("petquest.principal").factory("login", login);
    login.$inject = ["$http", "appSettings", "interpretador"];

    function login($http, appSettings, interpretador) {
        return {
            autenticar: autenticar
        };

        function autenticar(email, senha) {

            var caminho = appSettings.comunicacao.apis + "/autenticar";
            var dados = { "email": email, "senha": senha };
            var header = {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            };
            var config = {
                method: "post",
                url: caminho,
                data: dados,
                headers: header
            };

            return interpretador.executarRequisicao(config)
                .then(function (dados) {
                    return dados.data;
                });
        }
    }
})();