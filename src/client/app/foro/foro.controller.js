(function() {
  'use strict';

  angular
    .module('app.foro')
    .controller('ForoController', ForoController);

  ForoController.$inject = ['$q', 'dataservice', 'logger', '$scope', '$cookieStore', '$state', '$stateParams'];
  /* @ngInject */
  function ForoController($q, dataservice, logger, $scope, $cookieStore,$state, $stateParams) {
      var vm = this;
      vm.titulo = "";
      vm.contenido = "";
      vm.temas = [];
      vm.categorias = [];
      vm.currentPage = 1;
      vm.pageSize = 15;
      vm.maxPages = [];
      vm.pages = 1;
      vm.numTemas = 0;
      vm.temasPage =[];
      vm.currentCat = "";
      vm.username = "";
      vm.countPages=countPages;
      vm.pagination = pagination;
      vm.showTemas = showTemas;
      vm.getTemas = getTemas;
      vm.crearTemas = crearTemas;

      //comprobamos si esta el usuario logeado
      if($cookieStore.get('session')){
          vm.username = $cookieStore.get('session').user;
      }

      activate();

      function activate() {
          var promises = [getCategorias()];
          return $q.all(promises).then(function() {
          });
      }

      //RECOGE LOS TEMAS DE CADA CATEGORIA Y LOS PINTA
      function getTemas(cat){
          vm.currentCat = cat;
          vm.temasPage =[];
          vm.maxPages = [];
          var data = {
              'categoria': cat
          };
          return dataservice.getTemas(data).then(function(response) {
              vm.temas = response.data;
              countPages();
              showTemas();
          });
      }

      function getCategorias(){
          return dataservice.getCategorias().then(function(response) {
              vm.categorias = response.data;
              vm.currentCat = response.data[0].id;
              getTemas(vm.currentCat);
          });
      }

      //redirige a la pagina para crear el mensaje
      function crearTemas(categoria){
          if(vm.username !=""){
              $state.go('NuevoTema',{categoria:categoria});
          }else{
              logger.error('No puedes crear un tema si no has iniciado sesión');
              $timeout(function() {
                  $state.go('foro');
              }, 1000);
          }
      }

      //PAGINATION

      //funcion que muestra los temas maximos que se pueden mostrar en una pagina
      function showTemas(){
          var startIndex = (vm.currentPage - 1) * vm.pageSize;
          var endIndex = Math.min(startIndex + vm.pageSize - 1, vm.temas.length - 1);
          vm.temasPage = vm.temas.slice(startIndex, endIndex + 1);
      }

      //cuenta el numero de paginas que habra
     function countPages() {
         vm.pages = Math.ceil(vm.temas.length/vm.pageSize);
         for (var i=1; i<=vm.pages; i++) {
            vm.maxPages.push(i);
         }
      }

      //funcion para controlar que hara cada boton del paginar
      function pagination(page){
          if (page == "first"){
              vm.currentPage= 1;
          }else if(page == "prev"){
              vm.currentPage=vm.currentPage-1;
          }else if(page == "next"){
              vm.currentPage=vm.currentPage+1;
          }else if(page == "last"){
              vm.currentPage=vm.pages;
          }
      }

  }
})();
