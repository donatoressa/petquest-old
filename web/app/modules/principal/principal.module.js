(function () {

    "use strict";

    angular.module("petquest.principal", ["ui.router", "ui.bootstrap", "LocalStorageModule"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider", "localStorageServiceProvider"];

    function configuracao($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

        localStorageServiceProvider.setPrefix("petquest");
        localStorageServiceProvider.setStorageType("sessionStorage");

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/modules/principal/views/main.html",
                controller: "principalController as pCtrl"
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