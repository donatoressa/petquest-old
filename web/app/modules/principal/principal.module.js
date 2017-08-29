(function () {

    "use strict";

    angular.module("petquest.principal", ["petquest.comum", "ui.router", "ui.bootstrap", "ngMap", "angular-spinkit", "LocalStorageModule"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider", "localStorageServiceProvider"];

    function configuracao($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

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
            });

        localStorageServiceProvider.setStorageType("sessionStorage");

        console.log("Módulo principal configurado.");
    }

    function execucao() {
        console.log("Módulo principal executado.");
    }

})();