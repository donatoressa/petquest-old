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