(function () {
    "use strict";

    angular.module("petquest.principal").factory("login", login);
    login.$inject = ["appSettings", "interpretador"];

    function login(appSettings, interpretador) {
        return {
            autenticar: autenticar
        };

        function autenticar(email, senha) {

            var caminho = appSettings.comunicacao.apis + "/autenticar";
            var dados = { "email": email, "senha": senha };
            var config = {
                method: "post",
                url: caminho,
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }
    }
})();