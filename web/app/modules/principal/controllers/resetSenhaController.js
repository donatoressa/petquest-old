(function () {
    "use strict";

    angular.module("petquest.principal").controller("resetSenhaController", resetSenhaController);

    resetSenhaController.$inject = ["$state", "resetSenha"];

    function resetSenhaController($state, resetSenha) {
        var vm = this;
        vm.emailObrigatorio = false;
        vm.email = "";
        vm.mensagemErroReset = "";
        vm.sucessoReset = false;
        vm.processando = false;
        vm.resetar = resetar;
        vm.voltarInicio = voltarInicio;

        function resetar() {

            if (vm.email) {
                vm.mensagemErroReset = "";
                vm.emailObrigatorio = false;
                vm.processando = true;
                return resetSenha.reset({ email: vm.email })
                    .then(function (retorno) {
                        vm.sucessoReset = true;
                        vm.processando = false;
                    })
                    .catch(function (erro) {
                        vm.mensagemErroReset = erro.data.mensagem || "Erro ao resetar senha.";
                        vm.sucessoReset = false;
                        vm.processando = false;
                    });
            }
            else {
                vm.emailObrigatorio = true;
                vm.mensagemErroReset = "Campo 'E-mail' não preenchido.";
            }
        }

        function voltarInicio() {
            $state.go("login");
        }
    }

})();