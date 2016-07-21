(function () {

    "use strict";

    angular.module("petquest.principal", [
        "ngAnimate",
        "oc.lazyLoad",
        "ui.router",
        "LocalStorageModule"
    ]).config(configuracao)
        .run(execucao);

    configuracao.$inject = ["localStorageServiceProvider"];

    function configuracao(localStorageServiceProvider) {
        localStorageServiceProvider.setStorageType("local");
        localStorageServiceProvider.setStorageCookie(0);
        console.log("Módulo principal configurado.");
    }

    function execucao() {
        console.log("Módulo principal executado.");
    }

})();