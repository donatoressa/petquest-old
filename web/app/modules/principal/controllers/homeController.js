(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap", "modal", "interpretador"];

    function homeController(NgMap, modal, interpretador) {

        var vm = this;
        vm.erroConexao = false;
        vm.visivel = false;
        vm.dadosMapa = [];
        vm.abrirMenu = abrirMenu;
        vm.fecharMenu = fecharMenu;
        vm.exibirModalErroConexao = exibirModalErroConexao;
        vm.processando = true;

        NgMap.getMap("map")
            .then(function (map) {
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;
            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                exibirModalErroConexao();
            });

        carregarEventos();

        vm.callbackFunc = function (param) {
            console.log('I know where ' + param + ' are. ' + vm.message);
            console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos() {
            var configRequest = {
                url: "obter-lista-eventos-localizacao",
                latitude: "",
                longitude: ""
            };

            interpretador.executarRequisicao(configRequest)
                .then(function (retorno) {
                    var eventos = retorno.eventos;

                    // for(var i = 0; i < eventos.length; i++){
                    //     dadosMapa.push(calcularDistanciaEvento(eventos[i], posicaoAtual));
                    // }
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

        
    }

})();