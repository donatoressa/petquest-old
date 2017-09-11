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
            // apis: "http://localhost:3000"
            apis: "http://petquest-api.firebaseapp.com"
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
        vm.store = "";
        vm.exibirEventos = exibirEventos;
        vm.eventoSelecionado = "";

        var latitude, longitude = "";

        NgMap.getMap("map")
            .then(function (map) {
                carregarEventos(latitude, longitude);
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;
                google.maps.event.addListener(vm.map, "click", function (event) {
                    adicionarEvento(event.latLng);
                });
            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                exibirModalErroConexao();
            });

        obterGeoLocalizacao();
        vm.callbackFunc = function (param) {
            console.log("Mapa carregado com sucesso.");
        };

        function adicionarEvento(posicao) {

            var dados = {
                categorias: [ {id: 1, icone: "./app/assets/img/001-animals-6.png", descricao: "Vaca / Boi / Touro"},
                              {id: 2, icone: "./app/assets/img/002-animals-5.png", descricao: "Ganso / Pato / Marreco"},
                              {id: 3, icone: "./app/assets/img/003-animals.png", descricao: "Macaco / Mico"},
                              {id: 4, icone: "./app/assets/img/004-animals-6.png", descricao: "Iguana / Lagarto"},
                              {id: 5, icone: "./app/assets/img/005-animals-4.png", descricao: "Cobra / Serpente"},
                              {id: 6, icone: "./app/assets/img/006-animals-4.png", descricao: "Coelho / Chinchila"},
                              {id: 7, icone: "./app/assets/img/007-animals-3.png", descricao: "Arara / Papagaio / Calopsita"},
                              {id: 8, icone: "./app/assets/img/008-animals-2.png", descricao: "Galo / Galinha"},
                              {id: 9, icone: "./app/assets/img/009-animals-3.png", descricao: "Tartaruga / Jabuti / Cágado"},
                              {id: 10, icone: "./app/assets/img/010-animals-1.png", descricao: "Porco / Leitão"},
                              {id: 11, icone: "./app/assets/img/011-animals.png", descricao: "Esquilo"},
                              {id: 12, icone: "./app/assets/img/012-animals-1.png", descricao: "Coruja"},
                              {id: 13, icone: "./app/assets/img/013-animals-2.png", descricao: "Gato"},
                              {id: 14, icone: "./app/assets/img/014-dog.png", descricao: "Cachorro"}]
            };

            modal.exibirModal("Registro de novo evento:", "md", "./app/modules/comum/templates/modalNovoEvento.html", dados)
                .then(function (ok) {
                    var marker = new google.maps.Marker({
                        position: posicao,
                        map: vm.map
                    });
                });
        }

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
                        vm.eventos[i].posicaoAtual = posicao;
                        var dadosAdicionais = complementarDadosEvento(vm.eventos[i]);
                        vm.eventos[i].pin = dadosAdicionais.pin;
                        vm.eventos[i].icone = dadosAdicionais.icone;
                        vm.eventos[i].categoriaAnimal = dadosAdicionais.categoriaAnimal;
                        vm.eventos[i].descricaoEvento = vm.eventos[i].tipoEvento === 1 ? "perdido" : "encontrado";
                        vm.eventos[i].titulo = "Animal " + vm.eventos[i].descricaoEvento;
                    }
                })
                .catch(function (erro) { });
        }

        function exibirEventos(evt, id) {
            vm.eventoSelecionado = vm.eventos[id];
            vm.map.showInfoWindow.apply(this, [evt, 'bar-info-window']);
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
            var lat = posicaoEvento.latitude;
            var long = posicaoEvento.longitude;
            var latlng = new google.maps.LatLng(lat, long);
            return latlng;
        }

        function definirIconeEvento(evento) {

        }

        function complementarDadosEvento(evento) {

            switch (evento.animal) {
                case 1: {
                    return {
                        pin: "./app/assets/img/pins/001-placeholder-cow.png",
                        icone: "./app/assets/img/001-animals-6.png",
                        categoriaAnimal: "Vaca / Boi / Touro"
                    };
                }
                case 2: {
                    return {
                        pin: "./app/assets/img/pins/002-placeholder-duck.png",
                        icone: "./app/assets/img/002-animals-5.png",
                        categoriaAnimal: "Ganso / Pato / Marreco"
                    };
                }
                case 3: {
                    return {
                        pin: "./app/assets/img/pins/003-placeholder-monkey.png",
                        icone: "./app/assets/img/003-animals.png",
                        categoriaAnimal: "Macaco / Mico"
                    };
                }
                case 4: {
                    return {
                        pin: "./app/assets/img/pins/004-placeholder-iguana.png",
                        icone: "./app/assets/img/004-animal-5.png",
                        categoriaAnimal: "Iguana / Lagarto"
                    };
                }
                case 5: {
                    return {
                        pin: "./app/assets/img/pins/005-placeholder-snake.png",
                        icone: "./app/assets/img/005-animals-4.png",
                        categoriaAnimal: "Cobra / Serpente"
                    };
                }
                case 6: {
                    return {
                        pin: "./app/assets/img/pins/006-placeholder-rabbit.png",
                        icone: "./app/assets/img/006-animal-4.png",
                        categoriaAnimal: "Coelho / Chinchila / Hamster"
                    };
                }
                case 7: {
                    return {
                        pin: "./app/assets/img/pins/007-placeholder-arara.png",
                        icone: "./app/assets/img/007-animal-3.png",
                        categoriaAnimal: "Arara / Papagaio"
                    };
                }
                case 8: {
                    return {
                        pin: "./app/assets/img/pins/008-placeholder-chicken.png",
                        icone: "./app/assets/img/008-animal-2.png",
                        categoriaAnimal: "Galo / Galinha"
                    };
                }
                case 9: {
                    return {
                        pin: "./app/assets/img/pins/009-placeholder-turtle.png",
                        icone: "./app/assets/img/009-animals-3.png",
                        categoriaAnimal: "Tartaruga / Jabuti / Cágado"
                    };
                }
                case 10: {
                    return {
                        pin: "./app/assets/img/pins/010-placeholder-pig.png",
                        icone: "./app/assets/img/010-animal-1.png",
                        categoriaAnimal: "Porco / Leitão"
                    };
                }
                case 11: {
                    return {
                        pin: "./app/assets/img/pins/011-placeholder-squirrel.png",
                        icone: "./app/assets/img/011-animal.png",
                        categoriaAnimal: "Esquilo"
                    };
                }
                case 12: {
                    return {
                        pin: "./app/assets/img/pins/012-placeholder-owl.png",
                        icone: "./app/assets/img/012-animals-2.png",
                        categoriaAnimal: "Coruja"
                    };
                }
                case 13: {
                    return {
                        pin: "./app/assets/img/pins/013-placeholder-cat.png",
                        icone: "./app/assets/img/013-animals-1.png",
                        categoriaAnimal: "Gato"
                    };
                }
                default: {
                    return {
                        pin: "./app/assets/img/pins/014-placeholder-dog.png",
                        icone: "./app/assets/img/014-dog.png",
                        categoriaAnimal: "Cachorro"
                    };
                }
            }


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