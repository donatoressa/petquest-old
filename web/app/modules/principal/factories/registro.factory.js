(function () {
    "use strict";

    angular.module("petquest.principal").factory("registro", registro);
    registro.$inject = ["appSettings", "interpretador"];

    function registro(appSettings, interpretador) {
        return {
            registrar: registrar
        };

        function registrar(nome, telefone, email, senha) {

            var caminho = appSettings.comunicacao.apis + "/registrar-usuario";
            var dados = { 
                nome: nome,
                telefone: telefone,
                email: email, 
                senha: senha 
            };
            var header = {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            };
            var config = {
                method: "post",
                url: caminho,
                data: dados,
                headers: header
            };

            return interpretador.executarRequisicao(config);
        }
    }
})();