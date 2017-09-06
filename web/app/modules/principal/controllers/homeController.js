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
        vm.store = "";
        vm.exibirEventos = exibirEventos;
        vm.eventoSelecionado = "";

        var contentString = "<div><img src=\"@\"/><h1>Animal perdido</h1></div>";
        var latitude, longitude = "";

        NgMap.getMap("map")
            .then(function (map) {
                carregarEventos(latitude, longitude);
                vm.map = map;
                vm.processando = false;
                vm.erroConexao = false;

            })
            .catch(function (erro) {
                vm.processando = false;
                vm.erroConexao = true;
                exibirModalErroConexao();
            });

        obterGeoLocalizacao();
        vm.callbackFunc = function (param) {
            console.log("Mapa carregado com sucesso.");
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
                        var dadosAdicionais = complementarDadosEvento(vm.eventos[i]);
                        vm.eventos[i].icone = dadosAdicionais.icone;
                        vm.eventos[i].categoriaAnimal = dadosAdicionais.categoriaAnimal;
                        vm.eventos[i].descricaoEvento = vm.eventos[i].tipoEvento === 1 ? "perdido" : "encontrado";
                        vm.eventos[i].titulo = "Animal " + vm.eventos[i].descricaoEvento;
                    }
                })
                .catch(function (erro) { });
        }

        function exibirEventos(evt, id) {
            vm.eventoSelecionado = vm.eventos[id];
            vm.map.showInfoWindow.apply(this, [evt, 'bar-info-window']);
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

        }

        function complementarDadosEvento(evento) {

            switch (evento.animal) {
                case 1: {
                    return {
                        icone: "./app/assets/img/001-animals-6.png",
                        categoriaAnimal: "Vaca / Boi / Touro"
                    };
                }
                case 2: {
                    return {
                        icone: "./app/assets/img/002-animals-5.png",
                        categoriaAnimal: "Ganso / Pato / Marreco"
                    };
                }
                case 3: {
                    return {
                        icone: "./app/assets/img/003-animals.png",
                        categoriaAnimal: "Macaco / Mico"
                    };
                }
                case 4: {
                    return {
                        icone: "./app/assets/img/004-animal-5.png",
                        categoriaAnimal: "Iguana / Lagarto"
                    };
                }
                case 5: {
                    return {
                        icone: "./app/assets/img/005-animals-4.png",
                        categoriaAnimal: "Cobra / Serpente"
                    };
                }
                case 6: {
                    return {
                        icone: "./app/assets/img/006-animal-4.png",
                        categoriaAnimal: "Coelho / Chinchila / Hamster"
                    };
                }
                case 7: {
                    return {
                        icone: "./app/assets/img/007-animal-3.png",
                        categoriaAnimal: "Arara / Papagaio"
                    };
                }
                case 8: {
                    return {
                        icone: "./app/assets/img/008-animal-2.png",
                        categoriaAnimal: "Galo / Galinha"
                    };
                }
                case 9: {
                    return {
                        icone: "./app/assets/img/009-animals-3.png",
                        categoriaAnimal: "Tartaruga / Jabuti / Cágado"
                    };
                }
                case 10: {
                    return {
                        icone: "./app/assets/img/010-animal-1.png",
                        categoriaAnimal: "Porco / Leitão"
                    };
                }
                case 11: {
                    return {
                        icone: "./app/assets/img/011-animal.png",
                        categoriaAnimal: "Esquilo"
                    };
                }
                case 12: {
                    return {
                        icone: "./app/assets/img/012-animals-2.png",
                        categoriaAnimal: "Coruja"
                    };
                }
                case 13: {
                    return {
                        icone: "./app/assets/img/013-animals-1.png",
                        categoriaAnimal: "Gato"
                    };
                }
                default: {
                    return {
                        icone: "./app/assets/img/014-dog.png",
                        categoriaAnimal: "Cachorro"
                    };
                }
            }

            
        }
    }

})();