(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap", "modal", "$rootScope", "$aside"];

    function homeController(NgMap, modal, $rootScope, $aside) {

        var vm = this;
        vm.mensagem = "";
        vm.erroConexao = false;
        vm.visivel = false;

        vm.carregarEventos = carregarEventos;
        vm.abrirMenu = abrirMenu;
        vm.fecharMenu = fecharMenu;
        vm.exibirModalErroConexao = exibirModalErroConexao;

        vm.processando = true;
        NgMap.getMap("map")
            .then(function (map) {
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;
                // vm.mensagem = "  ONLINE - Conectado";
            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                // vm.mensagem = "  OFFLINE - Sem conexão."; // Alterar para modal
                exibirModalErroConexao();
            });

        vm.callbackFunc = function (param) {
            console.log('I know where ' + param + ' are. ' + vm.message);
            console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos() {

        }

        function abrirMenu() {
            
            var menuInstance = $aside.open({
                templateUrl: "./app/modules/comum/templates/menu.html",
                controller: "AsideCtrl",
                placement: "left",
                size: "lg"
            });
            // vm.visivel = true;
            // e.stopPropagation();
        }

        function fecharMenu() {
            vm.visivel = false;
        }

        $rootScope.$on("documentClicked", fecharMenu());

        function _fechar(){
            vm.$apply(function(){
                vm.fecharMenu();
            });
        }

        function exibirModalErroConexao() {
            modal.exibirModalErro("Erro de conexão. Tente novamente.");
        }
    }

})();