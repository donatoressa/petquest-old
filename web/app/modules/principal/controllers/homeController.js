(function () {
    "use strict";

    angular.module("petquest.principal").controller("homeController", homeController);

    homeController.$inject = ["NgMap", "modal", "obterEventos"];

    function homeController(NgMap, modal, obterEventos) {

        var vm = this;
        vm.erroConexao = false;
        vm.map = undefined;
        vm.visivel = false;
        vm.dadosMapa = [];
        vm.abrirMenu = abrirMenu;
        vm.fecharMenu = fecharMenu;
        vm.exibirModalErroConexao = exibirModalErroConexao;
        vm.processando = true;

        var latitude, longitude = "";

        NgMap.getMap("map")
            .then(function (map) {
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;
                carregarEventos(latitude, longitude);
            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                exibirModalErroConexao();
            });

        obterGeoLocalizacao();


        vm.callbackFunc = function (param) {
            // console.log('I know where ' + param + ' are. ' + vm.message);
            // console.log('You are at' + vm.map.getCenter());
        };

        function carregarEventos(lat, long) {
            var dados = {
                latitude: lat || "",
                longitude: long || ""
            };

            obterEventos.consultar(dados)
                .then(function (retorno) {
                    vm.eventos = retorno.data.eventos;
                    for (var i = 0; i < vm.eventos.length; i++) {
                        var posicao = calcularPosicaoMapa(vm.eventos[i]);
                        vm.eventos[i].posicaoAtual = posicao;
                        var marcador = new google.maps.Marker({
                            title: "teste",
                            icon: definirIconeEvento(vm.eventos[i]),
                            position: posicao,
                            map: vm.map
                        });
                        console.log(marcador);
                        // marcador.setIcon(definirIconeEvento(vm.eventos[i]));
                        // marcador.setPosition(posicao);
                        // marcador.setMap(vm.map);
                    }
                })
                .catch(function (erro) {

                });
        }

        function abrirMenu() {

        }

        function fecharMenu() {
        }

        function exibirModalErroConexao() {
            modal.exibirModalErro("Erro de conexão. Tente novamente.");
        }

        function obterGeoLocalizacao() {
            navigator.geolocation.getCurrentPosition(function (pos) {
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
            });
        }

        function calcularPosicaoMapa(posicaoEvento) {
            var lat = posicaoEvento.latitude;
            var long = posicaoEvento.longitude;
            var latlng = new google.maps.LatLng(lat, long);
            return latlng;
        }

        function definirIconeEvento(evento) {
            switch (evento.tipoEvento) {
                case 1: {
                    return { //"./app/assets/img/dog-icon.png";
                        url: "./app/assets/img/dog-icon.png",
                        scaledSize: new google.maps.Size(50, 50)
                    };
                }
                case 2: {
                    return { //"./app/assets/img/cat-icon.png";
                        url: "./app/assets/img/cat-icon.png",
                        scaledSize: new google.maps.Size(50, 50)
                    };
                }
                default: {
                    return "marker-generico";
                }
            }
        }
    }

})();