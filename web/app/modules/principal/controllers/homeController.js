(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap"];

    function homeController(NgMap) {

        var vm = this;
        vm.carregarEventos = carregarEventos;
        vm.abrirMenu = abrirMenu;

        NgMap.getMap("map").then(function (map) {
            vm.map = map;
        });
        vm.callbackFunc = function (param) {
            console.log('I know where ' + param + ' are. ' + vm.message);
            console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos(){

        }

        function abrirMenu(){
            
        }
    }

})();