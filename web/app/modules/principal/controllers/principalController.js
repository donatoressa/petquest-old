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