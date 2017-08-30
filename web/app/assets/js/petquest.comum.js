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

    angular.module("petquest.comum").directive("petquestMenuItem", petquestMenuItem);

    function petquestMenuItem(){
        return {
            restrict: "E",
            template: "<div ng-click='navigate()' ng-transclude></div>",
            transclude: true,
            scope: {
                hash: "@"
            },
            link: function($scope){
                $scope.navigate = function(){
                    window.location.hash = $scope.hash;
                };
            }
        };
    }

})();
(function () {

    "use strict";

    angular.module("petquest.comum").directive("petquestMenu", petquestMenu);

    function petquestMenu() {

        return {
            restrict: "E",
            scope: false,
            controller: function () {
                var self = this;
                this.abrirMenu = function () {
                    self.aberto = true;
                };
                this.fecharMenu = function () {
                    self.aberto = false;
                };
            },
            controllerAs: "menuCtrl",
            replace: true,
            templateUrl: "web/app/modules/comum/templates/menu.html",
            transclude: true
        };
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