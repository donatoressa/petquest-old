(function () {
    "use strict";

    angular.module("petquest.principal").controller("principalController", principalController);

    principalController.$inject = ["$state", "login"];

    function principalController($state, login) {
        var vm = this;
        vm.exibirOpcoesLogin = true;
        vm.loginEmailSelecionado = false;
        vm.loginFacebookSelecionado = false;
        vm.loginRegistroSelecionado = false;

        var lembrarLogin = false;

        vm.autenticar = autenticar;
        vm.lembrar = lembrarLogin;
        vm.mensagemErro = "";
        vm.opcaoLoginSelecionada = opcaoLoginSelecionada;
        vm.voltarInicio = voltarInicio;

        function autenticar(tipoLogin) {
            //API DE LOGIN
            if (lembrarLogin) {
                // localStorageService.set(usuario, senha);
            }

            if (tipoLogin === 0) {
                if (vm.email && vm.senha) {
                    login.autenticar(vm.email, vm.senha)
                        .then(function (sucesso) {
                            $state.go("home");
                        })
                        .catch(function (erro) {
                            vm.mensagemErro = erro.mensagem;
                        });
                }
            }
            else{

            }
        }

        function lembrarLogin() {
            lembrarLogin = !lembrarLogin;
        }

        function opcaoLoginSelecionada(opcao) {
            if (opcao === 0) {
                vm.loginEmailSelecionado = true;
                vm.loginFacebookSelecionado = false;
                vm.loginRegistroSelecionado = false;
            }
            else if (opcao === 1) {
                vm.loginEmailSelecionado = false;
                vm.loginFacebookSelecionado = true;
                vm.loginRegistroSelecionado = false;
            }
            else {
                vm.loginEmailSelecionado = false;
                vm.loginFacebookSelecionado = false;
                vm.loginRegistroSelecionado = true;
            }
            vm.exibirOpcoesLogin = false;
        }

        function voltarInicio() {
            vm.loginEmailSelecionado = false;
            vm.loginFacebookSelecionado = false;
            vm.loginRegistroSelecionado = false;
            vm.exibirOpcoesLogin = true;
        }
    }

})();