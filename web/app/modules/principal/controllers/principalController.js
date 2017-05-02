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