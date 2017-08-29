(function () {
    "use strict";

    angular.module("petquest.principal").controller("principalController", principalController);

    principalController.$inject = ["$state", "login", "registro", "localStorageService"];

    function principalController($state, login, registro, localStorageService) {
        var vm = this;
        vm.exibirOpcoesLogin = true;
        vm.loginEmailSelecionado = false;
        vm.loginFacebookSelecionado = false;
        vm.loginRegistroSelecionado = false;
        vm.processando = false;
        vm.mensagemErro = "";
        vm.lembrarEmail = false;
        vm.lembrarFB = false;

        vm.autenticar = autenticar;
        vm.registrar = registrar;
        vm.opcaoLoginSelecionada = opcaoLoginSelecionada;
        vm.voltarInicio = voltarInicio;
        vm.esqueciSenha = esqueciSenha;
        vm.getLocalStorage = getLocalStorage;

        function autenticar(tipoLogin) {
            
            //Autenticação por e-mail
            if (tipoLogin === 0) {
                if (vm.email && vm.senha) {

                    if (vm.lembrarEmail) {
                        localStorageService.set(vm.email, vm.senha);
                    }

                    vm.processando = true;
                    login.autenticar(vm.email, vm.senha)
                        .then(function (sucesso) {
                            vm.mensagemErro = "";
                            vm.processando = false;
                            $state.go("home");
                        })
                        .catch(function (erro) {
                            vm.mensagemErro = "Erro ao autenticar usuário.";
                            vm.processando = false;
                        });
                }
                else {
                    vm.emailObrigatorio = vm.email ? false : true;
                    vm.senhaObrigatorio = vm.senha ? false : true;
                    vm.mensagemErro = "Um ou mais campos obrigatórios não foram preenchidos.";
                }
            }
            //Autenticação pelo facebook
            else {
                if (vm.email && vm.senha) {

                    if (vm.lembrarFB) {
                        localStorageService.set(vm.email, vm.senha);
                    }
                }
                else {
                    vm.emailObrigatorio = vm.email ? false : true;
                    vm.senhaObrigatorio = vm.senha ? false : true;
                    vm.mensagemErro = "Um ou mais campos obrigatórios não foram preenchidos.";
                }
            }
        }

        function opcaoLoginSelecionada(opcao) {
            if (opcao === 0) {
                vm.exibirOpcoesLogin = false;
                vm.loginEmailSelecionado = true;
                vm.loginFacebookSelecionado = false;
                vm.loginRegistroSelecionado = false;
                vm.email = "";
                vm.senha = "";
            }
            else if (opcao === 1) {
                vm.exibirOpcoesLogin = false;
                vm.loginEmailSelecionado = false;
                vm.loginFacebookSelecionado = true;
                vm.loginRegistroSelecionado = false;
                vm.email = "";
                vm.senha = "";
            }
            else {
                vm.exibirOpcoesLogin = false;
                vm.loginEmailSelecionado = false;
                vm.loginFacebookSelecionado = false;
                vm.loginRegistroSelecionado = true;
                vm.nome = "";
                vm.telefone = "";
                vm.email = "";
                vm.senha = "";
                vm.confirmacaoSenha = "";
            }
        }

        function voltarInicio() {
            vm.loginEmailSelecionado = false;
            vm.loginFacebookSelecionado = false;
            vm.loginRegistroSelecionado = false;
            vm.exibirOpcoesLogin = true;
            vm.mensagemErro = "";
            vm.mensagemErroRegistro = "";
            vm.nomeObrigatorio = false;
            vm.telefoneObrigatorio = false;
            vm.emailObrigatorio = false;
            vm.senhaObrigatorio = false;
            vm.confirmacaoSenhaObrigatorio = false;
            vm.lembrarEmail = false;
            vm.lembrarFB = false;
        }

        function esqueciSenha() {

        }

        function getLocalStorage() {
            if (vm.email != "") {
                vm.senha = localStorageService.get(vm.email);
            }
        }

        function registrar() {
            if (vm.nome && vm.telefone && vm.email && vm.senha && vm.confirmacaoSenha) {
                if (vm.senha === vm.confirmacaoSenha) {
                    vm.processando = true;
                    registro.registrar(vm.nome, vm.telefone, vm.email, vm.senha)
                        .then(function (sucesso) {
                            vm.processando = false;
                        })
                        .catch(function (erro) {
                            vm.mensagemErroRegistro = "Erro ao registrar usuário.";
                            vm.processando = false;
                        });
                }
                else {
                    vm.mensagemErroRegistro = "Confirmação de senha divergente da senha.";
                }
            }
            else {
                vm.mensagemErroRegistro = "Um ou mais campos obrigatórios não foram preenchidos.";
                vm.nomeObrigatorio = vm.nome ? false : true;
                vm.telefoneObrigatorio = vm.telefone ? false : true;
                vm.emailObrigatorio = vm.email ? false : true;
                vm.senhaObrigatorio = vm.senha ? false : true;
                vm.confirmacaoSenhaObrigatorio = vm.confirmacaoSenha ? false : true;
            }
        }
    }

})();