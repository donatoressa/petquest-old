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