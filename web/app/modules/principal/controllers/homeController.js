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