(function () {

    "use strict";

    angular.module("petquest.principal", ["ui.router", "ui.bootstrap"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configuracao($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/modules/principal/views/main.html",
                controller: "principalController as pCtrl"
            });

        console.log("Módulo principal configurado.");
    }

    function execucao() {
        console.log("Módulo principal executado.");
    }

})();