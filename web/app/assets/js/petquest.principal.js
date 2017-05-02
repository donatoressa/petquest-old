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
(function(){
    "use strict";

    angular.module("petquest.principal").controller("principalController", principalController);

    principalController.$inject = ["localStorageService"];

    function principalController(localStorageService){
        var vm = this;
        var lembrarLogin = false;
        
        vm.login = login;
        vm.lembrar = lembrarLogin;

        function login(usuario, senha){
            //API DE LOGIN
            if(lembrarLogin){
                localStorageService.set(usuario, senha);
            }
        }

        function lembrarLogin(){
            lembrarLogin = !lembrarLogin;
        }


    }

})();
angular
.module("petquest.principal")
.directive("splashScreen", ["$timeout", function($timeout){
    return {
        restrict : "E",
        templateUrl: "./app/modules/principal/views/splash.html",
        link : function(scope, elem, attr){
            // fade it out for 300 milliseconds (see css)
            elem.addClass("_splash_fade_out");

            // remove splash screen after animation is completed
            $timeout(function(){
                elem.remove();
                scope = elem = attr = null;
            }, 2000);
        }
    };
}]);