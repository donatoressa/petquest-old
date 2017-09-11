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