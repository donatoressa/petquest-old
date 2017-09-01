(function () {
    "use strict";

    angular.module("petquest.principal").factory("registro", registro);
    registro.$inject = ["appSettings", "interpretador"];

    function registro(appSettings, interpretador) {
        return {
            registrar: registrar
        };

        function registrar(nome, telefone, email, senha) {

            var dados = { 
                nome: nome,
                telefone: telefone,
                email: email, 
                senha: senha 
            };
            var config = {
                method: "post",
                api: "registrar-usuario",
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }
    }
})();