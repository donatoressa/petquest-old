(function(){
    "use strict";

    angular.module("petquest.comum").controller("modalController", modalController);

    modalController.$inject = ["$uibModalInstance", "mensagem", "dados"];

    function modalController($uibModalInstance, mensagem, dados){
        var vm = this;
        vm.mensagem = mensagem;
        vm.dados = dados;

        vm.acaoOK = function(){
            $uibModalInstance.close();
        };
    }

})();