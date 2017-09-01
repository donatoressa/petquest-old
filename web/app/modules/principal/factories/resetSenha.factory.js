(function () {
    "use strict";

    angular.module("petquest.principal").factory("resetSenha", resetSenha);
    resetSenha.$inject = ["interpretador"];

    function resetSenha(interpretador) {
        return {
            reset: reset
        };

        function reset(dados) {

            var config = {
                method: "post",
                api: "reset-senha",
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }
    }

})();