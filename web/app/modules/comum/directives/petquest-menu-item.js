(function () {

    "use strict";

    angular.module("petquest.comum").directive("petquestMenuItem", petquestMenuItem);

    function petquestMenuItem(){
        return {
            restrict: "E",
            template: "<div ng-click='navigate()' ng-transclude></div>",
            transclude: true,
            scope: {
                hash: "@"
            },
            link: function($scope){
                $scope.navigate = function(){
                    window.location.hash = $scope.hash;
                };
            }
        };
    }

})();