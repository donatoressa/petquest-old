(function(){
    "use strict";

    angular.module("petquest.comum").controller("modalController", modalController);

    modalController.$inject = ["$uibModalInstance", "mensagem"];

    function modalController($uibModalInstance, mensagem){
        var vm = this;
        vm.mensagem = mensagem;

        vm.acaoOK = function(){
            $uibModalInstance.close();
        };
    }

})();