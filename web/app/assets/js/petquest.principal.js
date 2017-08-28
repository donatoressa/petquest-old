(function () {

    "use strict";

    angular.module("petquest.principal", ["petquest.comum", "ui.router", "ui.bootstrap", "ngMap", "angular-spinkit"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configuracao($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/modules/principal/views/main.html",
                controller: "homeController as hCtrl"
            })
            .state("login", {
                url: "/",
                templateUrl: "app/modules/principal/views/login.html",
                controller: "principalController as pCtrl"
            });

        console.log("Módulo principal configurado.");
    }

    function execucao() {
        console.log("Módulo principal executado.");
    }

})();

(function () {

    "use strict";

    angular.module("petquest.principal").constant("appSettings", {
        comunicacao: {
            apis: "http://localhost:3000"
        }
    });

})();
(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap"];

    function homeController(NgMap) {

        var vm = this;
        vm.carregarEventos = carregarEventos;
        vm.abrirMenu = abrirMenu;

        NgMap.getMap("map").then(function (map) {
            vm.map = map;
        });
        vm.callbackFunc = function (param) {
            console.log('I know where ' + param + ' are. ' + vm.message);
            console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos(){

        }

        function abrirMenu(){
            
        }
    }

})();
(function () {
    "use strict";

    angular.module("petquest.principal").controller("principalController", principalController);

    principalController.$inject = ["$state", "login", "registro"];

    function principalController($state, login, registro) {
        var vm = this;
        vm.exibirOpcoesLogin = true;
        vm.loginEmailSelecionado = false;
        vm.loginFacebookSelecionado = false;
        vm.loginRegistroSelecionado = false;
        vm.processando = false;
        vm.mensagemErro = "";
        vm.lembrarEmail = false;

        vm.autenticar = autenticar;
        vm.registrar = registrar;
        vm.opcaoLoginSelecionada = opcaoLoginSelecionada;
        vm.voltarInicio = voltarInicio;
        vm.esqueciSenha = esqueciSenha;

        function autenticar(tipoLogin) {
            //API DE LOGIN
            if (vm.lembrarEmail) {
                // localStorageService.set(usuario, senha);
            }

            if (tipoLogin === 0) {
                if (vm.email && vm.senha) {
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
            else {

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
        }

        function esqueciSenha() {

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
angular
.module("petquest.principal")
.directive("splashScreen", ["$timeout", function($timeout){
    return {
        restrict : "E",
        templateUrl: "./app/modules/principal/views/splash.html",
        link : function(scope, elem, attr){
            // fade it out for 300 milliseconds (see css)
            elem.addClass("_splash_fade_out");

            // remove splash screen after animation is completed
            $timeout(function(){
                elem.remove();
                scope = elem = attr = null;
            }, 2000);
        }
    };
}]);
(function () {
    "use strict";

    angular.module("petquest.principal").factory("login", login);
    login.$inject = ["appSettings", "interpretador"];

    function login(appSettings, interpretador) {
        return {
            autenticar: autenticar
        };

        function autenticar(email, senha) {

            var caminho = appSettings.comunicacao.apis + "/autenticar";
            var dados = { "email": email, "senha": senha };
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