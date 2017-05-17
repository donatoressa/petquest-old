(function () {

    "use strict";

    angular.module("petquest.principal", ["petquest.comum", "ui.router", "ui.bootstrap", "ngMap"])
        .config(configuracao)
        .run(execucao);

    configuracao.$inject = ["$stateProvider", "$urlRouterProvider"];

    function configuracao($stateProvider, $urlRouterProvider){

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

        console.log("Módulo principal configurado.");
    }

    function execucao() {
        console.log("Módulo principal executado.");
    }

})();

(function () {

    "use strict";

    angular.module("petquest.principal").constant("appSettings", {
        comunicacao: {
            apis: "http://localhost:3000"
        }
    });

})();
(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap"];

    function homeController(NgMap) {

        var vm = this;

        // NgMap.getMap().then(function (map) {
        //     console.log(map.getCenter());
        //     console.log('markers', map.markers);
        //     console.log('shapes', map.shapes);
        // });
        NgMap.getMap("map").then(function (map) {
            vm.map = map;
        });
        vm.callbackFunc = function (param) {
            console.log('I know where ' + param + ' are. ' + vm.message);
            console.log('You are at' + vm.map.getCenter());
        };
    }

})();
(function(){
    "use strict";

    angular.module("petquest.principal").controller("principalController", principalController);

    principalController.$inject = ["$state", "login"];

    function principalController($state, login){
        var vm = this;
        var lembrarLogin = false;
        
        vm.autenticar = autenticar;
        vm.lembrar = lembrarLogin;
        vm.mensagemErro = "";

        function autenticar(email, senha){
            //API DE LOGIN
            if(lembrarLogin){
                // localStorageService.set(usuario, senha);
            }

            // login.autenticar(email,senha)
            // .then(function(sucesso){
                $state.go("home");
            // },
            // function(erro){
            //     vm.mensagemErro = erro.mensagem;
            // });
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
(function () {
    "use strict";

    angular.module("petquest.principal").factory("login", login);
    login.$inject = ["$http", "appSettings", "interpretador"];

    function login($http, appSettings, interpretador) {
        return {
            autenticar: autenticar
        };

        function autenticar(email, senha) {

            var caminho = appSettings.comunicacao.apis + "/autenticar";
            var dados = { "email": email, "senha": senha };
            var header = {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            };
            var config = {
                method: "post",
                url: caminho,
                data: dados,
                headers: header
            };

            return interpretador.executarRequisicao(config)
                .then(function (dados) {
                    return dados.data;
                });
        }
    }
})();