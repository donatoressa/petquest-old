(function(){
    "use strict";

    angular.module("petquest.comum", ["ui.bootstrap"]);
})();
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
(function () {

    "use strict";

    angular.module("petquest.comum").directive("petquestMenu", petquestMenu);

    petquestMenu.$inject = ["$rootScope"];

    function petquestMenu($rootScope) {

        menuController.$inject = ["$scope"];

        return {
            restrict: "A",
            template: "<div ng-swipe-left=\"movimentoFecharMenu()\" ng-swipe-right=\"movimentoAbrirMenu()\" ng-transclude></div>",
            transclude: true,
            scope: {
                posicao: "@petquestMenu",
                habilitado: "@menuHabilitado"
            },
            controller: menuController
        };

        function menuController($scope) {
            $scope.movimentoFecharMenu = movimentoFecharMenu;
            $scope.movimentoAbrirMenu = movimentoAbrirMenu;

            if ($scope.posicao == "fechado") {
                adicionarClassesMenuFechado();
            }
            else if ($scope.posicao == "aberto") {
                adicionarClassesMenuAberto();
            }
            else {
                throw new Error("Deve ser utilizada uma das opções: \"aberto\" ou \"fechado\".");
            }

            function adicionarClassesMenuFechado() {
                $rootScope.navegacaoClass = "navegacao-movimento";
                $rootScope.conteudoClass = "";
                $rootScope.menuConteudoClass = "menu-conteudo-fechado-class";
            }

            function adicionarClassesMenuAberto() {
                $rootScope.navegacaoClass = "";
                $rootScope.conteudoClass = "conteudo-movimento";
                $rootScope.menuConteudoClass = "menu-conteudo-aberto-class";
            }

            function movimentoFecharMenu() {
                if ($scope.habilitado !== "false") {
                    adicionarClassesMenuFechado();
                }
            }

            function movimentoAbrirMenu() {
                if ($scope.habilitado !== "false") {
                    adicionarClassesMenuAberto();
                }
            }
        }
    }
})();
(function(){
    "use strict";

    angular.module("petquest.comum").factory("interpretador", interpretador);

    interpretador.$inject = ["$http"];

    function interpretador($http){
        return {
            executarRequisicao: executarRequisicao
        };

        function executarRequisicao(configRequest){

            var configPreflight = {
                url: configRequest.url,
                method: "OPTIONS",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                    "Content-Type": "application/json"
                }
            };

            return $http(configPreflight).then(function(retornoPreflight){
                $http(configRequest).then(function(retornoRequest){
                    return retornoRequest;
                });
            });
        }
    }
})();
(function(){
    "use strict";

    angular.module("petquest.comum").factory("modal", modal);

    modal.$inject = ["$uibModal"];

    function modal($uibModal){
        return {
            exibirModalErro: exibirModalErro,
            exibirModal: exibirModal
        };

        function exibirModalErro(mensagem){
            var instanciaModal = $uibModal.open({
                animation: true,
                templateUrl: "./app/modules/comum/templates/modalErro.html",
                controller: "modalController",
                controllerAs: "mCtrl",
                size: "sm",
                resolve: {
                    mensagem: function(){
                        return mensagem;
                    }
                }
            });

            return instanciaModal.result;
        }

        function exibirModal(mensagem){
            var instanciaModal = $uibModal.open({
                animation: true,
                templateUrl: "./app/modules/comum/templates/modalErro.html",
                controller: "modalController",
                controllerAs: "mCtrl",
                size: "sm",
                resolve: {
                    mensagem: function(){
                        return mensagem;
                    }
                }
            });

            return instanciaModal.result;
        }
    }

})();