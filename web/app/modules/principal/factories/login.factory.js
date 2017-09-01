(function () {
    "use strict";

    angular.module("petquest.principal").factory("login", login);
    login.$inject = [ "interpretador"];

    function login(interpretador) {
        return {
            autenticar: autenticar,
            autenticarFB: autenticarFB
        };

        function autenticar(email, senha) {

            var dados = { email: email, senha: senha };
            var config = {
                method: "post",
                api: "autenticar",
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }

        function autenticarFB() {

            var config = {
                api: "autenticar-facebook",
                method: "get"
            };

            return interpretador.executarRequisicao(config);
        }
    }
})();