(function () {
    "use strict";

    angular.module("petquest.principal").factory("obterEventos", obterEventos);
    obterEventos.$inject = ["appSettings", "interpretador"];

    function obterEventos(appSettings, interpretador) {
        return {
            consultar: consultar
        };

        function consultar(dados){
            var config = {
                method: "post",
                api: "obter-lista-eventos-localizacao",
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }
    }

})();