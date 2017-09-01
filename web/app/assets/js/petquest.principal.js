(function () {

    "use strict";

    angular.module("petquest.principal", ["petquest.comum", "ui.router", "ui.bootstrap", "ngMap", "angular-spinkit", "LocalStorageModule", "snap"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider", "localStorageServiceProvider", "$httpProvider", "SnapConstructorProvider"];
    execucao.$inject = ["$rootScope"];

    function configuracao($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, SnapConstructorProvider) {

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
            })
            .state("resetSenha", {
                url: "/",
                templateUrl: "app/modules/principal/views/resetSenha.html",
                controller: "resetSenhaController as rsCtrl"
            });

        localStorageServiceProvider.setStorageType("sessionStorage");

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        SnapConstructorProvider.use(window.Snap);

        console.log("Módulo principal configurado.");
    }

    function execucao($rootScope) {
        document.addEventListener("click", function(e){
            $rootScope.$broadcast("documentClicked", e.target);
        });
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
    login.$inject = [ "interpretador"];

    function login(interpretador) {
        return {
            autenticar: autenticar,
            autenticarFB: autenticarFB
        };

        function autenticar(email, senha) {

            var dados = { email: email, senha: senha };
            var config = {
                method: "post",
                api: "autenticar",
                data: dados
            };

            return interpretador.executarRequisicao(config);
        }

        function autenticarFB() {

            var config = {
                api: "autenticar-facebook",
                method: "get"
            };

            return interpretador.executarRequisicao(config);
        }
    }
})();
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
(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap", "modal", "obterEventos"];

    function homeController(NgMap, modal, obterEventos) {

        var vm = this;
        vm.erroConexao = false;
        vm.map = undefined;
        vm.visivel = false;
        vm.dadosMapa = [];
        vm.abrirMenu = abrirMenu;
        vm.fecharMenu = fecharMenu;
        vm.exibirModalErroConexao = exibirModalErroConexao;
        vm.processando = true;

        var latitude, longitude = "";

        NgMap.getMap("map")
            .then(function (map) {
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;
                carregarEventos(latitude, longitude);
            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                exibirModalErroConexao();
            });

        obterGeoLocalizacao();
        

        vm.callbackFunc = function (param) {
            // console.log('I know where ' + param + ' are. ' + vm.message);
            // console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos(lat, long) {
            var dados = {
                latitude: lat || "",
                longitude: long || ""
            };

            obterEventos.consultar(dados)
                .then(function (retorno) {
                    vm.eventos = retorno.data.eventos;
                    for (var i = 0; i < vm.eventos.length; i++) {
                        var posicao = calcularPosicaoMapa(vm.eventos[i]);
                        var marcador = new google.maps.Marker({ title: "teste"});
                        marcador.setPosition(posicao);
                        marcador.setMap(vm.map);
                    }
                })
                .catch(function (erro) {

                });
        }

        function abrirMenu() {

        }

        function fecharMenu() {
        }

        function exibirModalErroConexao() {
            modal.exibirModalErro("Erro de conexão. Tente novamente.");
        }

        function obterGeoLocalizacao() {
            navigator.geolocation.getCurrentPosition(function (pos) {
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
            });
        }

        function calcularPosicaoMapa(posicaoEvento) {
            var numMarkers = Math.floor(Math.random() * 4) + 4;
            var lat = posicaoEvento.latitude + (Math.random() / 100);
            var long = posicaoEvento.longitude + (Math.random() / 100);
            var latlng = new google.maps.LatLng(lat, long);
            return latlng;
        }
    }

})();
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
                vm.processando = true;
                login.autenticarFB()
                    .then(function (retorno) {
                        vm.processando = false;
                        $state.go("home");
                    })
                    .catch(function (erro) {
                        vm.mensagemErro = erro && erro.data && erro.data.mensagem ? erro.data.mensagem : "Erro ao autenticar usuário.";
                        vm.processando = false;
                    });
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
            $state.go("resetSenha");
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
                            vm.mensagemErroRegistro = erro.data.mensagem || "Erro ao registrar usuário.";
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