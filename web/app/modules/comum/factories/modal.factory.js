(function(){
    "use strict";

    angular.module("petquest.comum").factory("modal", modal);

    modal.$inject = ["$uibModal"];

    function modal($uibModal){
        return {
            exibirModalErro: exibirModalErro,
            exibirModal: exibirModal
        };

        function exibirModalErro(mensagem){
            var instanciaModal = $uibModal.open({
                animation: true,
                templateUrl: "./app/modules/comum/templates/modalErro.html",
                controller: "modalController",
                controllerAs: "mCtrl",
                size: "sm",
                resolve: {
                    mensagem: function(){
                        return mensagem;
                    }
                }
            });

            return instanciaModal.result;
        }

        function exibirModal(mensagem, tamanho, caminhoTemplate, dados){
            var instanciaModal = $uibModal.open({
                animation: true,
                templateUrl: caminhoTemplate,//"./app/modules/comum/templates/modal.html",
                controller: "modalController",
                controllerAs: "mCtrl",
                size: tamanho,
                resolve: {
                    mensagem: function(){
                        return mensagem;
                    },
                    dados: function(){
                        return dados;
                    }
                }
            });

            return instanciaModal.result;
        }
    }

})();